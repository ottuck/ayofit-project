import { createContext } from "react";

export const AccountsContext = createContext({
  accountInfos: {
    gender: "",
    age: "",
    height: "",
    curWeight: "",
    tarWeight: "",
    activity: "",
    calorie: "",
    carb: "",
    protein: "",
    fat: "",
  },
  setAccountInfos: () => {},
});

function accountInfosReducer(state, action) {}

function AccountsContextProvider({ children }) {
  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
}

export default AccountsContextProvider;
