import { createContext, useContext, useReducer, useState } from "react";

const AccountsContext = createContext();

const initialState = {
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
};

export function useAccountsContext() {
  return useContext(AccountsContext);
}

function accountInfosReducer(state, action) {
  switch (action.type) {
    case "UPDATE_ACCOUNT_INFO":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function AccountsContextProvider({ children }) {
  const [accountInfos, dispatch] = useReducer(
    accountInfosReducer,
    initialState
  );

  const setAccountInfos = (updatedInfo) => {
    dispatch({ type: "UPDATE_ACCOUNT_INFO", payload: updatedInfo });
  };

  const [accountResult, setAcountResult] = useState([]);

  const value = {
    accountInfos,
    setAccountInfos,
    accountResult,
    setAcountResult,
  };
  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
}

export default AccountsContextProvider;
