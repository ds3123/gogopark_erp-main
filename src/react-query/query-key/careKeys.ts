



// # 查詢 _ 安親相關 Query Key
export const careKeys = {

    // 所有安親
    "all_cares"  : [ "all_cares" ] , 
       
    // 所有 < 封存 > 安親
    "archive_page" : ( account_id : string , page : number = 1 ) =>  [ ...careKeys.all_cares , "archive_page" , account_id , page ] ,
  
     
  }