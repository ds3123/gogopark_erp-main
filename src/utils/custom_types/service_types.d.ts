



type ServiceTypes_ZH = "基礎" | "洗澡" | "美容" | "安親" | "住宿" | "方案" ;



// 服務單資料
interface ServiceOrder {

    service_type    : ServiceTypes_ZH ;  // for 主要服務
    
    service_status? : string ;                    // for 住宿、安親  
             
    basic_id?       : string ;
    bath_id?        : string ;
    beauty_id?      : string ;
 
 }
