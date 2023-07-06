




// # 查詢 _ 寵物品種相關 Query Key
export const speciesKeys = {

    // 所有寵物品種
    "all_species"  : [ "all_species" ] , 


    // 特定商店，所有品種，及其服務價格
    "shop_service_prices" : ( account_id : string ) =>  [ ...speciesKeys.all_species , "shop_service_prices" , account_id ] ,


}