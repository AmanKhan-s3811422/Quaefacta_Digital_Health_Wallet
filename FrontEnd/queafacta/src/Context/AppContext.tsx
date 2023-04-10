//TODO: Get this working so that we cabn have a title page that changes dynamically

import { createContext, useContext} from "react";

export type CurrentPage = {
    title: string;
    setTitle: (u: string) => void
}

export const CurrentAppContext = createContext<CurrentPage>({
    title: "Quaefacta Digital Health Wallet",
    setTitle: () => {},
})

export const useCurrentAppContext = () => useContext(CurrentAppContext);