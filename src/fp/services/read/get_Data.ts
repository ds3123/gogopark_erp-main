


// 取得 _ 服務單 : 資料表 id
export const get_ServiceOrderId = ( serviceData : ServiceOrder ) : string | undefined => {

    return serviceData.service_type === "基礎" ? serviceData.basic_id  :
           serviceData.service_type === "洗澡" ? serviceData.bath_id   : 
           serviceData.service_type === "美容" ? serviceData.beauty_id : 
           "" ;

} ;


// 取得 _ 服務單 : API Url
export const get_ServiceOrderUrl = ( serviceType : ServiceTypes_ZH ) : string => {

    return serviceType === "基礎" ? "/basics"   : 
           serviceType === "洗澡" ? "/bathes"   : 
           serviceType === "美容" ? "/beauties" : 
           "" ;
      
} ;