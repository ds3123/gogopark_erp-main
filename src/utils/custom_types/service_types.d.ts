

type ServiceTypes_ZH = "基礎" | "洗澡" | "美容" | "安親" | "住宿" | "方案" ;


// 服務單資料
interface ServiceOrder {

    service_type    : ServiceTypes_ZH ;  // for 主要服務
    
    service_status? : string ;           // for 住宿、安親  
             
    basic_id?       : string ;
    bath_id?        : string ;
    beauty_id?      : string ;
 
 }


// 刪除 _ 所需資訊物件
interface Delete_ServiceOrder_Info_Obj {

    serviceOrder_Url       : string ;    // 服務 API Url
    serviceOrder_Id        : string ;    // 服務單 id
    serviceOrder_DeleteObj : Delete_Obj  // 刪除 _ 修改物件
  
}