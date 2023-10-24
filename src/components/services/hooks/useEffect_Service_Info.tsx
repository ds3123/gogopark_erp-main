/* eslint-disable react-hooks/exhaustive-deps */

import { useState , useEffect } from 'react' ;
import { is_Past_ServiceDate , is_Future_ServiceDate  } from "fp/state" ;
import { set_Info_Column } from "store/actions/action_Info" ;
import { useDispatch } from 'react-redux';
import { is_Create  } from 'fp/common/condition/edit_mode';
import { EditType } from 'utils/custom_types/form';


type ServiceStatus = {

    is_Arrived_Today    : boolean ; // 已到店
    is_Appointed_Today  : boolean ; // 預約_今天
    is_Appointed_Future : boolean ; // 預約_未來

}


// 設定 _ 服務狀態 ( serviceStutus )
export const useEffect_Set_ServiceStatus = ( editType : EditType , service_Date : string , setValue : any ) => {

    // # 服務狀態
    const [ serviceStatus , set_serviceStatus ] = useState({
                                                             is_Arrived_Today    : true ,  // 當日已到店
                                                             is_Appointed_Today  : false , // 預約 _ 今天
                                                             is_Appointed_Future : false   // 預約 _ 未來
                                                           }) ;

    // 點選 _ 預約今天
    const click_Appoint_Today = () => set_serviceStatus({ ...serviceStatus , is_Arrived_Today : false , is_Appointed_Today : true }) ;

    // 點選 _ 已到店
    const click_Arrive_Shop   = () => set_serviceStatus({ ...serviceStatus , is_Arrived_Today : true , is_Appointed_Today : false }) ;                                                       


    useEffect( () => {

        //【 新增 】

        // 預約 _ 未來
        if( is_Create( editType ) && is_Future_ServiceDate( service_Date ) ){
            set_serviceStatus({ ...serviceStatus , is_Arrived_Today : false , is_Appointed_Today : false , is_Appointed_Future : true }) ;
        }else{
            set_serviceStatus({ ...serviceStatus , is_Arrived_Today : true , is_Appointed_Today : false , is_Appointed_Future : false }) ;
        }

        // 是否選擇 : 過去日期 ( 缺 _ 強制設回今天 2021.06.13 )
        if( is_Create( editType ) && is_Past_ServiceDate( service_Date ) ){

            setValue( 'service_Date' , new Date() ) ; // 設回今天
            alert('不能選擇 : 過去日期') ;
            
        }

        //【 編輯 】 


    } , [ service_Date ] ) ;

    
    return { serviceStatus , click_Appoint_Today , click_Arrive_Shop  }


} ;


// 設定 _ Redux Store : 服務狀態 ( serviceStutus ) --> 供 Data_Obj_Extra_Props.tsx 追加 data 物件新屬性
export const useEffect_Set_Redux_ServiceStatus = ( serviceStatus : ServiceStatus ) => { 

     const dispatch = useDispatch() ;


     // 設定 _ 服務性質 ( service_Status : 已到店、預約_今天、預約_未來 。供提交表單時，由 Redux 取得，動態加入該欄位 )
     useEffect(() => {

        if( serviceStatus['is_Arrived_Today'] )    dispatch( set_Info_Column( 'service_Status' , '已到店' )   ) ;
        if( serviceStatus['is_Appointed_Today'] )  dispatch( set_Info_Column( 'service_Status' , '預約_今天' ) ) ;
        if( serviceStatus['is_Appointed_Future'] ) dispatch( set_Info_Column( 'service_Status' , '預約_未來' ) ) ;
 
     } , [ serviceStatus ] ) ;

   
}


// 設定 _ 目前時間 ( for 到店時間、離店時間 )
export const useEffect_Set_CurrentTime = ( setValue : any , currnetTime : string ) => {

   const [ is_CurrentTime_Column , set_Is_CurrentTime_Column ] = useState< string >( "" ) ;
 

   // 點選 _ 設定時間欄位值、是否這定狀態 
   const click_Set_CurrentTime = ( columnName : string ) => {

      set_Is_CurrentTime_Column( !is_CurrentTime_Column ? columnName : "" ) ;
      setValue( columnName , is_CurrentTime_Column ? '00 : 00' : currnetTime ) ; 

   } 

   return {  is_CurrentTime_Column ,  click_Set_CurrentTime }

} ;


