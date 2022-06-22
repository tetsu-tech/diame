import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import '../App.css'

export const Checkfield = (props) => {
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY;

  const [prefectures, setPrefectures] = useState([]); 
  const [prefPopulation, setPrefPopulation] = useState([]);
  const baseUrl = 'https://opendata.resas-portal.go.jp/api'
  //都道府県の一覧の取得
  useEffect(() => {
    axios
      .get(`${baseUrl}/v1/prefectures`, {
        headers: { "X-API-KEY": API_KEY },
      })
      .then((res) => {
        setPrefectures(res.data.result);
      })
      .catch((error) => {});
  }, [API_KEY]);

  
  //clickされたチェックボックスのprefCodeを取得してURLに代入し、prefPopulationにsetする関数
  const handleClickCheckbox = (value) => {
    const prefURL = `${baseUrl}/v1/population/composition/perYear?prefCode=${value}`;
    axios
      .get(prefURL, { headers: { "X-API-KEY": API_KEY } })
      .then((res) => {
        setPrefPopulation(res.data.result.data[0].data);
      })
      .catch((error) => {});
  };

  const c_prefPopulation = prefPopulation.slice(); //コピーの作成

  //Highchartsに代入するため年を配列で取り出す
  let years = []; //yearの配列
  c_prefPopulation.forEach((data) => {
    years.push(data.year);
  });

  //年と対応した人口を配列で取り出す
  let populations = []; //空配列
  c_prefPopulation.forEach((data) => {
    populations.push(data.value);
  });

  //Highchartaのグラフ変数
  const chartOptions = {
    xAxis: {
      categories: years,
    },
    series: [{ data: populations }],
  };

  return (
    <div>
      {prefectures.map((prefecture) => (
        <div className="checkbox" key={prefecture.prefCode}>
          <input
            className=".checkbox"
            type="checkbox"
            name="Prefecture Name"
            id={prefecture.prefCode}
            onClick={() => handleClickCheckbox(prefecture.prefCode)}
          />
          <label>{prefecture.prefName}</label>
        </div>
      ))}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
