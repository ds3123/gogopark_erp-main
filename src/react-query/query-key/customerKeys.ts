



// # 查詢 _ 客戶相關 Query Key
export const customerKeys = {

    // 所有客戶
    "all_customers"        : [ "all_customers" ] , 


    // 特定店家，所有客戶，及其寵物
    "shop_with_pets"       : ( account_id : string ) => [ ...customerKeys.all_customers , "shop_with_pets" , account_id ] ,


    // 特定店家，被 < 拒接 > ( 狀態 : 通過、審核中 ) 的客戶及其寵物
    "shop_on_rejected"     : ( account_id : string , page : number = 1 ) => [ ...customerKeys.all_customers , "shop_on_rejected" , account_id , page ] ,

    
    // 特定店家，被 < 封存 > 客戶，其關係人、寵物
    "shop_archive_page"    : ( account_id : string , page : number = 1 ) => [ ...customerKeys.all_customers , "shop_archive_page" , account_id , page ] ,


    // 特定店家，依照特定欄位 ( Ex. 身分證字料、手機號碼 ) 搜尋相關客戶
    "shop_query_by_column" : ( account_id : string , column : "id" | "mobile_phone" , value : string | undefined ) => [ ...customerKeys.all_customers , "shop_query_by_column" , account_id , column , value ] , 
    
    
    // 所有店家，依照特定欄位 ( Ex. 身分證字料、手機號碼 ) 搜尋相關客戶
    "all_shops_query_by_column" : ( column : "id" | "mobile_phone" , value : string | undefined ) => [ ...customerKeys.all_customers , "all_shops_query_by_column" , column , value ] , 


    // 特定客戶：所有寵物 
    "customer_pets_by_customer_id"  : ( customer_id : string ) => [ "customer_pets_by_customer_id" , customer_id ] ,


}