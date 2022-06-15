import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Checkfield } from './CheckField';

export const Main = () => {
  require('dotenv').config()
  console.log(process.env)
  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(API_KEY)
    const [prefectures,setPrefectures] = useState([]); //県名初期化
    
    //都道府県の一覧の取得
    useEffect(()=>{
        axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures",{
            headers:{'X-API-KEY':API_KEY},
        })
        .then((results)=>{
          setPrefectures(results.data);
        })
        .catch((error)=>{})
    },[])
  return (
    <>
      <Checkfield prefectures={prefectures.result} />
    </>
  )
}
