import { Dispatch } from "redux" ;
import {
         get_Plan_Used_Num ,
         get_Plan_Used_Note ,
       } from "utils/data/plan" ;


    
/* @ 方案 */
  

// # 設定 _ 包月洗澡價格
export const set_month_bath_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_MONTH_BATH_PRICE" , Month_Bath_Price : price }) ;

} ;

// # 設定 _ 包月美容價格
export const set_month_beauty_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_MONTH_BEAUTY_PRICE" , Month_Beauty_Price : price }) ;

} ;

// # 設定 _ 目前所選擇方案 : 價錢小計
export const set_Current_Plan_Price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_CURRENT_PLAN_PRICE" , current_Plan_Price : price }) ;

} ;

// # 設定 _ 自訂 加 / 減 金額 ( for 包月洗澡、包月美容 )
export const set_Self_Adjust_Amount = ( price : number ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_SELF_ADJUST_AMOUNT" , self_Adjust_Amount : price }) ;

} ;

// # 設定 _ 接送費 ( for 包月洗澡、包月美容 )
export const set_Service_Pickup_Fee = ( price : number ) => {

    return ( dispatch : Dispatch ) =>  dispatch({ type : "SET_SERVICE_PICKUP_FEE" , service_Pickup_Fee : price }) ;

} ;


// --------------------


// # 設定 _ 目前所使用的方案類型
export const set_current_plan_type = ( type : string ) => {

    return ( dispatch : Dispatch ) => dispatch( { type : "SET_CURRENT_PLAN_TYPE" , current_Plan_Type : type }) ;

} ;

// 設定 _ 是否已點選，使用方案
export const set_Use_Plan = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) =>  dispatch({ type : "SET_USE_PLAN" , is_Plan_Used : bool}) ;

} ;


// # 點選使用方案後，所設定 / 復原設定 _ 目前方案相關資訊
export const set_Use_Plan_Info = ( 
                                   clicked_Tag_Index : number | null,  // 所點選的方案索引
                                   plan_Id           : string ,        // 方案 id
                                   plan_Type         : string ,        // 方案類型( 名稱 ) 
                                   this_Used_Note    : string ,        // 此次使用備註 
                                   is_Using_Plan     : boolean         // 是否使用方案 ( for 提交鈕驗證 )
                                 ) => {

    return ( dispatch : any ) => {

        
        // 設定 _ 目前點選使用方案標籤的索引號碼 
        dispatch( { type : "SET_CURRENT_PLAN_TAG_INDEX" , current_Plan_Tag_Index : clicked_Tag_Index } ) ;   

        // 設定 _ 目前所點選方案 : 資料表 ( plans ) id
        dispatch( { type : "SET_CURRENT_PLAN_ID" , current_Plan_Id : plan_Id } ) ;

        // 設定 _ 目前所點選方案 : 類型 / 名稱
        dispatch( set_current_plan_type( plan_Type ) ) ;

        // 目前選擇 : 方案備註  Ex. 洗澡第 1 次
        dispatch( { type : "SET_CURRENT_PLAN_NOTE" , current_Plan_Note : this_Used_Note } ) ;

        // 設定 _ 是否已點選方案標籤 ( for 表單提交驗證 )
        dispatch( set_Use_Plan( is_Using_Plan ) ) ;


    }

} ;

// # 點選 _ 使用方案
export const click_Cutomer_Use_Plan_Tag = ( 
                                            current_Tag       : string ,        // 所處新增資料頁籤 ( Ex. 洗澡、美容 )
                                            current_Tag_Index : number ,        // 目前   _ 方案標籤索引
                                            clicked_Tag_Index : number | null , // 所點選 _ 方案標籤索引 
                                            clicked_Plan      : any             // 所點選使用方案內容
                                          ) => { 

  return ( dispatch : any ) => {

             // * 若已點選過，再次點選 : 復原 _ 方案相關資訊
             if( current_Tag_Index === clicked_Tag_Index ){

                 dispatch( set_Use_Plan_Info( null , "" , ""  , "" , false ) ) ;
                 return false ;

             } 
             
             // * 若未選過，點選 : 設定 _ 方案相關資訊
        
             // 已使用次數
             const used_Num       = get_Plan_Used_Num( current_Tag , clicked_Plan['plan_used_records'] ) ;   
    
             // 此次使用備註
             const this_Used_Note = get_Plan_Used_Note( current_Tag , clicked_Plan['plan_type'] , used_Num ) ;

             // 點選使用方案後，設定 _ 目前方案相關資訊 
             dispatch( set_Use_Plan_Info( 
                                           current_Tag_Index , 
                                           clicked_Plan['id'] , 
                                           clicked_Plan['plan_type'] , 
                                           this_Used_Note ,
                                           true  
                                         )) ;


         }

}



// --------------------

// 將方案所有狀態，設回 _ 初始值
export const set_Plan_States_To_Default = () => {

    return ( dispatch : Dispatch ) => { dispatch({ type : "SET_PLAN_STATES_TO_DEFAULT" }) ; } ;

} ;














