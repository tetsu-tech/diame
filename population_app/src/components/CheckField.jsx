import React from "react";

export const Checkfield = (props) => {
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
