
import axios from 'utils/axios' ;


// @ 寵物品種 相關 API ( 資料表 : pet_species )

// [ GET ] ---------------

// 取得 _ 所有品種 [ pet_species ] ( for React Query )
export const fetch_Species = ( ) => axios.get< any[] >( `/pet_species` ).then( res => res.data ) ;


// 取得 _ 特定商店，所有品種，及其服務價格 ( for React Query )
export const fetch_Shop_Species_With_Service_Prices = ( account_id : string  ) => 
                axios.get< any[] >( `/pet_species/show_all_species_shop_service_prices/${ account_id }` ).then( res => res.data ) ;


// [ POST ] ---------------

// 新增 _ 寵物品種 ( for React Query )
export const create_Pet_Species = ( obj : any ) => axios.post( "/pet_species" , obj ) ;



// [ PUT ] ---------------




// [ DELETE ] ---------------


// 刪除 _ 品種 ( for React Query )
export const delete_Species = async( id : string ) => await axios.delete( `/pet_species/${ id }` ) ;


