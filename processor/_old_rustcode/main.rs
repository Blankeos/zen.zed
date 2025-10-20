extern crate tera;
use mlua::Lua;
use std::fs;
use tera::Tera;

mod load_lua;
use load_lua::load_config;

use lazy_static::lazy_static;
// Tera.1. Create a static tera instance
lazy_static! {
    pub static ref TEMPLATES: Tera = {
        let mut tera = Tera::default();
        let template_content = match fs::read_to_string("src/template.json.tera") {
            Ok(content) => content,
            Err(e) => {
                println!("Error reading template file: {}", e);
                ::std::process::exit(1);
            }
        };
        match tera.add_raw_template("template.json.tera", &template_content) {
            Ok(_) => {}
            Err(e) => {
                println!("Parsing error(s): {}", e);
                ::std::process::exit(1);
            }
        };

        tera
    };
}

fn main() {
    fs::create_dir_all("../themes").unwrap();

    let variants_dir = fs::read_dir("variants").unwrap();

    for entry in variants_dir {
        let entry = entry.unwrap();
        let variant = entry.file_name().to_string_lossy().to_string();
        if !variant.ends_with(".lua") {
            continue;
        }

        println!("Reading {:?}", entry.path().to_str());
        let lua = Lua::new();
        let config = load_config(&lua, entry.path().to_str().unwrap());

        let config = match config {
            Ok(table) => {
                // Convert the Lua table to JSON for pretty display
                let json_string = serde_json::to_string_pretty(&table)
                    .unwrap_or_else(|_| "Invalid config".to_string());
                println!("Loaded Lua config:\n{}", json_string);
                table
            }
            Err(e) => {
                println!("Error loading Lua config: {}", e);
                return;
            }
        };

        // Tera.2. Load context from yaml data source
        let context = tera::Context::from_serialize(&config).unwrap();

        // Tera.3. Run render.
        let json_output = TEMPLATES.render("template.json.tera", &context).unwrap();

        let output_path = format!("../themes/{}.json", variant.trim_end_matches(".lua"));
        fs::write(output_path, json_output).unwrap();
    }

    // for entry in variants_dir {
    //     let entry = entry.unwrap();
    //     let variant = entry.file_name().to_string_lossy().to_string();
    //     if !variant.ends_with(".yml") {
    //         continue;
    //     }

    //     let yaml_content = fs::read_to_string(entry.path()).unwrap();
    //     let yaml_data: serde_yaml::Value = serde_yaml::from_str(&yaml_content).unwrap();

    //     // Tera.2. Load context from yaml data source
    //     let context = tera::Context::from_serialize(&yaml_data).unwrap();

    //     // Tera.3. Run render.
    //     let json_output = TEMPLATES.render("template.tera", &context).unwrap();

    //     let output_path = format!("../themes/{}.json", variant.trim_end_matches(".yml"));
    //     fs::write(output_path, json_output).unwrap();
    // }
}
