



// # 查詢 _ 店家帳號相關 Query Key
export const accountKeys = {

    // 所有 _ 店家帳號
    "all_accounts"   : [ "all_accounts" ] , 

    // 特定 _ 店家帳號
    "single_shop"    : ( account_id : string ) =>  [ "single_shop" ,  account_id ] ,

    // 所有商店帳號
    "shops"          : ( ) =>  [ ...accountKeys.all_accounts , "shops"  ] ,
    
}
