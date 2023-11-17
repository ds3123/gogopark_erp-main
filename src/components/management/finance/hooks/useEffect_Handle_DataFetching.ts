/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { 
        set_Is_Fetching_Service_Receivable_Done ,
        set_Is_Fetching_Deduct_Advance_Receipt_Done ,
        set_Is_Fetching_Advance_Receipt_Done ,
        set_Is_Fetching_Lodge_Receivable_Done
       } from 'store/actions/action_Finance'


// 各區塊資料取得狀態，是否已完成
export const useEffect_Is_Fetching_Status = () => {

     // 資料取得完成 _ 洗澡美容：應收款 
     const is_Fetching_Service_Receivable_Done     = useSelector( ( state : any ) => state.Finance.is_Fetching_Service_Receivable_Done ) ;

                    
     // 資料取得完成 _ 洗澡美容：扣 _ 預收款
     const is_Fetching_Deduct_Advance_Receipt_Done = useSelector( ( state : any ) => state.Finance.is_Fetching_Deduct_Advance_Receipt_Done ) ;
      
  
     // 資料取得完成 _ 洗澡美容： 預收款
     const is_Fetching_Advance_Receipt_Done        = useSelector( ( state : any ) => state.Finance.is_Fetching_Advance_Receipt_Done ) ;
     

     // 資料取得完成 _ 住宿安親 : 應收款
     const is_Fetching_Lodge_Receivable_Done       = useSelector( ( state : any ) => state.Finance.is_Fetching_Lodge_Receivable_Done ) ;
     
     return { 
               is_Fetching_Service_Receivable_Done ,
               is_Fetching_Deduct_Advance_Receipt_Done ,
               is_Fetching_Advance_Receipt_Done , 
               is_Fetching_Lodge_Receivable_Done
            } ;

} ;



// 當變換 _ 查詢日期時，先顯示：下載中圖示 
export const useEffect_Set_Is_Downloading = ( query_Date : string ) => {

    const dispatch = useDispatch(); 
    
    useEffect( () => {
     
        dispatch( set_Is_Fetching_Service_Receivable_Done( false ) ) ;      // 洗澡美容：應收款
        dispatch( set_Is_Fetching_Deduct_Advance_Receipt_Done( false ) ) ;  // 洗澡美容：扣 _ 預收款
        dispatch( set_Is_Fetching_Advance_Receipt_Done( false ) ) ;         // 洗澡美容：預收款
        dispatch( set_Is_Fetching_Lodge_Receivable_Done( false ) ) ;        // 住宿安親：應收款

    } , [ query_Date ] ) ;

} ;