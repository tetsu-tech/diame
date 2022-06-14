import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiKey } from './apiKey';
import { Checkfield } from './CheckField';

export const Main = () => {
    const [prefectures,setPrefectures] = useState([]); //県名初期化
    
    //都道府県の一覧の取得
    useEffect(()=>{
        axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures",{
            headers:{'X-API-KEY':apiKey}
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
