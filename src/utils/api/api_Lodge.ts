
import axios from 'utils/axios' ;


// @ 住宿單 相關 API ( 資料表 : lodges )

// [ GET ] ---------------


// 取得 _ 特定店家，被 < 封存 > 的住宿，及其客人、關係人、寵物 ( for React Query )
export const fetch_Shop_Lodge_Archive_Page = ( account_id : string , page : number = 1 ) => 
             axios.get< any[] >( `/lodges/show_with_cus_relative_pet/${ account_id }/1?page=${ page }` ).then( res => res.data ) ;


// 取得 _ 特定店家，所有熱門時段 ( for React Query )
export const fetch_Shop_All_Holidays = ( account_id : string  ) => 
axios.get< any[] >( `/holidays/show_shop_all_holidays/${ account_id }` ).then( res => res.data ) ;



// [ POST ] ---------------

// 新增 _ 住宿單 ( for React Query )
export const create_Lodge = ( obj : any ) => axios.post( "/lodges" , obj ) ;


// 新增 _ 熱門時段 ( for React Query )
export const create_Holiday = ( obj : any ) => axios.post( "/holidays" , obj ) ;




// [ PUT ] ---------------






// [ DELETE ] ---------------


//  刪除 _ 特定店家、特定熱門時段，所有日期 ( for React Query )
export const delete_Holiday_RowDates = ( account_id : string , title : string ) => axios.delete( `/holidays/delete_holiday_rowdates/${ account_id }/${ title }` ) ;



//  刪除 _ 特定店家、特定熱門時段，特定日期 ( for React Query )
export const delete_Holiday_SingleDate = ( account_id : string , date : string ) => axios.delete( `/holidays/delete_holiday_singledate/${ account_id }/${ date }` ) ;
