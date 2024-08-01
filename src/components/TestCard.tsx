import { Button, Card, Flex, SegmentedControl, TextInput } from "@mantine/core";
import { useState } from "react";
import { connect, write, disconnect, read, query } from "../provider/invoker";
import { DeviceType } from "../provider/types";

export function TestCard({ device }: { device: DeviceType }) {
  const [typeFunc, setTypeFunc] = useState("write");
  const [functionName, setfunctionName] = useState("");

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
      <Flex gap={"md"} wrap={"nowrap"}>
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
