




// # 查詢 _ 服務價格相關 Query Key
export const priceKeys = {

    // 所有服務價格
    "all_prices"  : [ "all_prices" ] , 

    // 特定店家，所有服務價格
    "shop" : ( account_id : string ) =>  [ ...priceKeys.all_prices , "shop" , account_id ] ,


    // 特定店家，特定類型 ( Ex. 基礎、洗澡、美容... )，所有服務價格
    "shop_type" : ( account_id : string , service_type : string ) =>  [ ...priceKeys.all_prices , "shop_type" , account_id , service_type ] ,


    // 特定店家，特定寵物品種 id ( 欄位 : species_id )，5 種基本服務價格 : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容
    "shop_species_5_prices" : ( account_id : string , species_id : string ) =>  [ "shop_species_5_prices" , account_id , species_id ] ,


}