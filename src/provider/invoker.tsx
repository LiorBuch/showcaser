import { invoke } from '@tauri-apps/api/core';
import { DeviceType } from './types';


async function get_devices(){
    let device_list = await invoke<DeviceType>("get_devices");
    console.log(device_list)
}