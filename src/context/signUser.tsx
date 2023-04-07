import { createContext } from "react";

export type GlobalContent = {
  user: string | null;
  setUser: (value: string | null) => void;
};

export const SigninContext = createContext<GlobalContent>({
  user: "", // set a default value
  setUser: () => {},
});
