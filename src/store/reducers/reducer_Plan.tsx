

/* @ 方案項目  */
interface IPlan {

    current_Plan_Type      : string ;          // 目前 _ 方案類型 ( 名稱 )
  
    current_Plan_Id        : number | string ; // 目前 _ 方案資料表 ( plans ) id
    current_Plan_Note      : string  ;         // 目前 _ 方案備註 Ex. 包月洗澡第 1 次
    
    current_Plan_Tag_Index : null | number ;   // 目前 _ 點選使用方案標籤的索引號碼 

    is_Plan_Used           : boolean ;         // 是否已 _ 點選使用方案 : "包月洗澡" or "包月美容" 標籤 ( for 表單提交驗證邏輯 )

    // * 價錢
    Month_Bath_Price       : number ;  // 包月洗澡
    Month_Beauty_Price     : number ;  // 包月美容

    self_Adjust_Amount     : number ;  // 自行調整金額
    service_Pickup_Fee     : number ;  // 接送費

    current_Plan_Price     : number ;  // 目前所選擇方案 _ 價錢小計

    // * 寵物方案
 
}

const initState = {

    current_Plan_Type      : '' ,
    current_Plan_Id        : '' ,
    current_Plan_Note      : '' ,

    current_Plan_Tag_Index : null ,
    
    Month_Bath_Price       : 0 ,
    Month_Beauty_Price     : 0 ,

    self_Adjust_Amount     : 0 ,
    service_Pickup_Fee     : 0 ,

    current_Plan_Price     : 0 ,

    is_Plan_Used           : false ,
    
    custom_Plans           : [] ,
    
} ;


const reducer_Plan = ( state : IPlan = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 目前所使用的方案類型
        case  "SET_CURRENT_PLAN_TYPE"      : return { ...state , current_Plan_Type : action.current_Plan_Type } ;

        // # 設定 _ 包月洗澡價格
        case  "SET_MONTH_BATH_PRICE"       : return { ...state , Month_Bath_Price : action.Month_Bath_Price } ;

        // # 設定 _ 包月美容價格
        case  "SET_MONTH_BEAUTY_PRICE"     : return { ...state , Month_Beauty_Price : action.Month_Beauty_Price } ;

        // # 設定 _ 目前所選擇方案 : 價錢小計
        case  "SET_CURRENT_PLAN_PRICE"     : return { ...state , current_Plan_Price : action.current_Plan_Price } ;

        // # 設定 _ 自訂 加 / 減 金額 ( for 包月洗澡、包月美容 )
        case  "SET_SELF_ADJUST_AMOUNT"     : return { ...state , self_Adjust_Amount : action.self_Adjust_Amount } ;

        // # 接送費 ( for 包月洗澡、包月美容 )
        case  "SET_SERVICE_PICKUP_FEE"     : return { ...state , service_Pickup_Fee : action.service_Pickup_Fee } ;

        // # 設定 _ 是否已點選使用 : 包月洗澡
        case  "SET_USE_PLAN"               : return { ...state , is_Plan_Used : action.is_Plan_Used } ;

        // # 設定 _ 目前選擇 : 方案資料表 ( plans ) id
        case  "SET_CURRENT_PLAN_ID"        : return { ...state , current_Plan_Id : action.current_Plan_Id } ;

        // # 設定 _ 方案備註 Ex. 洗澡第 1 次
        case  "SET_CURRENT_PLAN_NOTE"      : return { ...state , current_Plan_Note : action.current_Plan_Note } ;

        // # 設定 _ 目前點選使用方案標籤的索引號碼 
        case  "SET_CURRENT_PLAN_TAG_INDEX" : return { ...state , current_Plan_Tag_Index : action.current_Plan_Tag_Index } ;
      
        // # 設定 _ 回復初始值 
        case  "SET_PLAN_STATES_TO_DEFAULT" : return initState ;
        
        default : return state ;

    }

} ;

export default reducer_Plan ;
