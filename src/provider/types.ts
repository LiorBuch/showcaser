export interface IAppGeneral {
    okNotification: (data:string) => void;
    failNotification: (error:string) => void;
}
export type AppContextType = {
    appManager: IAppGeneral;
};
export type TestType = {
    deviceCode:number,
    functionName: string;
    functionArgs: string;
    passed: boolean;
}
export type DeviceType = {
    name:string,
    address:string,
    session_id:number,
}