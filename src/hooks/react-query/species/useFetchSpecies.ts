
import { useQuery } from "react-query" ;
import { speciesKeys } from "react-query/query-key/speciesKeys" ;
import { fetch_Species , fetch_Shop_Species_With_Service_Prices } from "utils/api/api_Pet_Species" ;



// @ 取得 _ 所有品種
export const useFetch_Species = ( ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          speciesKeys.all_species , 
                                          () => fetch_Species() 
                                         )
 
    return data                                        
 
}


// @ 取得 _ 特定商店，所有品種，及其服務價格 ( 僅列出 _  有設定特地店家：服務價格 的品種 )
export const useFetch_Species_With_Shop_Service_Prices = ( account_id : string ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          speciesKeys.shop_service_prices( account_id ) , 
                                          () => fetch_Shop_Species_With_Service_Prices( account_id  ) 
                                         )
 
    return data                                        
 
 }
 