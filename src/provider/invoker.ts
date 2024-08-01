import { invoke } from "@tauri-apps/api/core";
import { DeviceType } from "./types";

export function get_devices(): Promise<DeviceType[] | null> {
  console.log("search")
  let device_list = invoke<DeviceType[]>("find_devices")
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
  return device_list;
}

export function connect(device: DeviceType) {
  invoke("connect_device", { address: device.address })
    .then(() => {
      console.log("device connected");
    })
    .catch((e) => {
      console.error(e);
    });
}
export function disconnect(device: DeviceType) {
  invoke<DeviceType>("disconnect_device", { address: device.name })
    .then((device) => {
      console.log(device);
      console.log("was disconnected");
    })
    .catch((e) => {
      console.error(e);
    });
}
export function write(device: DeviceType, msg: String) {
  invoke("write_to_device", { address: device.name, msg: msg })
    .then(() => {
      console.log("command written");
    })
    .catch((e) => {
      console.error(e);
    });
}
export function read(device: DeviceType) {
  invoke<String>("read_from_device", { name: device.name })
    .then((data) => {
      console.log(data);
      console.log("read success");
    })
    .catch((e) => {
      console.error(e);
    });
}
export function query(device: DeviceType, msg: String) {
  invoke<String>("query_from_device", { name: device.name, msg: msg })
    .then((data) => {
      console.log(data);
      console.log("query success");
    })
    .catch((e) => {
      console.error(e);
    });
}
