/* eslint-disable react-hooks/exhaustive-deps */

import { useState , useEffect } from 'react' ;
import { useSelector } from 'react-redux' ;
import { Services } from "utils/Interface_Type" ;

import { useFetch_Species } from "hooks/react-query/species/useFetchSpecies" ;



// 加入 _ 篩選日期
export const useFilter_Service_Date = ( data_Type : Services ) => {

   const [ filter_Date_1 , set_Filter_Date_1 ] = useState( '' ) ;  // 到店日期 ( for 洗美區塊 ) / 住宿 : 開始日期 ( for 住宿區塊 )
   const [ filter_Date_2 , set_Filter_Date_2 ] = useState( '' ) ;  // 住宿 : 結束日期 ( for 住宿區塊 )
 

   // # 洗美 -------------------
 
   // 是否點選 _ 要篩選 : 來店日期
   const is_Filtered_Service_Date = useSelector( ( state : any ) => state.Service.is_Filtered_By_Service_Date ) ;

   // 到店日期
   const service_Date             = useSelector( ( state : any ) => state.Info.service_Date ) ;


   // # 住宿 -------------------

   // 是否點選 _ 要篩選 : 住房期間
   const is_Filtered_By_Lodge_Date = useSelector( ( state : any ) => state.Lodge.is_Filtered_By_Lodge_Date ) ;


   // 住房日期
   const check_In_Date  = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ;   

   // 退房日期
   const check_Out_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_Out_Date ) ;  


    useEffect( () : any => {
      
        // 洗美篩選 : 到店日期 
        if( data_Type === "service" && is_Filtered_Service_Date ){    

           set_Filter_Date_1( service_Date ) ;

        }

        // 住宿篩選 : 住宿期間  
        if( data_Type === "lodge" && is_Filtered_By_Lodge_Date ){   
        
           set_Filter_Date_1( check_In_Date ) ;
           set_Filter_Date_2( check_Out_Date ) ;
        
        }
        
        // 回復預設
        return () => {

           set_Filter_Date_1( "" ) ;
           set_Filter_Date_2( "" ) ;

        }

       
    } , [ data_Type , is_Filtered_Service_Date , service_Date , is_Filtered_By_Lodge_Date , check_In_Date , check_Out_Date ] ) ;

  
    return { filter_Date_1 , filter_Date_2 }
  

} ;


// 依照 _ 品種名稱，取得 _ 該品種於資料表( pet_species ) id
export const useFilter_SpeciesId_By_SpecisName = ( speicies_Name : string ) => {

   // 取得 _ 所有品種
   const petSpecies = useFetch_Species() ;

   // 篩選出的品種 id
   const [ species , set_Species_Id ] = useState( "" )

   useEffect( () => {

     if( petSpecies && petSpecies.length > 0 ){

       const species = petSpecies.filter( x => x[ 'name' ] === speicies_Name )[ 0 ] ;

       set_Species_Id( species?.id )

     }
       
   } , [ petSpecies ] ) ;


   return species


} ;