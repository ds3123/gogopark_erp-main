
import axios from 'utils/axios' ;
import { Service_Type_Api } from "utils/Interface_Type" ;



// @ [ 整體 ] 服務 / 洗美 相關 API ( 資料表 : basic, bath, beauty, care , lodge )


// [ GET ] ---------------

// 取得 _ 特定 [ 到店日期 ] ( 欄位 : servcie_date ) 所有服務資料 ( for React Query )
export const fetch_Services_By_ServiceDate = ( account_id : string , service_date : string ) => 
                axios.get< any[] >( `/services/show_services/${ account_id }/${ service_date }` ).then( res => res.data ) ;


// 取得 _ 特定 [ 付款日期 ] ( 欄位 : payment_date ) 所有服務資料 ( for React Query )
export const fetch_Services_By_PaymentDate = ( account_id : string , payment_date : string ) => 
                axios.get< any[] >( `/services/show_services_by_paymentdate/${ account_id }/${ payment_date }` ).then( res => res.data ) ;

// 取得 _ 特定 [ 付款日期 ] : 所有加價單
export const fetch_ExtraFees_By_PaymentDate = ( account_id : string , payment_date : string ) => 
                axios.get< any[] >( `/extra_fees/show_extra_fees_by_paymentdate/${ account_id }/${ payment_date }` ).then( res => res.data ) ;


// 取得 _ 特定客戶，過去各種服務類型 ( 基礎、洗澡、美容 ) 服務記錄 ( for React Query )
export const fetch_Services_Type_By_Customer_Id = ( service_Type : Service_Type_Api , customer_Id : string ) => 
                axios.get< any[] >( `/${ service_Type }/show_customer_id/${ customer_Id }` ).then( res => res.data ) ;


// 取得 _ 特定店家，所有服務 < 異常 >  ( for React Query )
export const fetch_Shop_Service_Error_Page = ( account_id : string , page : number = 1 ) => 
                axios.get< any[] >( `/services/show_services_by_error/${ account_id }/1?page=${ page }` ).then( res => res.data ) ;

// 取得 _ 特定店家，所有 < 銷單 >  ( for React Query )
export const fetch_Shop_Service_Delete_Page = ( account_id : string , page : number = 1 ) => 
                axios.get< any[] >( `/services/show_services_by_delete/${ account_id }/1?page=${ page }` ).then( res => res.data ) ;


// 取得 _ 特定店家，被 < 封存 > 的服務，及其客人、關係人、寵物 ( for React Query )
export const fetch_Shop_Service_Archive_Page = ( account_id : string , page : number = 1 ) => 
                axios.get< any[] >( `/services/show_all_with_cus_relative_pet/${ account_id }/1?page=${ page }` ).then( res => res.data ) ;


// 取得 _ 特定寵物、特定服務類型 ( 基礎、洗澡、美容、安親、住宿 ) 下，所有服務紀錄 ( for React Query )
export const fetch_Services_By_PetSeial_ServiceType = ( pet_serial : string , service_type : string ) => 
                axios.get< any[] >( `/${ service_type }/show_pet_records/${ pet_serial }` ).then( res => res.data ) ;


// 取得 _ 特定店家，特定到店日期，基礎、洗澡、美容、安親 等 4 種服務 ， 所有 "已使用" 的 Qcode ( for React Query )
export const fetch_Shop_ServiceDate_Used_Qcodes = ( account_id : string , service_date : string ) =>            
                axios.get< any[] >( `services/show_qcode/${ account_id }/${ service_date }` ).then( res => res.data ) ;
          
                
// 取得 _ 特定店家，特定服務日期開始，所有【 預約 】資料 ( for React Query )
export const fetch_Shop_Reservations_From_ServiceDate = ( account_id : string , service_date : string ) =>
                axios.get< any[] >( `/services/show_service_reservations/${ account_id }/${ service_date }` ).then( res => res.data ) ;                    



//  取得 _ 特定店家，特定服務日期，所以 【 預約 】與 【 轉異常 】服務單 ( for React Query )
export const fetch_Shop_Services_With_Delete_Error_On_ServiceDate = ( account_id : string , service_date : string ) =>
                 axios.get< any[] >( `/services/show_services_is_delete_error_by_date/${ account_id }/${ service_date }` ).then( res => res.data ) ;                    


// 取得 _ 特定店家，所有【 轉異常 】服務單 ( for React Query )
export const fetch_Shop_Services_With_Error = ( account_id : string ) =>
                 axios.get< any[] >( `/services/show_shop_services_by_error/${ account_id }/1` ).then( res => res.data ) ;                    




// 取得 _ 特定日期，到店狀態 : 已回家( 房 )
export const get_Services_Have_Gone_Home_By_Date = ( account_id : string , date : string ) =>  
                axios.get( `services/show_services_is_gohome_by_date/${ account_id }/${ date }` ) ;         


// [ POST ] ---------------

// 新增 _ 加價單 ( for React Query )
export const create_Extra_Fee = ( obj : any ) => axios.post( "/extra_fees" , obj ) ;




// [ PUT ] ---------------

export const update_Service_By_Service_Url_Id = ( service_Url : string , service_Id : string , obj : any ) => 
              axios.put( `${ service_Url }/${ service_Id }` , obj ) ;


// 更新 _ 加價單 ( for React Query )
export const update_Extra_Fee_By_Id = ( obj : any ) => 
              axios.put( `/extra_fees/${ obj.extra_fee_id }` , obj ) ;



// [ DELETE ] ---------------

// 刪除 _ 加價單 ( for React Query )
export const delete_Extra_Fee = async( id : string ) => await axios.delete( `/extra_fees/${ id }` ) ;

