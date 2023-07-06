
interface IPlan  {

    plan_Applied_Species        : any[] ;  // 方案所套用的所有寵物品種

    current_Custom_Bath_Num     : number ; // 目前自訂方案，設定 : 洗澡次數
    current_Custom_Beauty_Num   : number ; // 目前自訂方案，設定 : 美容次數
   
    current_Custom_DefaultPrice : number ; // 目前自訂方案，設定 : 預設價格
    current_Custom_SpeciesPrice : number ; // 目前自訂方案，設定 : 品種價格

    current_Custom_Price_Method : string ; // 計價方式 : 平均計算 / 自行計算

}

export const initState = {
                           plan_Applied_Species        : [] ,

                           current_Custom_Bath_Num     : 0 , 
                           current_Custom_Beauty_Num   : 0 ,

                           current_Custom_DefaultPrice : 0 ,
                           current_Custom_SpeciesPrice : 0 ,

                           current_Custom_Price_Method : "平均計算" , 
  
                         } ;


export const ACTIONS = {

    SET_PLAN_APPLIED_SPECIES         : "SET_PLAN_APPLIED_SPECIES" ,         // 設定 _ 新增方案，所套用的所有寵物品種

    SET_CURRENT_CUSTOM_BATH_NUM      : "SET_CURRENT_CUSTOM_BATH_NUM" ,      // 設定 _ 自訂方案：洗澡次數
    SET_CURRENT_CUSTOM_BEAUTY_NUM    : "SET_CURRENT_CUSTOM_BEAUTY_NUM" ,    // 設定 _ 自訂方案：美容次數

    SET_CURRENT_CUSTOM_DEFAULT_PRICE : "SET_CURRENT_CUSTOM_DEFAULT_PRICE" , // 設定 _ 自訂方案：預設價格
    SET_CURRENT_CUSTOM_SPECIES_PRICE : "SET_CURRENT_CUSTOM_SPECIES_PRICE" , // 設定 _ 自訂方案：品種價格

    SET_CURRENT_CUSTOM_PRICE_METHOD  : "SET_CURRENT_CUSTOM_PRICE_METHOD" ,  // 設定 _ 計價方式 : 平均計算 / 自行計算

} ;


const createCustomPlanReducer = ( state : IPlan = initState , action : any ) => {
 
     const { type , payload } = action ;

     switch( type ){

        // 設定 _ 新增方案，所套用的所有寵物品種
        case ACTIONS.SET_PLAN_APPLIED_SPECIES :
             return { ...state , plan_Applied_Species : payload.plan_Applied_Species } ;

        // 設定 _ 自訂方案：洗澡次數 
        case ACTIONS.SET_CURRENT_CUSTOM_BATH_NUM :
             return { ...state , current_Custom_Bath_Num : payload.current_Custom_Bath_Num } ;
             
        // 設定 _ 自訂方案：美容次數     
        case ACTIONS.SET_CURRENT_CUSTOM_BEAUTY_NUM :
             return { ...state , current_Custom_Beauty_Num : payload.current_Custom_Beauty_Num } ;

        // 設定 _ 自訂方案：預設價格
        case ACTIONS.SET_CURRENT_CUSTOM_DEFAULT_PRICE :
             return { ...state , current_Custom_DefaultPrice : payload.current_Custom_DefaultPrice } ;

        // 設定 _ 自訂方案：品種價格
        case ACTIONS.SET_CURRENT_CUSTOM_SPECIES_PRICE :
          return { ...state , current_Custom_SpeciesPrice : payload.current_Custom_SpeciesPrice } ;

        // 設定 _ 計價方式 : 平均計算 / 自行計算  
        case ACTIONS.SET_CURRENT_CUSTOM_PRICE_METHOD :
           return { ...state , current_Custom_Price_Method : payload.current_Custom_Price_Method  } ;
        
        default :
            throw new Error( `未符合 createCustomPlanReducer 類型條件 : ${ type }` )

     }


} ;


export default createCustomPlanReducer
       