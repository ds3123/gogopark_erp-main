
import axios from 'utils/axios' ;


// @ 寵物 相關 API ( 資料表 : pet )

// [ GET ] ---------------


// 取得 _ 特定店家，所有寵物，及其主人  
export const fetch_Shop_Pets_With_Customers = ( account_id : string ) => 
                axios.get< any[] >( `/pets/show_pets_customers/${ account_id }` ).then( res => res.data ) ;


// 取得 _ 特定店家，被 < 拒接 > ( 狀態 : 通過、審核中 ) 的寵物及其主人   ( for React Query )
export const fetch_Shop_Pets_On_Rejected = ( account_id : string , page : number = 1 ) => 
                axios.get< any[] >( `/pets/show_pets_on_rejected/${ account_id }?page=${ page }` ).then( res => res.data ) ;

 
// 取得 _ 特定店家，被 < 封存 > 的寵物，及其主人、關係人  ( for React Query )
export const fetch_Shop_Pets_Archive_Page = ( account_id : string , page : number = 1 ) => 
                axios.get< any[] >( `/pets/show_all_pets_customers_relatives/${ account_id }/1?page=${ page }` ).then( res => res.data ) ;



// 取得 _ 特定店家，在資料表 pet 中，為特定品種 (名稱) 的所有寵物 ( for React Query )
export const fetch_Shop_Species_By_SpeciesName = ( account_id : string , species_name : string ) => 
                axios.get< any[] >( `/pets/show_current_pet_species/${ account_id }/${ species_name }` ).then( res => res.data ) ;


// 取得 _ 特定寵物的主人 ( for React Query )
export const fetch_Pet_Owner = ( pet_serial : string | undefined ) => 
                axios.get< any >( `/pets/show_pet_customer/${ pet_serial}` ).then( res => res.data ) ;


// 取得 _ 特定店家，特定寵物 ( for React Query )
export const fetch_Shop_Pet = ( account_id : string , serial : string ) =>
                axios.get< any[] >( `/pets/show_shop_pet/${ account_id }/${ serial }` ).then( res => res.data ) ;             
                             
 


// [ POST ] ---------------

// 新增 _ 寵物 ( for React Query )
export const create_Pet = ( obj : any ) => axios.post( "/pets" , obj ) ;




// [ PUT ] ---------------





// [ DELETE ] ---------------
