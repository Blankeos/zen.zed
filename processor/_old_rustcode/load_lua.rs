use mlua::prelude::{LuaError, LuaResult, LuaTable};
use mlua::Lua;
use std::fs;

/// Expects and returns the single table in a .lua file (like in lazyvim)
pub fn load_config(lua: &Lua, path: &str) -> LuaResult<LuaTable> {
    let lua_code = fs::read_to_string(path)
        .map_err(|e| LuaError::external(format!("Failed to read config file: {}", e)))?;

    // Load and execute config Lua code, which returns the config table
    let config_table: LuaTable = lua.load(&lua_code).eval()?;

    Ok(config_table)
}
