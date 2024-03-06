/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import Note_Records_Row from './Note_Records_Row' ;
import { useFetch_Services_By_PetSeial_ServiceType } from "hooks/react-query/service/useFetchServices" ;
import Bath_Row_Content from './Bath_Row_Content' ;


type Bath = {
  
    pet_Data   : any ;
   
} ;


// # 寵物服務記錄 : 僅 _ 洗澡
const Bath_PetConsumption_Records : FC< Bath > = ( { pet_Data } ) => {

    // 取得 _ 洗澡紀錄
    const records_Bath = useFetch_Services_By_PetSeial_ServiceType( pet_Data['serial'] , "洗澡" ) ; 

    return <div>

              { records_Bath.map( ( x , y  ) => <Note_Records_Row key = { y } data = { x }  content = { <Bath_Row_Content data = { x } /> } /> ) }
    
           </div>  ;

} ;

export default Bath_PetConsumption_Records  