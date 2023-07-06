
import axios from 'utils/axios' ;


// @ 住宿單 相關 API ( 資料表 : lodges )

// [ GET ] ---------------


// 取得 _ 特定店家，被 < 封存 > 的住宿，及其客人、關係人、寵物 ( for React Query )
export const fetch_Shop_Lodge_Archive_Page = ( account_id : string , page : number = 1 ) => 
             axios.get< any[] >( `/lodges/show_with_cus_relative_pet/${ account_id }/1?page=${ page }` ).then( res => res.data ) ;



// [ POST ] ---------------

// 新增 _ 住宿單 ( for React Query )
export const create_Lodge = ( obj : any ) => axios.post( "/lodges" , obj ) ;


// [ PUT ] ---------------



// [ DELETE ] ---------------
