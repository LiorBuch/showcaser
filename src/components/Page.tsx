import { AppShell, Group, Flex } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";

function Page({
  children,
  headerButton,
}: PropsWithChildren<{ headerButton?: ReactNode }>) {
  return (
    <AppShell header={{ height: 50 }}>
      <AppShell.Header>
        <Group justify="center" gap="xs" grow p="sm">
          <div>Logo</div>
          <Flex justify="flex-end" gap="sm">
            {headerButton}
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
export default Page;