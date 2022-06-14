import React from "react";
// import { Graph } from "./components/Graph";
import { Main } from "./components/Main";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function App() {
  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Main />
    </div>
  );
}
