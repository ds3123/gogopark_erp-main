

// # 查詢 _ 住宿相關 Query Key
export const lodgeKeys = {

    // 所有住宿
    "all_lodges"  : [ "all_lodges" ] , 

    // 特定店家，所有熱門時段
    "shop_all_holidays"    : ( account_id : string ) => [ "shop_all_holidays" , account_id  ] ,

       
    // 所有 < 封存 > 住宿
    "archive_page" : ( account_id : string , page : number = 1 ) =>  [ ...lodgeKeys.all_lodges , "archive_page" , account_id , page ] ,
  
     

  }