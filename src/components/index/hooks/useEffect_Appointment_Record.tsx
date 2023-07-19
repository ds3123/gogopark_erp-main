/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import { useState , useEffect } from 'react' ;
import { get_ServiceOrder_ServiceDate } from "fp/services/read/get_ServiceOrder" ;
import { sort_ObjAttr , compose } from 'fp/tool' ;




// 處理、回傳 _ 今日預約服務
export const useEffect_Handle_Today_Reservation = ( data : any[] , service_Date : string ) => {


    // 今日預約來電
    const [ reservation_Today , set_Reservation_Today ] = useState( [] ) ;


    // 篩選、處理資料
    const handle_Data = ( data : any , service_Date : string ) => {

        const result = compose(
                                get_ServiceOrder_ServiceDate( service_Date ) , // 篩選 : 僅基礎、洗澡、美容 ( 不包含安親、住宿 )  
                                // sort_ObjAttr( 'created_at' , 'desc' )        // 排序 ( 欄位 : created_at / 新 -> 舊 )
                                sort_ObjAttr( 'q_code' , 'asc' )               // 排序 ( 欄位 : q_code      )
                              )( data ) ; 

        // 有內容，才 setState --> 避免更新過於頻繁，出現問題 : Maximum update depth exceeded
        if( result.length > 0 ) set_Reservation_Today( result ) ;
     
    } ;


    // 變更 _ 服務資料 ( data )
    useEffect( () => {
       
        handle_Data( data , service_Date ) ;
  
    } , [ data ] ) ;


    // 變更 _ 服務日期 ( service_Date ) 時，若沒有資料，回復狀態 -> 設定狀態為 [] ( 以清空畫面 )
    useEffect( () => {
      
        if( data.length === 0 ) set_Reservation_Today( [] ) ;
       
    } , [ service_Date ] ) ;



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