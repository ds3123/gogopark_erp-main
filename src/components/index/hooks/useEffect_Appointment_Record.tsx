/* eslint-disable react/jsx-pascal-case */
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import { useState , useEffect } from 'react' ;



// 處理、回傳 _ 今日預約服務
export const useEffect_Handle_Today_Reservation = ( data : any[] , service_Date : string ) => {


    // 今日預約來電
    const [ reservation_Today , set_Reservation_Today ] = useState( [] ) ;


    // 篩選、處理資料
    const handle_Data = ( data : any , service_Date : string ) => {

        // 篩選 : 僅基礎、洗澡、美容 ( 不包含安親、住宿 )  
        const data_Today = data.filter( ( x : any ) => x['service_date'] === service_Date ) ;
 
        // 排序
        data_Today.sort( ( a : any , b : any ) : any => a['created_at'] < b['created_at'] ? 1 : -1 ) ;
 
        set_Reservation_Today( data_Today ) ;
     
    } ;


    // 依據 _ 特定查詢日期，篩選預約資料
    useEffect( () => {
       
        handle_Data( data , service_Date ) ;
  
    } , [ data , service_Date ] ) ;


    return reservation_Today


} ;






// 點選 _ 檢視該項服務
export const useEffect_Cick_Check_Service = () => {

    const dispatch = useDispatch(); 


    // 點選 _ 檢視
    const click_Service = ( data : any ) => {

        document.body.style.position = 'fixed' ;  // 固定、消除 _ 右側捲軸
         
        dispatch( set_Side_Panel( true , <Update_Service /> ,
                                   { source_Page : 'Appoint_Records' , service_Type : data.service_type ,  preLoadData : data } as { service_Type : string }
                                 )) ;
 
    } ;

    return click_Service
 
} ;