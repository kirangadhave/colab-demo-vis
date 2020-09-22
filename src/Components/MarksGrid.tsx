import React, { FC } from "react";
import { observer } from "mobx-react";

type Props = { size: number };

const MarksGrid: FC<Props> = ({ size }: Props) => {
  return (
    <g>
      <rect height={size} width={size} fill="#d9d9d9"></rect>
    </g>
  );
};

export default observer(MarksGrid);
