import React, { FC, useRef, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { VegaLite, VisualizationSpec } from "react-vega";
import { useDataContext } from "../App";
import { style } from "typestyle";

type Props = {};

const Scatterplot: FC<Props> = (props: Props) => {
  const { data, x_col, y_col } = useDataContext();
  const containerDiv = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    height: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const { current } = containerDiv;
    if (!current) return;
    setDimensions({
      height: current.clientHeight,
      width: current.clientWidth,
    });
  }, []);

  const { height = 0, width = 0 } = dimensions || {};

  const size = height < width ? height : width;

  console.log(data);

  const spec: VisualizationSpec = {
    width: size,
    height: size,
    mark: "point",
    encoding: {
      x: { field: x_col, type: "quantitative", scale: { zero: false } },
      y: { field: y_col, type: "quantitative", scale: { zero: false } },
    },
    data: { name: "data" },
  };

  return (
    <div ref={containerDiv} className={expandAll}>
      {size > 0 && <VegaLite spec={spec} data={data} />}
    </div>
  );
};

export default observer(Scatterplot);

const expandAll = style({
  height: "100%",
  width: "100%",
});
