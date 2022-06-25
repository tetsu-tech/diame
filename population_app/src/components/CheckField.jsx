import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../App.css";
import { slackNotifier } from "../libs/slackClient";
import { CurrentPref } from "./CurrentPref";

export const Checkfield = (props) => {
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY;

  const [prefectures, setPrefectures] = useState([]);
  const [prefPopulation, setPrefPopulation] = useState([]);
  const [currentPref, setCurrentPref] = useState([]);
  const baseUrl = "https://opendata.resas-portal.go.jp/api";
  //都道府県の一覧の取得
  useEffect(() => {
    axios
      .get(`${baseUrl}/v1/prefectures`, {
        headers: { "X-API-KEY": API_KEY },
      })
      .then((res) => {
        setPrefectures(res.data.result);
      })
      .catch((error) => {
        slackNotifier(error.message);
      });
  }, [API_KEY]);

  //clickされたチェックボックスのprefCodeを取得してURLに代入し、prefPopulationにsetする関数
  const handleClickCheckbox = (value) => {
    setCurrentPref(value);
    const prefURL = `${baseUrl}/v1/population/composition/perYear?prefCode=${value.prefCode}`;
    axios
      .get(prefURL, { headers: { "X-API-KEY": API_KEY } })
      .then((res) => {
        setPrefPopulation(res.data.result.data[0].data);
      })
      .catch((error) => {
        slackNotifier(error.message);
      });
  };

  //Highchartsに代入するため年を配列で取り出す
  const years = prefPopulation.map((data) => data.year);

  //年と対応した人口を配列で取り出す
  const populations = prefPopulation.map((data) => data.value);

  //Highchartaのグラフ変数
  const chartOptions = {
    xAxis: {
      categories: years,
    },
    series: [{ data: populations }],
    title: {
      text: currentPref.prefName,
    },
  };

  return (
    <div>
      {prefectures.map((prefecture) => (
        <div className="checkbox" key={prefecture.prefCode}>
          <input
            className=".checkbox"
            type="radio"
            name="Prefecture Name"
            id={prefecture.prefCode}
            onClick={() => handleClickCheckbox(prefecture)}
          />
          <label>{prefecture.prefName}</label>
        </div>
      ))}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <CurrentPref test={currentPref.prefName} />
    </div>
  );
};
