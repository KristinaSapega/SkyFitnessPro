import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

export type UserType = {
  isOpen: boolean;
  isRegistry: boolean;
  changeValue: () => void;
  changeModal: () => void;
};

export const UserContext = createContext<UserType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistry, setIsRegistry] = useState(false);

  const changeValue = () => {
    setIsOpen(!isOpen);
  };
  const changeModal = () => {
    setIsRegistry(!isRegistry);
  };

  return (
    <UserContext.Provider
      value={{ isOpen, changeValue, isRegistry, changeModal }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
