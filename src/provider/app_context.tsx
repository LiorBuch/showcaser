import React, { createContext } from "react";
import { AppContextType } from "./types";
import { notifications } from "@mantine/notifications";
import { ThumbsUp, XOctagon } from "react-feather";


export const AppContext = createContext<AppContextType | null>(null);
const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const okData = (data:string) =>{
    notifications.show({
      title: "OK",
      message:data,
      color:'green',
      icon:<ThumbsUp size={"1.3rem"}/>
    })
  }
  const failData = (error:string) =>{
    notifications.show({
      title: "Error",
      message:error,
      color:'red',
      icon:<XOctagon/>
    })
  }

  return (
    <AppContext.Provider
      value={{
        appManager: {
          failNotification:failData,
          okNotification:okData
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
