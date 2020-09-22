import React, { createContext, FC, useContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createStore, TStore } from "./Store/Store";
import { useLocalStore } from "mobx-react";

const StoreContext = createContext<TStore | null>(null);
const StoreProvider: FC = ({ children }) => {
  const store = useLocalStore(createStore);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export function useStoreContext() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be within store provider");
  return store;
}

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
