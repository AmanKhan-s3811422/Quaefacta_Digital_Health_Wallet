import { createContext, useContext} from "react";

export type User = {
    account_status: number | null
    createdAt: Date | null
    email: string | null
    first_name: string | null
    last_name: string | null
    password_hash: string | null
    updatedAt: Date | null
    user_id: number | null
    username: string | null
}

export type CurrentUser = {
    user: any;
    setUser: (u: User|null) => void
}

export const CurrentUserContext = createContext<CurrentUser>({
    user: null,
    setUser: () => {},
})
export const useCurrentUserContext = () => useContext(CurrentUserContext);




