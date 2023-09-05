


import { useQuery } from "react-query" ;
import { lodgeKeys } from "react-query/query-key/lodgeKeys" ; 
import { fetch_Shop_All_Holidays } from "utils/api/api_Lodge" ;
import { get_Lodge_Title_Dates } from "fp/lodges/read/get_Lodge" ;

 

// 取得 _ 特定店家，所有熱門時段
export const useFetch_Shop_All_Holidays = ( account_id : string ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          lodgeKeys.shop_all_holidays( account_id ) , 
                                          () => fetch_Shop_All_Holidays( account_id ),
                                          { enabled : !!account_id }  
                                        ) ; 


    // 取得 _ 相同時段名稱下，所有日期                                  
    return get_Lodge_Title_Dates( data ) ;


}