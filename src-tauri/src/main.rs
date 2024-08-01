// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use visa_device_handler::{types::Device, visa_module::SafeDeviceMap};
use tauri::State;


fn main() {
    let state = SafeDeviceMap::init(None).unwrap();
    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            find_devices,
            connect_device,
            disconnect_device,
            write_to_device,
            read_from_device,
            query_from_device
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn find_devices(state: State<SafeDeviceMap>) -> Result<Vec<Device>,String> {
    let result = state.find_all_devices(true)?;
    Ok(result)
}
#[tauri::command]
fn connect_device(address:&str, state: State<SafeDeviceMap>) -> Result<(),String> {
    state.connect_device(address.to_string())?;
    Ok(())
}
#[tauri::command]
fn disconnect_device(address:&str, state: State<SafeDeviceMap>) -> Result<Device,String> {
    let dev = state.disconnect_device(address.to_string())?;
    Ok(dev)
}
#[tauri::command]
fn write_to_device(name:&str,msg:&str, state: State<SafeDeviceMap>) -> Result<(),String> {
    state.write_to_device(name.to_string(), msg)?;
    Ok(())
}
#[tauri::command]
fn read_from_device(name:&str, state: State<SafeDeviceMap>) -> Result<String,String> {
    let result = state.read_from_device(name.to_string())?;
    Ok(result)
}
#[tauri::command]
fn query_from_device(name:&str,msg:&str, state: State<SafeDeviceMap>) -> Result<String,String> {
    let result = state.query_from_device(name.to_string(),msg)?;
    println!("result of {result}");
    Ok(result)
}