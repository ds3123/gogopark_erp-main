/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react' ;
import { useSelector } from "react-redux";


/*

   在 "新增" 狀況下，editType 與 data 參數，皆為 undefined --> for "編輯"

*/


// # 新增服務時，實收金額 : 相關 effect
export const useEffect_Amount_Paid_Create = ( setValue : any  , receivable : number , editType : string | undefined  , data : any ) => {

    // 服務狀態 ( 已到店、預約_今天、預約_未來 )
    const service_Status = useSelector( ( state : any ) => state.Info.service_Status ) ;



    // # 實收金額欄位 : 變動處理
    const handle_ActualPayment = ( value : any ) => {
 
            
            // for 新增
            if( !editType && ( value > receivable ) ){

                alert('實收金額，不能大於應收金額') ;
                setValue( 'amount_Paid' , receivable ) ;

                return false ;

            }

            // for 編輯 ( 編輯時 receivable 為 0 ) 
            if( editType && ( value > data?.amount_payable ) ){

                alert('實收金額，不能大於應收金額') ;
                setValue( 'amount_Paid' , data?.amount_payable ) ;

                return false ;

            }



            if( value < 0 ){

                setValue( 'amount_Paid' , '' ) ;
            
                return false ;

            }

    } ;  



    // 預先設定 _ 實收金額 ( amount_Paid ) -  若為預約 ( 預約_今天 or 預約_未來 )，實收預先設定為 0 
    useEffect( () => {
      
      if( !editType ) setValue( 'amount_Paid' , service_Status === '已到店' ? receivable : 0 )  ;
       
    } , [ receivable , editType ] ) ;



    return handle_ActualPayment     

} ;

