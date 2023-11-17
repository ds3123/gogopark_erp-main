
import { Dispatch } from "redux" ;



// # 設定 _ 財務管理下，各報表查詢日期的類型
export const set_Finance_Query_Date_Type = ( dateType : '付款日期' | '到店日期' ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type                    : "SET_FINANCE_QUERY_DATE_TYPE" ,
                    finance_Query_Date_Type : dateType
                }) ;

           } ;

} ;


// # 設定 _ < 洗澡美容 : 應收款 > _ 資料取得：是否完成
export const set_Is_Fetching_Service_Receivable_Done = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                           type                                : "SET_IS_FETCHING_SERVICE_RECEIVABLE_DONE" ,
                           is_Fetching_Service_Receivable_Done : bool
                         }) ;

           } ;

} ;


// # 設定 _ < 洗澡美容 : 扣 _ 預收款 > _ 資料取得：是否完成 
export const set_Is_Fetching_Deduct_Advance_Receipt_Done = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                           type                                    : "SET_IS_FETCHING_DEDUCT_ADVANCE_RECEIPT_DONE" ,
                           is_Fetching_Deduct_Advance_Receipt_Done : bool
                         }) ;

           } ;

} ;


// # 設定 _ < 洗澡美容 : 預收款 > _ 資料取得：是否完成 
export const set_Is_Fetching_Advance_Receipt_Done = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                           type                             : "SET_IS_FETCHING_ADVANCE_RECEIPT_DONE" ,
                           is_Fetching_Advance_Receipt_Done : bool
                         }) ;

           } ;

} ;


// # 設定 _ < 住宿安親 : 應收款 > _ 資料取得：是否完成 
export const set_Is_Fetching_Lodge_Receivable_Done = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                           type                              : "SET_IS_FETCHING_LODGE_RECEIVABLE_DONE" ,
                           is_Fetching_Lodge_Receivable_Done : bool
                         }) ;

           } ;

} ;


