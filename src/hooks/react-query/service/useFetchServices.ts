
import { useQuery } from "react-query" ;
import moment from "moment" ;
import { serviceKeys } from "react-query/query-key/serviceKeys" ;
import { Service_Type } from "utils/Interface_Type" ;
import { get_Service_Url } from "utils/data/switch" ;
import { 
         fetch_Services_By_ServiceDate , 
         fetch_Services_By_PaymentDate , 
         fetch_ExtraFees_By_PaymentDate ,
         fetch_Services_Type_By_Customer_Id ,
         fetch_Services_By_PetSeial_ServiceType ,
         fetch_Shop_ServiceDate_Used_Qcodes ,
         fetch_Shop_Reservations_From_ServiceDate ,
         fetch_Shop_Services_With_Delete_Error_On_ServiceDate ,
         fetch_Shop_Services_With_Error ,
         fetch_Shop_Services_GoneHome_By_ServiceDate
        } from "utils/api/api_Service" ; 

import { fetch_Shop_Service_Tags } from "utils/api/api_Service_Tag" ;
import { Service_Type_Api , Primary_Services } from "utils/Interface_Type" ;
import { useDispatch } from "react-redux" ;
import { 
         set_Is_Fetching_Service_Receivable_Done ,
         set_Is_Fetching_Lodge_Receivable_Done ,
         set_Is_Fetching_Deduct_Advance_Receipt_Done
} from 'store/actions/action_Finance'





// 取得 _ 特定 [ 到店日期 ] ( 欄位 : service_date ) : 所有服務
export const useFetch_Services_By_ServiceDate = ( account_id : string , service_date : string ) => {

    const dispatch = useDispatch();

    // 預設值
    const fallback = [] as any[] ;  

    const { data = fallback } = useQuery( 
                                           serviceKeys.service_date( account_id , service_date ) , 
                                           () => fetch_Services_By_ServiceDate( account_id , service_date ) ,
                                           { enabled : !!service_date ,
                                           
                                              onSuccess : ( data ) => {

                                                 // 資料取得完成，關掉下載中圖示
                                                 dispatch( set_Is_Fetching_Deduct_Advance_Receipt_Done( true ) ) ;

                                              } 
                                          
                                           } 
                                         ) ;

    return data                                        

}


// 取得 _ 特定 [ 付款日期 ] ( 欄位 : payment_date ) : 所有服務
export const useFetch_Services_By_PaymentDate = ( account_id : string , payment_date : string ) => {
  

    const dispatch = useDispatch() ;

    // 預設值
    const fallback = [] as any[] ;  

    const { data = fallback } = useQuery( 
                                           serviceKeys.payment_date( account_id , payment_date ) , 
                                           () => fetch_Services_By_PaymentDate( account_id , payment_date ) ,
                                           { 
                                              enabled : !!payment_date ,
                                              onSuccess : ( data ) => {

                                                 // 資料取得完成，關掉下載中圖示
                                                 dispatch( set_Is_Fetching_Service_Receivable_Done( true ) ) ; // 洗澡美容：應收款
                                                 dispatch( set_Is_Fetching_Lodge_Receivable_Done( true ) ) ;   // 住宿安親：應收款

                                              } ,
                                              onError : ( error ) => {

                                                 console.log( "useFetch_Services_By_PaymentDate : " , error ) ;

                                              } 

                                           } 
                                         ) ;

    return data        
  
}

// 取得 _ 特定 [ 付款日期 ] : 所有加價單 < T >
export const useFetch_ExtraFees_By_PaymentDate = ( account_id : string , payment_date : string ) => {

  // 預設值
  const fallback    = [] as any[] ;  

  const { data = fallback } = useQuery( 
                                         serviceKeys.extra_fee( account_id , payment_date ) , 
                                         () => fetch_ExtraFees_By_PaymentDate( account_id , payment_date ) 
                                       ) ;


  return data        

}


// 取得 _ 今天 : 所有服務 ( 輪詢 )
export const useFetch_Services_By_ServiceDate_Polling_Today = ( account_id : string ) => {

  const today    = moment( new Date() ).format( 'YYYY-MM-DD' ) ;  // 今日     
  const fallback = [] as any[] ;                                  // 預設值

  const { data = fallback , isError } = useQuery( 
                                                  serviceKeys.polling_today( account_id , today ) , 
                                                  () => fetch_Services_By_ServiceDate( account_id , today ) , 
                                                  { 
                                                    enabled         : !!account_id  ,
                                                    refetchInterval : 2000 ,  // 每個 2 秒輪詢
                                                  } 
                                                ) ;

  return { data , isError }                                  

}


// 取得 _ 特定客戶，過去各種服務類型 ( 基礎、洗澡、美容 ) 服務記錄 
export const useFetch_Services_Type_By_Customer_Id = ( current_Create_Tab : Service_Type , customer_Id : string ) => {

  
  let service_Url : Service_Type_Api = "basics" ;

  if( current_Create_Tab === "洗澡" ) service_Url = "bathes" ;
  if( current_Create_Tab === "美容" ) service_Url = "beauties" ;
  if( current_Create_Tab === "安親" ) service_Url = "cares" ;
  if( current_Create_Tab === "住宿" ) service_Url = "lodges" ;


  // 預設值
  const fallback = [] as any[] ;  

  const { data = fallback } = useQuery( 
                                        serviceKeys.type_customer_id( service_Url , customer_Id ) , 
                                        () => fetch_Services_Type_By_Customer_Id( service_Url , customer_Id ) ,
                                        { enabled : !!customer_Id }  // 有查詢身份字號，才進行查詢
                                       ) ;

  return data        


} 


// 取得 _ 特定寵物、特定服務類型 ( 基礎、洗澡、美容、安親、住宿 ) 下，所有服務紀錄 
export const useFetch_Services_By_PetSeial_ServiceType = ( pet_serial : string , service_type : Primary_Services  ) => {


    // 轉換取得 _ 服務 url ( Ex. basics、bathes、beauties ... ) 
    const service_Url = get_Service_Url( service_type )  


    // 預設值
    const fallback = [] as any[] ;  

    const { data = fallback } = useQuery( 
                                          serviceKeys.pet_serial_service_type( pet_serial , service_type ) , 
                                          () => fetch_Services_By_PetSeial_ServiceType( pet_serial , service_Url ) ,
                                          { enabled : !!pet_serial && !!service_Url }  
                                        ) ;

    return data    


} ;


// 取得 _ 特定店家，特定到店日期，基礎、洗澡、美容、安親 等 4 種服務 ， 所有 "已使用" 的 Qcode
export const useFetch_Shop_ServiceDate_Used_Qcodes = ( account_id : string , service_date : string ) => {

   // 預設值
   const fallback = [] as any[] ;  


   const { data = fallback } = useQuery( 
                                          serviceKeys.shop_service_date_qcodes( account_id , service_date ) , 
                                          () => fetch_Shop_ServiceDate_Used_Qcodes( account_id , service_date ) ,
                                          { enabled : !!account_id && !!service_date }  
                                      ) ;

   return data    

} ;


// 取得 _ 特定店家，特定服務日期開始，所有【 預約 】資料 
export const useFetch_Shop_Reservations_From_ServiceDate  = ( account_id : string , service_date : string ) => {

  // 預設值
  const fallback = [] as any[] ;  

  const { data = fallback } = useQuery( 
                                         serviceKeys.shop_reservations_date( account_id , service_date ) , 
                                         () => fetch_Shop_Reservations_From_ServiceDate( account_id , service_date ) ,
                                         { enabled : !!account_id && !!service_date }  
                                      ) ;

  return data    

} ;


// 取得 _ 特定店家，特定服務日期，所有 【 預約 】與 【 轉異常 】服務單 < T >
export const useFetch_Shop_Services_With_Delete_Error_On_ServiceDate = ( account_id : string , service_date : string  ) => {

   // 預設值
   const fallback = [] as any[] ;  

   const { data = fallback } = useQuery( 
                                         serviceKeys.shop_services_delete_error_date( account_id , service_date ) , 
                                         () => fetch_Shop_Services_With_Delete_Error_On_ServiceDate( account_id , service_date ) ,
                                         { enabled : !!account_id && !!service_date }  
                                       ) ;

   return data    

} ; 


// 取得 _ 特定店家，所有【 轉異常 】服務單
export const useFetch_Shop_Services_With_Error = ( account_id : string  ) => {


  // 預設值
  const fallback = [] as any[] ;  

  const { data = fallback } = useQuery( 
                                        serviceKeys.shop_errors( account_id  ) , 
                                        () => fetch_Shop_Services_With_Error( account_id ) ,
                                        { enabled : !!account_id }  
                                      ) ;

  return data    


} ; 


// 取得 _ 特定店家，特定服務日期，到店狀態 ( shop_status ) : 已回家( 房 ) < T >
export const useFetch_Shop_Services_GoneHome_By_ServiceDate = ( account_id : string , service_date : string  ) => {

  // 預設值
  const fallback = [] as any[] ;  

  const { data = fallback } = useQuery( 
                                        serviceKeys.shop_services_gonehome_by_servicedate( account_id , service_date ) , 
                                        () => fetch_Shop_Services_GoneHome_By_ServiceDate( account_id , service_date ) ,
                                        { enabled : !!account_id && !!service_date }  
                                      ) ;

  return data    

} ;


// 取得 _ 特定店家，所有洗澡美容備註標籤 ( for checkbox )
export const useFetch_Shop_BathBeauty_CheckNotes = ( account_id : string ) => {

  // 預設值
  const fallback = [] as any[] ;  

  const { data = fallback } = useQuery( 
                                         "fetch_Shop_Service_Tags" , 
                                         () => fetch_Shop_Service_Tags( account_id ) ,
                                         { enabled : !!account_id  }  
                                     ) ;

  return data    

} ;