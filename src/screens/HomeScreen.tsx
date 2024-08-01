import { Center, Flex, Stack, Select, ActionIcon } from "@mantine/core";
import Page from "../components/Page";
import { useContext, useEffect, useState } from "react";
import { AppContextType, DeviceType } from "../provider/types";
import TestCard from "../components/TestCard";
import { RefreshCw } from "react-feather"
import { AppContext } from "../provider/app_context";
import { invoke } from "@tauri-apps/api/core";

function HomeScreen() {
  const { appManager: ctx } = useContext(AppContext) as AppContextType;
  const [data, setData] = useState<DeviceType[]>([]);
  const [value, setValue] = useState<DeviceType | undefined>();
  useEffect(() => {
    findDevices();
  }, [])
  const findDevices = () => {
    get_devices()
      .then((result) => {
        console.log(result)
        if (result) {
          console.log("ok")
          setData(result);
        }

      })
      .catch((_e) => {
        console.error("error");
      });
  };

  const get_devices = (): Promise<DeviceType[] | null> => {
    console.log("search")
    let device_list = invoke<DeviceType[]>("find_devices")
      .then((res) => {
        ctx.okNotification(`found ${res.length} items`)
        return res;
      })
      .catch((e) => {
        console.error(e);
        ctx.failNotification("error fetching devices")
        return null;
      });
    return device_list;
  }

  return (
    <Page>
      <Center>
        <Stack gap={"lg"}>
          <Flex gap={"md"} p={"md"} align={"flex-end"} justify={"center"}>

            <Select
              label="select device"
              data={data.map((device) => device.name)}
              value={value ? value.name : ""}
              onChange={(value) =>
                setValue(data.find((device) => device.name === value))
              }
            />
            <ActionIcon onClick={() => findDevices()}>
              <RefreshCw size={"1.3rem"}/>
            </ActionIcon>
          </Flex>
          {value && (
            <>
              <TestCard device={value!} />
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
