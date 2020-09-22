import React, {
  useEffect,
  useState,
  createContext,
  FC,
  useContext,
  useMemo,
} from "react";
import Scatterplot from "./Components/Scatterplot";
import { style } from "typestyle";
import { Layout } from "antd";
import { useStoreContext } from ".";
import { csv, DSVRowArray } from "d3";
import { observer } from "mobx-react";
const { Header, Footer, Content } = Layout;

type Data = {
  data: { data: any[] };
  x_col: string;
  y_col: string;
};

const DataContext = createContext<Data | null>(null);
const DataProvider: FC<{ data: Data }> = ({ children, data }) => (
  <DataContext.Provider value={data}>{children}</DataContext.Provider>
);

export function useDataContext() {
  const data = useContext(DataContext);
  if (!data) throw new Error("Context to be used inside provider");
  return data;
}

function App() {
  const store = useStoreContext();
  const [data, setData] = useState<DSVRowArray<string> | null>(null);
  const { x_col, y_col } = store;

  useEffect(() => {
    if (data) return;
    csv("data/iris.data").then((data) => {
      const { columns } = data;
      console.log(data);
      setData(data);
      store.setDimensions(columns[0], columns[1]);
    });
  }, [data, store]);

  const selectedData: Data = useMemo(() => {
    const d: Data = {
      data: {
        data:
          data?.map((d: any) => ({
            [x_col]: parseFloat(d[x_col]),
            [y_col]: parseFloat(d[y_col]),
          })) || [],
      },
      x_col,
      y_col,
    };

    return d;
  }, [data, x_col, y_col]);

  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <Header>Header</Header>
        <Content className={centerDiv}>
          <DataProvider data={selectedData}>
            {selectedData.x_col.length > 0 && <Scatterplot />}
          </DataProvider>
        </Content>
        <Footer>
          <div>{x_col}</div>
          <div>{y_col}</div>
        </Footer>
      </Layout>
    </div>
  );
}

export default observer(App);

const centerDiv = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
