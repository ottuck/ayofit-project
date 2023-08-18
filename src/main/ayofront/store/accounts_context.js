import { createContext } from "react";

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
},

function accountInfosReducer(state, action) {
  switch (action.type) {
    case "UPDATE_ACCOUNT_INFO":
      return {... state, ...action.payload}
    default :
      return state;  
  }
}

function AccountsContextProvider({ children }) {
  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
}

export default AccountsContextProvider;
