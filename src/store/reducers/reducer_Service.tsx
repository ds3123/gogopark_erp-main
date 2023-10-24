

/* @ 洗美頁  */

interface IService {


    Service_isLoading               : boolean ; // 洗美頁資料 _ 是否下載中

    current_Create_Service_Type     : string ;  // 目前新增 _ 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
    current_Create_Tab              : string ;  // 目前所點選 _ 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )

    service_Error_Handle_Records    : any[] ;   // 服務異常處理紀錄  

    
    
    is_Filtered_By_Service_Date     : boolean ;  // 是否加入篩選條件 : 來店日期


}

const initState = {


    Service_isLoading               : true ,
    current_Create_Service_Type     : '' ,
    current_Create_Tab              : "" ,

    service_Error_Handle_Records    : [] ,


    is_Filtered_By_Service_Date     : false 
 
} ;


const reducer_Service = ( state : IService = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 洗美頁資料 : 是否下載中
        case "SET_SERVICE_ISLOADING" : return { ...state , Service_isLoading : action.Service_isLoading } ;

        // # 設定 _ 目前新增 : 服務類別 ( Ex. 初次洗澡、單次洗澡、包月洗澡 ... )
        case "SET_CURRENT_CREATE_SERVICE_TYPE" : return { ...state , current_Create_Service_Type : action.serviceType } ;

        // # 設定 _ 目前所點選 : 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )
        case "SET_CURRENT_CREATE_TAB" : return { ...state , current_Create_Tab : action.current_Create_Tab } ;

        // # 取得 _ 服務異常處理紀錄
        case "GET_SERVICEERROR_HANDLE_RECORD" : return { ...state , service_Error_Handle_Records : action.service_Error_Handle_Records } ;

        
        // 設定 _ 是否加入篩選條件 : 來店日期
        case "SET_IS_FILTERED_BY_SERVICE_DATE" : return { ...state , is_Filtered_By_Service_Date : action.is_Filtered_By_Service_Date } ;

        // # 設定 _ 回復初始值 
        case  "SET_SERVICEW_STATES_TO_DEFAULT" : return initState ;

        default : return state ;

    }


} ;

export default reducer_Service ;
