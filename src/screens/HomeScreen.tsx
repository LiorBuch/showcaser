import { Center, Text, Flex, Stack, Button, Select } from "@mantine/core";
import Page from "../components/Page";
import { useEffect, useState } from "react";

function HomeScreen() {
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>("");
  useEffect(() => {}, []);
  return (
    <Page>
      <Center>
        <Stack>
          <Flex gap={"md"} p={"md"}>
            <Text>Select Device</Text>
            <Button>Fetch</Button>
            <Select
              label="select device"
              data={data}
              value={value ? value : ""}
              onChange={setValue}
            />
          </Flex>
        </Stack>
      </Center>
    </Page>
  );
}
export default HomeScreen;
