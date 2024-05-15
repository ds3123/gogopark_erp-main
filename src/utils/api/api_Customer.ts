
import axios from 'utils/axios' ;


// @ 客戶 相關 API ( 資料表 : customer )

// [ GET ] ---------------


// 取得 _ 特定店家，所有客戶，及其寵物  ( for React Query )
export const fetch_Shop_Customers_With_Pets = ( account_id : string  ) => 
             axios.get< any[] >( `/customers/show_customers_pets/${ account_id }` ).then( res => res.data ) ;


// 取得 _ 特定店家，被 < 拒接 > ( 狀態 : 通過、審核中 ) 的客戶及其寵物   ( for React Query )
export const fetch_Shop_Customers_On_Rejected = ( account_id : string , page : number = 1 ) => 
             axios.get< any[] >( `/customers/show_customers_on_rejected/${ account_id }?page=${ page }` ).then( res => res.data ) ;


// 取得 _ 特定店家，被 < 封存 > 的客戶，及其關係人、寵物  ( for React Query )
export const fetch_Shop_Customers_Archive_Page = ( account_id : string , page : number = 1 ) => 
             axios.get< any[] >( `/customers/show_all_customers_relatives_pets/${ account_id }/1?page=${ page }` ).then( res => res.data ) ;


// 取得 _ 特定店家，依照特定欄位 ( Ex. 身分證字料、手機號碼 ) 搜尋相關客戶 ( for React Query )
export const fetch_Shop_Customers_Query_By_Column = ( account_id : string , column : "id" | "mobile_phone" , value : string | undefined ) =>
             axios.get< any[] >( `/customers/show_by_param/${ account_id }/${ column }/${ value }` ).then( res => res.data ) ;                


// 取得 _ 所有店家，依照特定欄位 ( Ex. 身分證字料、手機號碼 ) 搜尋相關客戶 ( for React Query )
export const fetch_All_Shops_Customers_Query_By_Column = ( column : "id" | "mobile_phone" , value : string | undefined ) =>
             axios.get< any[] >( `/customers/show_by_param_all/${ column }/${ value }` ).then( res => res.data ) ;                


// 取得 _ 特定客戶：所有寵物 ( for React Query )
export const fetch_Customer_Pets_By_CustomerId = ( customer_id : string ) => 
    axios.get< any[] >( `/customers/show_pets/${ customer_id }` ).then( res => res.data ) ;

    

// [ POST ] ---------------

// 新增 _ 客戶 ( for React Query )
export const create_Customer = ( obj : any ) => axios.post( "/customers" , obj ) ;




// [ PUT ] ---------------





// [ DELETE ] ---------------
