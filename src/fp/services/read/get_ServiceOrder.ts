import { is_Delete } from "fp/state" ;
import { compose , append_Obj } from "fp/tool" ;


// 取得 _ 服務單 : 資料表 id
export const get_ServiceOrderId = ( serviceData : ServiceOrder ) : string  => {

    return serviceData.service_type === "基礎" && serviceData.basic_id  ? serviceData.basic_id  :
           serviceData.service_type === "洗澡" && serviceData.bath_id   ? serviceData.bath_id   : 
           serviceData.service_type === "美容" && serviceData.beauty_id ? serviceData.beauty_id : 
           "" ;

} ;


// 取得 _ 服務單 : API Url
export const get_ServiceOrderUrl = ( serviceType : ServiceTypes_ZH ) : string => {

    return serviceType === "基礎" ? "/basics"   : 
           serviceType === "洗澡" ? "/bathes"   : 
           serviceType === "美容" ? "/beauties" : 
           "" ;
      
} ;


// 取得 _ 服務單 : 資料表 id + API Url < T >
export const get_ServiceOrder_Url_Id = ( serviceData : ServiceOrder ) : { serviceUrl : string , serviceId : string }   => {

    return { serviceUrl : get_ServiceOrderUrl( serviceData.service_type ) , serviceId : get_ServiceOrderId( serviceData ) }

} ;


// ----------------------

// 取得 _ 服務單銷單 : 修改物件
export const get_ServiceOrder_Delete_Obj = ( delete_Submitter : string ) : Delete_Obj => {

    return { 
             is_delete        : is_Delete() ,
             delete_submitter : delete_Submitter  
           }

} ;



// 取得 _ 服務單銷單 : 所有資訊物件
export const get_ServiceOrder_DeleteInfo_Obj = ( serviceData : ServiceOrder ) => {

    const obj = {} ;

    return compose(
                    append_Obj( "serviceOrder_Url" , get_ServiceOrderUrl( serviceData.service_type ) ) ,
                    append_Obj( "serviceOrder_Id" , get_ServiceOrderId( serviceData ) ) ,
                    append_Obj( "ServiceOrder_DeleteObj" , get_ServiceOrder_Delete_Obj( "Danny" ) )  
                  )( obj ) ; 

                    
} ;




