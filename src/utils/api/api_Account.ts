

import axios from 'utils/axios' ;

// @ 帳號 相關 API ( 資料表 : accounts )

// [ GET ] ---------------




// 取得 _ 所有店家帳號 ( for React Query )
export const fetch_Shop_Accounts = ( ) => 
                axios.get< any[] >( `/accounts` ).then( res => res.data ) ;



// 取得 _ 特定店家帳號  ( for React Query )
export const fetch_Shop_Account = ( account_id : string ) => 
                axios.get< any >( `/accounts/${ account_id }` ).then( res => res.data ) ;




// 取得 _ 特定郵遞區號下，所有商家帳號 ( 包含商家所屬員工 )
export const get_AllAccounts_By_Zipcode = ( zipcode : string ) => 
             axios.get( `/accounts/show_accounts_with_employees_by_zipcode/${ zipcode }` ) ;



// [ POST ] ---------------

// 新增 _ 帳戶 ( for React Query )
export const create_Account = ( obj : any ) => axios.post( "/accounts" , obj ) ;





// [ PUT ] ---------------





// [ DELETE ] ---------------
