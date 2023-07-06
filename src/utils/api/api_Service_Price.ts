
import axios from 'utils/axios' ;


// @ 服務價格 相關 API ( 資料表 : service_prices )

// [ GET ] ---------------


// 取得 _ 特定店家，所有服務價格 ( for React Query )
export const fetch_Shop_Service_Prices = ( account_id : string  ) => 
                axios.get< any[] >( `/service_prices/show_shop_service_prices/${ account_id }` ).then( res => res.data ) ;



// 取得 _ 特定店家，特定類型 ( 欄位 : service_type  Ex. 基礎、洗澡、美容 、加價項目、加價美容... )，所有服務價格 ( for React Query )
export const fetch_Shop_Service_Type_Prices = ( account_id : string , service_type : string  ) => 
                axios.get< any[] >( `/service_prices/show_type_prices/${ account_id }/${ service_type }` ).then( res => res.data ) ;




// 取得 _ 特定店家，特定寵物品種 id ( 欄位 : species_id )，5 種基本服務價格 : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 ( for React Query )
export const fetch_Shop_Species_5_Service_Prices = ( account_id : string , species_id : string  ) =>
                axios.get< any >( `/service_prices/show_shop_species_id_5_prices/${ account_id }/${ species_id }` ).then( res => res.data ) ;


                
// [ POST ] ---------------


// 新增 _ 服務價格 ( for React Query )
export const create_Service_Price = ( obj : any ) => axios.post( "/service_prices" , obj ) ;



// [ PUT ] ---------------




// [ DELETE ] ---------------



// 刪除 _ 方案

