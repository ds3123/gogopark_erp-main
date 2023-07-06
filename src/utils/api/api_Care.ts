
import axios from 'utils/axios' ;


// @ 安親單 相關 API ( 資料表 : cares )

// [ GET ] ---------------


// 取得 _ 特定店家，被 < 封存 > 的安親，及其客人、關係人、寵物 ( for React Query )
export const fetch_Shop_Care_Archive_Page = ( account_id : string , page : number = 1 ) => 
             axios.get< any[] >( `/cares/show_with_cus_relative_pet/${ account_id }/1?page=${ page }` ).then( res => res.data ) ;


 

// [ POST ] ---------------

// 新增 _ 安親單  ( for React Query )
export const create_Care = ( obj : any ) => axios.post( "/cares" , obj ) ;


// [ PUT ] ---------------



// [ DELETE ] ---------------
