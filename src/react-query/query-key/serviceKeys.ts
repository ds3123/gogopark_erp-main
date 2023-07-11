
import { Primary_Services } from "utils/Interface_Type" ;



// # 查詢 _ 服務相關 Query Key
export const serviceKeys = {

  // 所有服務 
  "all_services"  : [ "all_services" ] , 
    
  // 今天 : 所有服務 ( 輪詢 )   
  "polling_today" : ( account_id : string , today : string ) => [ ...serviceKeys.all_services , "polling" , account_id , today ] ,
  
  // 特定 [ 到店日期 ] ( service_date ) 所有服務
  "service_date"  : ( account_id : string , service_date : string ) => [ ...serviceKeys.all_services , "service_date" , account_id , service_date ] ,
  
  // 特定 [ 付款日期 ] ( payment_date ) 所有服務
  "payment_date"  : ( account_id : string , payment_date : string ) => [ ...serviceKeys.all_services , "payment_date" , account_id , payment_date ] ,
  
  // 特定 [ 付款日期 ] : 所有加價單 

  "extra_fee" : ( account_id : string , payment_date : string ) => [  "extra_fee" , account_id , payment_date ] ,

  // 特定客戶，過去各種服務類型 ( 基礎、洗澡、美容 ) 服務記錄 
  "type_customer_id" : ( service_Type : string , customer_Id : string ) => [ ...serviceKeys.all_services , "type_customer_id" , service_Type , customer_Id ] ,
  
  // 所有 < 異常 > 服務 ( 分頁 )
  "error_page"  : ( account_id : string , page : number = 1 ) => [ ...serviceKeys.all_services , "error_page" , account_id , page ] ,

  // 所有 < 異常 > 服務 
  "shop_errors" : ( account_id : string ) => [ "shop_errors" , account_id ] ,


  // 所有 < 銷單 > 服務 ( 分頁 )
  "delete_page" : ( account_id : string , page : number = 1 ) => [ ...serviceKeys.all_services , "delete_page" , account_id , page ] ,

  // 所有 < 封存 > 服務 ( 分頁 )
  "archive_page" : ( account_id : string , page : number = 1 ) => [ ...serviceKeys.all_services , "archive_page" , account_id , page ] ,
   
  // 特定寵物、特定服務類型 ( 基礎、洗澡、美容、安親、住宿 ) 下，所有服務紀錄
  "pet_serial_service_type" : ( pet_serial : string , service_type : Primary_Services  ) => [ "pet_serial_service_type" , pet_serial , service_type ] ,

  // 取得 _ 特定店家，特定到店日期，基礎、洗澡、美容、安親 等 4 種服務 ， 所有 "已使用" 的 Qcode 
  "shop_service_date_qcodes" : ( account_id : string , service_date : string ) => [ "shop_service_date_qcodes" , account_id , service_date ] ,


  // 取得 _ 特定店家，特定服務日期開始，所有【 預約 】資料
  "shop_reservations_date" : ( account_id : string , service_date : string ) => [ "shop_reservations_date" , account_id , service_date ] ,


  // 取得 _ 特定店家，特定服務日期，所以 【 預約 】與 【 轉異常 】服務單 
  "shop_services_delete_error_date" : ( account_id : string , service_date : string ) => [ "shop_services_delete_error_date" , account_id , service_date ] ,


  // 取得 _ 特定店家，特定服務日期，到店狀態 ( shop_status ) : 已回家( 房 )
  "shop_services_gonehome_by_servicedate" : ( account_id : string , service_date : string ) => [ "shop_services_gonehome_by_servicedate" , account_id , service_date ]



}