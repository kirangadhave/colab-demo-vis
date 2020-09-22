import { Provenance, initProvenance } from "@visdesignlab/trrack";

type State = {
  x_col: string;
  y_col: string;
};

export function createStore() {
  const state: State = {
    x_col: "",
    y_col: "",
  };

  const provenance: Provenance<State, any, any> = initProvenance(state);

  const setXAction = provenance.addAction(
    "Set X axis",
    (state: State, x_col: string) => {
      state.x_col = x_col;
      return state;
    }
  );

  const setYAction = provenance.addAction(
    "Set Y axis",
    (state: State, y_col: string) => {
      state.y_col = y_col;
      return state;
    }
  );

  const setDimensionAction = provenance.addAction(
    "Set Dimensions",
    (state: State, x_col: string, y_col: string) => {
      state.x_col = x_col;
      state.y_col = y_col;
      return state;
    }
  );

  return {
    provenance,
    ...state,
    setX(x_col: string) {
      this.x_col = x_col;
      setXAction.addArgs([x_col]).applyAction();
    },
    setY(y_col: string) {
      this.y_col = y_col;
      setYAction.addArgs([y_col]).applyAction();
    },
    setDimensions(x_col: string, y_col: string) {
      this.x_col = x_col;
      this.y_col = y_col;
      setDimensionAction.addArgs([x_col, y_col]).applyAction();
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
