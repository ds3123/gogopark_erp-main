

// # 查詢 _ 住宿相關 Query Key
export const lodgeKeys = {

    // 所有住宿
    "all_lodges"  : [ "all_lodges" ] , 
       
    // 所有 < 封存 > 住宿
    "archive_page" : ( account_id : string , page : number = 1 ) =>  [ ...lodgeKeys.all_lodges , "archive_page" , account_id , page ] ,
  
     
  }