import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Checkfield } from './CheckField';
import { Test } from './Test';

export const Main = () => {
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY;
  const [prefectures, setPrefectures] = useState([]); //県名初期化
  
  //都道府県の一覧の取得
  useEffect(()=>{
      axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures",{
          headers:{'X-API-KEY':API_KEY},
      })
      .then((res)=>{
        setPrefectures(res.data);
      })
      .catch((error)=>{})
  }, [])


  return (
    <>
      {/* <Checkfield prefectures={prefectures.result} /> */}
      {/* テスト用のコンポーネントのため、後で消す */}
      <Test />
    </>
  )
}
