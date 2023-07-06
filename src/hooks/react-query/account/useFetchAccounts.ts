import { useQuery } from "react-query" ;
import { accountKeys } from "react-query/query-key/accountKeys" ; 
import { fetch_Shop_Accounts , fetch_Shop_Account } from "utils/api/api_Account" ;


// @ 取得 _ 所有商店帳號
export const useFetch_Shop_Accounts = () => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          accountKeys.shops() , 
                                          () => fetch_Shop_Accounts() 
                                         ) ;
 
    return data                                        
 
 }



// @ 取得 _ 特定商店帳號
export const useFetch_Shop_Account = ( account_id : string  ) => {

    // 預設值
    const fallback = null ;  
 
    const { data = fallback } = useQuery( 
                                          accountKeys.single_shop( account_id ) , 
                                          () => fetch_Shop_Account( account_id ) ,
                                          { enabled : !!account_id } 
                                         ) ;
 
    return data                                        
 
 }