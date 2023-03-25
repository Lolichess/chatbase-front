import { createContext } from "react";

export type GlobalContent = {
  user: string | null;
  setUser: (c: string | null) => void;
};

export const SigninContext = createContext<GlobalContent>({
  user: "", // set a default value
  setUser: () => {},
});
