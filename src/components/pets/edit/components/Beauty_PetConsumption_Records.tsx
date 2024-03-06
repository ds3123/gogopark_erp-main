/* eslint-disable react/jsx-pascal-case */
import { FC  } from 'react' ;
import Note_Records_Row from './Note_Records_Row' ;
import { useFetch_Services_By_PetSeial_ServiceType } from "hooks/react-query/service/useFetchServices" ;
import Beauty_Row_Content from './Beauty_Row_Content' ;



type Beauty = {
  
    pet_Data : any ;
   
} ;


// # 寵物服務記錄 : 僅 _ 美容
const Beauty_PetConsumption_Records : FC< Beauty > = ( { pet_Data } ) => {


    // 取得 _ 美容紀錄
    const records_Beauty = useFetch_Services_By_PetSeial_ServiceType( pet_Data['serial'] , "美容" ) ; 


    return <div>

              { records_Beauty.map( ( x , y  ) => <Note_Records_Row key = { y } data = { x }  content = { <Beauty_Row_Content data = { x } /> } /> ) }

           </div>  ;

} ;

export default Beauty_PetConsumption_Records  