import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Checkfield } from './CheckField';
import { Test } from './Test';
import { JsxTest } from './JsxTest';

interface Props {};

interface Prefecture {
  prefCode: number;
  prefName: String;
};

export const Main: React.FC<Props> = () => {
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
      .catch((error)=>{
        /* Todo: tsconfigでnoUnusedLocalsをtrueにしているためconsoleに表示させている
                 Issue#8でkipに対応してもらう
        */
        console.log(error)
      })
    }
  }, [])

  console.log(prefectures)

  return (
    <>
      {/* Todo: テスト用のコンポーネントのため、後で消す */}
      <Test />
      <JsxTest />
      <Checkfield prefectures={prefectures} />
    </>
  )
}
