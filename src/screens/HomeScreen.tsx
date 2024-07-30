import { Center, Text, Flex, Stack, Button, Select } from "@mantine/core";
import Page from "../components/Page";
import { useEffect, useState } from "react";
import { DeviceType } from "../provider/types";
import { get_devices } from "../provider/invoker";
import TestCard from "../components/TestCard";

function HomeScreen() {
  const [data, setData] = useState<DeviceType[]>([]);
  const [value, setValue] = useState<DeviceType | undefined>();
  const findDevices = () => {
    get_devices()
      .then((result) => {
        setData(result ? result : []);
      })
      .catch((_e) => {
        console.error("error");
      });
  };
  return (
    <Page>
      <Center>
        <Stack gap={"lg"}>
          <Flex gap={"md"} p={"md"}>
            <Text>Select Device</Text>
            <Button onClick={() => findDevices}>Fetch</Button>
            <Select
              label="select device"
              data={data.map((device) => device.name)}
              value={value ? value.name : ""}
              onChange={(value) =>
                setValue(data.find((device) => device.name === value))
              }
            />
          </Flex>
          {value && (
            <>
              <TestCard device={value!} />
              <TestCard device={value!} />
              <TestCard device={value!} />
            </>
          )}
        </Stack>
      </Center>
    </Page>
  );
}
export default HomeScreen;
