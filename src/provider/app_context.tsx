import React, { createContext, useState } from "react";
import { AppContextType } from "./types";


export const AppContext = createContext<AppContextType | null>(null);
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTest, setTestIndex] = useState(0);
  const [auth, setAuth] = useState(true);

  return (
    <AppContext.Provider
      value={{
        appManager: {
          setAuth: setAuth,
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
