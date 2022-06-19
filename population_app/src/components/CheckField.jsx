import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Checkfield = (props) => {
  //API KEY取得
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY;
  //人口データ
  const [prefPopulation, setPrefPopulation] = useState([]);

  // 人口データ取得
  useEffect((prefName) => {
    axios
      .get(
        " https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=11",
        {
          headers: { "X-API-KEY": API_KEY },
        }
      )
      .then((res) => {
        setPrefPopulation(res.data.result.data[0].data)
      })
      .catch((error) => {});
  }, []);
  //人口のグラフの配列を作る（年year・人口データ）

  const c_prefPopulation = prefPopulation.slice(); //コピーの作成
  //Highchartsに代入するため年を配列で取り出す
  let years = [] //空配列
  c_prefPopulation.forEach((data)=>{
    years.push(data.year)
  })
  console.log(years) //c_prefPopulationではなくyearsであることに注意

  //年と対応した人口を配列で取り出す
  let populations = [] //空配列
  c_prefPopulation.forEach((data)=>{
    populations.push(data.value)
  })
  console.log(populations) //c_prefPopulationではなくyearsであることに注意

  //人口データグラフ変数
  const chartOptions = {
    xAxis: {
      categories:years,
    },
    series: [
      { data: populations }
    ]
  };


  return (
    <div>
      {props.prefectures.map((prefecture) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            name="Prefecture Name"
            id={prefecture.prefCode}
            onClick={() => console.log("hello")}
          />
          <label>{prefecture.prefName}</label>
        </div>
      ))}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
