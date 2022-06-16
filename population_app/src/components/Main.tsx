import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Checkfield } from './CheckField';
import { Test } from './Test';

interface Props {};

interface Prefecture {
  prefCode: number;
  prefName: String;
};

export const Main: React.FC = () => {
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY;
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]); //県名初期化
  
  //都道府県の一覧の取得
  useEffect(()=>{
    if (API_KEY) {
      axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures",{
          headers:{ 'X-API-KEY': API_KEY },
      })
      .then((res)=>{
        setPrefectures(res.data.result);
      })
      .catch((error)=>{})
    }
  }, [])

  console.log(prefectures)

  return (
    <>
      {/* テスト用のコンポーネントのため、後で消す */}
      <Test />
      <Checkfield prefectures={prefectures} />
    </>
  )
}
