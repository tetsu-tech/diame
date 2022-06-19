import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkfield } from "./CheckField";


export const Main = () => {
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY;
  const [prefectures, setPrefectures] = useState([]); //県名初期化
  const [prefPopulation, setPrefPopulation] = useState([]); //人口データ


  //都道府県の一覧の取得
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": API_KEY },
      })
      .then((res) => {
        setPrefectures(res.data.result);
      })
      .catch((error) => {});
  }, [API_KEY]);

  //checkboxクリックした時の処理
  // const handleClickCheckbox = (prefCode, prefName, check) => {
  //   let c_prefPopulation = prefPopulation.slice(); //prefPopulationを配列として扱うための変数

  //   //checkつけた時
  //   if (check) {
  //     if (
  //       c_prefPopulation.findIndex((value) => value.prefName === prefName) !==
  //       -1
  //     )
  //       return; //配列から条件に当てはまるものがない（-1）ではない?＝つまり条件に当てはまるものがすでにある場合？＝チェックが入っているものを除く処理？

  //     axios.get(
  //       "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
  //         String(prefCode),
  //       { headers: { "X-API-KEY": API_KEY }, }
  //     )
  //     .then((res)=>{
  //       c_prefPopulation.push({
  //         prefName:prefName,
  //         data:res.data.result.data[0].data,
  //       });
  //       setPrefPopulation(c_prefPopulation);
  //     })
  //     .catch((error)=>{
  //       return;
  //     });
  //   }
  //   else{
  //     const deleteIndex = c_prefPopulation.findIndex(
  //     (value)=>value.prefName === prefName
  //     );
  //     if(deleteIndex === -1) return;
  //     c_prefPopulation.splice(deleteIndex,1); //配列のdeleteIndexから1つ削除
  //     setPrefPopulation(c_prefPopulation);
  //   }
  //   console.log(prefPopulation)
  // };

  return (
    <>
      <Checkfield prefectures={prefectures} />
      
    </>
  );
};
