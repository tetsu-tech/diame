import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../App.css";
import { Checkbox, CheckboxGroup, Stack, HStack } from "@chakra-ui/react";

export const Checkfield = (props) => {
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY;

  const [prefectures, setPrefectures] = useState([]);
  const [prefPopulations, setPrefPopulations] = useState([]);
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
      .catch((error) => {});
  }, [API_KEY]);

  //clickされたチェックボックスのprefCodeを取得してURLに代入し、prefPopulationにsetする関数
  const handleClickCheckbox = (value) => {
    const prefURL = `${baseUrl}/v1/population/composition/perYear?prefCode=${value}`;
    axios
      .get(prefURL, { headers: { "X-API-KEY": API_KEY } })
      .then((res) => {
        setPrefPopulations(res.data.result.data[0].data);
      })
      .catch((res, error) => {
        if (error.response) {
          res.status(error.response.status).send({
            error: error.response.data,
            errorMsg: error.message,
          });
        } else {
          res.status(500).send({ errorMsg: error.message });
        }
      });
  };

  //Highchartsに代入するため年を配列で取り出す
  const years = prefPopulations.map((prefPopulation) => prefPopulation.year);

  //年と対応した人口を配列で取り出す
  const populations = prefPopulations.map(
    (prefPopulation) => prefPopulation.value
  );

  //Highchartaのグラフ変数
  const chartOptions = {
    xAxis: {
      categories: years,
    },
    series: [{ data: populations }],
  };

  return (
    <>
      {prefectures.map((prefecture) => (
        <CheckboxGroup colorScheme="green" key={prefecture.prefCode}>
          <Stack
            // spacing={[1, 5]}
            direction={["column", "row"]}
            onClick={() => handleClickCheckbox(prefecture.prefCode)}
          >
            <Checkbox>{prefecture.prefName}</Checkbox>
          </Stack>
        </CheckboxGroup>
      ))}

      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};
