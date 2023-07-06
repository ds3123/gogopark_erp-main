



// # 查詢 _ 其他收入、支出相關 Query Key
export const otherKeys = {

    // 所有方案
    "all_others"  : [ "all_others" ] , 
      
    
    // 特定 [ 建檔日期 ] ( created_date ) 所收入、支出 
    "created_date" : ( account_id : string , created_date : string ) =>  [ ...otherKeys.all_others , "created_date" , account_id , created_date ] ,
  
  
}