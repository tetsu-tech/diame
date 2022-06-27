import React from "react";

interface Props {
  prefectures: Prefecture[];
}

interface Prefecture {
  prefCode: number;
  prefName: String;
};

export const Checkfield: React.FC<Props> = (props: Props) => {
  return (
    <div>
      {props.prefectures.map((prefecture) => (
        <div key={prefecture.prefCode} >
          <input type="checkbox" name="Prefecture Name" />
          <label>{prefecture.prefName}</label>
        </div>
      ))}
    </div>
  );
};
