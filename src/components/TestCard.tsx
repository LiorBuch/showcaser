import { Button, Card, Flex, SegmentedControl, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import { AppContextType, DeviceType } from "../provider/types";
import { invoke } from "@tauri-apps/api/core";
import { AppContext } from "../provider/app_context";

export function TestCard({ device }: { device: DeviceType }) {
  const [typeFunc, setTypeFunc] = useState("write");
  const [functionName, setfunctionName] = useState("");
  const { appManager: ctx } = useContext(AppContext) as AppContextType;
  const connect = (device: DeviceType) => {
    invoke("connect_device", { address: device.address })
      .then(() => {
        ctx.okNotification("Device connected!")
        console.log("device connected");
      })
      .catch((e) => {
        ctx.failNotification("Device failed to connect!")
        console.error(e);
      });
  }
  const disconnect = (device: DeviceType) => {
    invoke<DeviceType>("disconnect_device", { address: device.name })
      .then((ret) => {
        console.log(ret);
        console.log("was disconnected");
        ctx.okNotification(`Device ${ret.name} disconnected!`)
      })
      .catch((e) => {
        ctx.failNotification(`Could not disconnect ${device.name}!`)
        console.error(e);
      });
  }
  const write = (device: DeviceType, msg: String) => {
    invoke("write_to_device", { address: device.name, msg: msg })
      .then(() => {
        console.log("command written");
        ctx.okNotification("Command sent to device!")
      })
      .catch((e) => {
        ctx.failNotification("Failed to send command to device!")
        console.error(e);
      });
  }
  const read = (device: DeviceType) => {
    invoke<String>("read_from_device", { name: device.name })
      .then((data) => {
        console.log(data);
        ctx.okNotification(`From device ${device.name} buffer, got -> ${data}`)
        console.log("read success");
      })
      .catch((e) => {
        ctx.failNotification(`Failed to read from ${device.name} buffer!`)
        console.error(e);
      });
  }
  const query = (device: DeviceType, msg: String) => {
    invoke<String>("query_from_device", { name: device.name, msg: msg })
      .then((data) => {
        console.log(data);
        ctx.okNotification(`Query from device ${device.name} buffer, got -> ${data}`)
        console.log("query success");
      })
      .catch((e) => {
        ctx.failNotification("Failed to query from device")
        console.error(e);
      });
  }

  const mapTarget = () => {
    switch (typeFunc) {
      case "write":
        write(device, functionName);
        break;
      case "read":
        read(device);
        break;
      case "query":
        query(device, functionName);
        break;
      case "connect":
        connect(device);
        break;
      case "disconnect":
        disconnect(device);
        break;
      default:
        break;
    }
  };

  return (
    <Card>
      <Flex gap={"md"} wrap={"nowrap"} align={"flex-end"}>
        <SegmentedControl
          value={typeFunc}
          onChange={setTypeFunc}
          defaultValue="write"
          data={[
            { label: "Write", value: "write" },
            { label: "Read", value: "read" },
            { label: "Query", value: "query" },
            { label: "Connect", value: "connect" },
            { label: "Disconnect", value: "disconnect" },
          ]}
        />
        {(typeFunc !== "connect" && typeFunc !== "disconnect") && <>
          <TextInput
            label="function name"
            value={functionName}
            placeholder="function name here"
            onChange={(event) => setfunctionName(event.currentTarget.value)}
          />
        </>}
        <Button onClick={mapTarget}>Test</Button>
      </Flex>
    </Card>
  );
}
export default TestCard;
