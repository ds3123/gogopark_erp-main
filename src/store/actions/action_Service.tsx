
import { Dispatch } from "redux"
import axios from "utils/axios"

// React-Toastify
import { toast } from "react-toastify"
import { set_Side_Panel } from "store/actions/action_Global_Layout"

import { switch_Service_Type_Id } from "utils/data/switch"
import Appointment_Record from "components/index/list/Appointment_Record"



/* @ 洗美頁  */

// # 設定 _ 洗美頁資料 _ 是否下載中
export const set_Service_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_SERVICE_ISLOADING" , Service_isLoading : bool }) ;

} ;


// # 設定 _ 目前新增 : 服務類別 ( Ex. 初次洗澡、單次洗澡、包月洗澡 ... )
export const set_Current_Create_Service_Type = ( serviceType : string ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_CURRENT_CREATE_SERVICE_TYPE" , serviceType : serviceType }) ;

} ;


// # 設定 _ 目前所點選 : 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )
export const set_Current_Create_Tab = ( tab : string ) => {

    return ( dispatch : Dispatch ) =>  dispatch({ type : "SET_CURRENT_CREATE_TAB" , current_Create_Tab : tab }) ;

} ;

type error = {

   service_type  : string ;
   service_id    : string | number | null ;
   handle_status : string ;
   handle_note   : string ;
   handle_user   : string ;

}


// # 取得 : 特定服務類型、資料表 id _ 服務異常處理紀錄
export const get_ServiceError_Handle_Record = ( service_type : string , service_id : string | number | null ) => {

    return ( dispatch : Dispatch ) => {

                axios.get( `/service_error_records/show_by/${ service_type }/${ service_id }` ).then( res => {

                    dispatch({
                        type                         : "GET_SERVICEERROR_HANDLE_RECORD" ,
                        service_Error_Handle_Records : res.data
                    }) ;

                })

           } ;

} ;


// # 新增 : 服務異常處理紀錄
export const add_ServiceError_Handle_Record = ( data : error ) => {

    return ( dispatch : Dispatch ) => {

              axios.post( "/service_error_records" , data ).then( res => {

                 // 新增成功通知
                 toast( `🦄 已新增 : 異常處理紀錄`, { position: "top-left", autoClose: 1500 , hideProgressBar: false } ) ; 

            
              })

           } ;

} ;


// # 刪除 : 服務異常處理紀錄
export const delete_ServiceError_Handle_Record = ( id : string ) => {

    return ( ) => {

              axios.delete( `/service_error_records/${ id }`  ).then( res => {

                 // 刪除成功通知
                 toast( `🦄 已刪除 : 異常處理紀錄`, { position: "top-left", autoClose: 1500 , hideProgressBar: false } ) ; 
            
              })

           } ;


} ;



// 計算 _ 洗澡美容 "應收款" 小計金額 
export const cal_Service_Amount_Total = ( data : any[] , dispatch : any  ) => {

        // 篩選出 _ 基礎、洗澡、美容
        const _data = data.filter( ( x : any ) => x['payment_method'] === '現金' && ( x['service_type'] === '基礎' || x['service_type'] === '洗澡' || x['service_type'] === '美容' ) ) ;
        
        // 加總 _ 小計金額
        let total_Amount = 0 ;
        _data.forEach( ( x : any ) => total_Amount += x['amount_paid'] ) ;

        // 設定 _ 小計金額
        dispatch({ 
                    type                 : "SET_SERVICE_AMOUNT_TOTAL" ,
                    service_Amount_Total : total_Amount
         }) ;

} ;



// 計算 _ 洗澡美容 "扣 _ 預收款" 小計金額 ( 使用方案金額 )
export const cal_Deduct_Plan_Amount_Total = ( data : any[] , dispatch : any  ) => {

    // 篩選出 "方案"
    const _data = data.filter( ( x : any ) => x['payment_method'] === '方案' ) ; 

    // 加總 _ 小計金額
    let total_Amount = 0 ;
    _data.forEach( ( x : any ) => {

      const plan_Type = x?.plan?.plan_type ; // 方案類型 ( Ex. 預設方案 : 包月洗澡 / 包月美容 ; 自訂方案 )

      if( plan_Type === '包月洗澡' )                            total_Amount += x['bath_month_fee'] ;
      if( plan_Type === '包月美容' )                            total_Amount += x['beauty_month_fee'] ;
      if( plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ) total_Amount += x?.plan?.service_price ; 

    }) 

    // 設定 _ 小計金額
    dispatch({ 
               type                     : "SET_DEDUCT_PLAN_AMOUNT_TOTAL" ,
               deduct_Plan_Amount_Total : total_Amount
            }) ;

} ;



// 計算 _  住宿安親 "應收款" 小計金額
export const cal_Care_Lodge_Amount_Total = ( data : any[] , dispatch : any  ) => {

    // 篩選、設定 _ 現金支付資料，並且服務類型為 : 安親、住宿 
    const _data = data.filter( ( x : any ) => {

       return x['payment_method'] === '現金' && ( x['service_status'] === '當日安親' || x['service_status'] === '預約安親' || x['service_status'] === '當日住宿' || x['service_status'] === '預約住宿' )

    }) ;
   
    // 加總 _ 小計金額
    let total_Amount = 0 ;
    _data.forEach( ( x : any ) => total_Amount += x['amount_paid'] )
    
    // 設定 _ 小計金額
    dispatch({ 
              type                    : "SET_CARE_LODGE_AMOUNT_TOTAL" ,
              care_Lodge_Amount_Total : total_Amount
             }) ;

} ;



// 將服務所有狀態，設回 _ 初始值
export const set_Service_States_To_Default = () => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_SERVICEW_STATES_TO_DEFAULT" }) ;

} ;


// 切換 _ 預約狀態 ( Ex. 尚未到店 --> 到店等候中 )
export const switch_Appointment_Status = ( data : any , status : '到店等候中' , history : any ) => {

    return ( dispatch : any ) => {

                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } =  switch_Service_Type_Id( data ) ;

                // 更新 _ 異常狀態
                if( service_Id && service_Url ){
        
                    const obj = { shop_status : status } ;
        
                    axios.put( `${ service_Url }/${ service_Id }` , obj ).then( res => {
        
                        toast(`🦄 已切換至 : 到店等候中`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});
        
                        dispatch( set_Side_Panel( false , null ,{} ) ) ;
        
                        history.push("/wrongpath");  // 錯誤路徑
                        history.push("/index");      // 正確路徑
        
                    })
        
                }

           } ;
           
} ;



// 更改 _ 已付金額
export const change_Amount_Paid = ( data : any , e : any ) => {

    return ( dispatch : any ) => {

                const input_Amount = e.target.value ;

                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } = switch_Service_Type_Id( data ) ;

                // 更新 _ 異常狀態
                if( service_Id && service_Url ){
        
                    const obj = { amount_paid : input_Amount ? input_Amount : 0 } ;

                    axios.put( `${ service_Url }/${ service_Id }` , obj ).then( res => {
        
                       toast( `🦄 已更改 : 已付金額` , { position : "top-left" , autoClose : 1500 , hideProgressBar : false });
    
                       // 清除、再重新載入、刷新預約頁面    
                       dispatch( set_Side_Panel( false , null , {} ) ) ;
                       dispatch( set_Side_Panel( true , <Appointment_Record /> , {} ) ) ;

                    })
        
                }

           } ;
           
} ;





// 設定 _ 是否加入篩選條件 : 來店日期
export const set_Is_Filtered_By_Service_Date = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_IS_FILTERED_BY_SERVICE_DATE" , is_Filtered_By_Service_Date : bool }) ;

} ;






















