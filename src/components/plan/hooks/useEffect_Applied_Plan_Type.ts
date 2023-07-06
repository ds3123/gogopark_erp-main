/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch } from "react-redux";
import { set_month_bath_price , 
         set_month_beauty_price , 
         set_current_plan_type , 
         set_Self_Adjust_Amount , 
         set_Service_Pickup_Fee  
        } from 'store/actions/action_Plan'



// 變動處理 : 方案類型 ( 名稱 )
export const useEffect_Handle_Plan_Type_Change = ( setValue : any ) => {


    const dispatch = useDispatch();


    // 初始、回復 _ 各項數據
    const set_Back_To_Default = () => {
     
        setValue( 'plan_Pet_Species' , '請選擇' ) ;   
        setValue( 'plan_Apply_Pet' , '' ) ;   
        setValue( 'plan_Adjust_Amount' , '' ) ;   
        setValue( 'plan_Pickup_Fee' , '' ) ;   
       
        // # 費用
        dispatch( set_month_bath_price( 0 )   ) ;      // 預設方案 ( 包月洗澡 )
        dispatch( set_month_beauty_price( 0 ) ) ;      // 預設方案 ( 包月美容 )
        
        dispatch( set_Self_Adjust_Amount( 0 ) ) ;      // 自訂增、減費用
        dispatch( set_Service_Pickup_Fee( 0 ) ) ;      // 接送費
     
     } ;

     
     // 變動處理 : 方案類型 ( 名稱 )
     const plan_Type_Change = ( plan_Type : string ) => {

        // 初始化 
        set_Back_To_Default() ;
       
        // 設定 _ 目前方案類型 ( 名稱 )
        dispatch( set_current_plan_type( plan_Type ) ) ;
       

    } ;

    return plan_Type_Change


} ;







