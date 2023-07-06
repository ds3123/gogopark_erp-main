




// # 查詢 _ 寵物相關 Query Key
export const petKeys = {

    // 所有寵物
    "all_pets"          : [ "all_pets" ] , 

    // 取得 _ 特定店家，所有寵物，及其主人  
    "shop_pets_customers" : ( account_id : string ) =>  [ ...petKeys.all_pets , "shop_pets_customers" , account_id ] ,

    // 特定店家，在資料表 pet 中，為特定品種 (名稱) 的寵物 
    "shop_species_name" : ( account_id : string , species_name : string  ) =>  [ ...petKeys.all_pets , "shop_species_name" , account_id , species_name ] ,
    
    // 特定店家，被 < 拒接 > ( 狀態 : 通過、審核中 ) 的寵物及其主人
    "shop_on_rejected"  : ( account_id : string , page : number = 1 ) =>  [ ...petKeys.all_pets , "shop_on_rejected" , account_id , page ] ,

    // 特定店家，被 < 封存 > 寵物，其主人、關係人
    "shop_archive_page" : ( account_id : string , page : number = 1 ) =>  [ ...petKeys.all_pets , "shop_archive_page" , account_id , page ] ,

    // 特定寵物的主人
    "pet_owner"         : ( pet_serial : string | undefined ) =>  [ "pet_owner" , pet_serial ] ,

    // 特定店家，特定寵物
    "shop_serial_pet"  :  ( account_id : string , serial : string )  => [  "shop_serial_pet" , account_id , serial ]

}