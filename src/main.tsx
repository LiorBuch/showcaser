import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ActionIcon, Button, createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import AppContextProvider from "./provider/app_context";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
    ActionIcon:ActionIcon.extend({
      defaultProps:{
        color: 'cyan',
        variant:'outline'
      }
    })
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
