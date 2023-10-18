
import axios from 'utils/axios' ;


// @ 服務標籤 相關 API ( 資料表 : service_tags )



// [ GET ] ---------------


// 取得 _ 所有服務標籤
export const fetch_Shop_Service_Tags = ( account_id : string ) => 
                axios.get< any[] >( `/service_tags/show_shop_service_tags/${ account_id }` ).then( res => res.data ) ;


// [ POST ] ---------------

// 新增 _ 服務標籤 
export const create_Service_Tag = ( obj : any ) => axios.post( "/service_tags" , obj ) ;

    

// [ DELETE ] ---------------


// 刪除 _ 服務標籤
export const delete_Service_Tag = ( id : string ) => axios.delete( `/service_tags/${ id }` ) ;