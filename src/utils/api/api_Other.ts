
import axios from 'utils/axios' ;


// @ 其他現金 相關 API ( 資料表 : others )

// [ GET ] ---------------



// 取得 _ 特定 [ 建檔日期 ] ( 欄位 : created_at ) 所有收入、支出 ( for React Query )
export const fetch_Others_By_CreatedDate = ( account_id : string , created_date : string ) => 
                axios.get< any[] >( `/others/show_others_by_date/${ account_id }/${ created_date }` ).then( res => res.data ) ;






// [ POST ] ---------------

// 新增 _ 其他 ( 收支 )  ( for React Query )
export const create_Other = ( obj : any ) => axios.post( "/others" , obj ) ;


// [ PUT ] ---------------



// [ DELETE ] ---------------
