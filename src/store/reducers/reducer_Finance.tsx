


/* @ 管理區 > 財務管理  */
interface IFinance {

   finance_Query_Date_Type                 : string ;  // "特定日期" 的 其他收支項目
   
   // 資料取得是否完成 ( for 是否顯示下載圖示 )
   is_Fetching_Service_Receivable_Done     : boolean ; // < 洗澡美容 : 應收款 >     
   is_Fetching_Deduct_Advance_Receipt_Done : boolean ; // < 洗澡美容 : 扣 _ 預收款 >
   is_Fetching_Advance_Receipt_Done        : boolean ; // < 洗澡美容 : 預收款 >
   is_Fetching_Lodge_Receivable_Done       : boolean ; // < 住宿安親 : 應收款 >

}

const initState = {

    finance_Query_Date_Type                 : '付款日期' ,

    is_Fetching_Service_Receivable_Done     : false ,
    is_Fetching_Deduct_Advance_Receipt_Done : false ,
    is_Fetching_Advance_Receipt_Done        : false ,
    is_Fetching_Lodge_Receivable_Done       : false ,

} ;


const reducer_Finance = ( state : IFinance = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 財務管理下，各報表查詢日期的類型
        case  "SET_FINANCE_QUERY_DATE_TYPE"                 : return { ...state , finance_Query_Date_Type : action.finance_Query_Date_Type } ;
     
        // # 設定 _ < 洗澡美容 : 應收款 > _ 資料取得：是否完成 
        case  "SET_IS_FETCHING_SERVICE_RECEIVABLE_DONE"     : return { ...state , is_Fetching_Service_Receivable_Done : action.is_Fetching_Service_Receivable_Done } ;

        // # 設定 _ < 洗澡美容 : 扣 _ 預收款 > _ 資料取得：是否完成 
        case  "SET_IS_FETCHING_DEDUCT_ADVANCE_RECEIPT_DONE" : return { ...state , is_Fetching_Deduct_Advance_Receipt_Done : action.is_Fetching_Deduct_Advance_Receipt_Done } ;

        // # 設定 _ < 洗澡美容 : 預收款 > _ 資料取得：是否完成 
        case  "SET_IS_FETCHING_ADVANCE_RECEIPT_DONE"        : return { ...state , is_Fetching_Advance_Receipt_Done : action.is_Fetching_Advance_Receipt_Done } ;

        // # 設定 _ < 住宿安親 : 應收款 > _ 資料取得：是否完成 
        case  "SET_IS_FETCHING_LODGE_RECEIVABLE_DONE"       : return { ...state , is_Fetching_Lodge_Receivable_Done : action.is_Fetching_Lodge_Receivable_Done } ;

        
        default : return state ;

    }

} ;

export default reducer_Finance ;
