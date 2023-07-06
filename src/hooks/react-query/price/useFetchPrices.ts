
import { useQuery } from "react-query" ;

import { priceKeys } from "react-query/query-key/priceKeys" ;
import { fetch_Shop_Service_Prices , 
         fetch_Shop_Service_Type_Prices ,
         fetch_Shop_Species_5_Service_Prices
        } from "utils/api/api_Service_Price" ;


import { IService_5_Prices } from "utils/Interface_Type" ;



// @ 取得 _ 特定店家，所有服務價格 
export const useFetch_Shop_Service_Prices = ( account_id : string ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          priceKeys.shop( account_id ) , 
                                          () => fetch_Shop_Service_Prices( account_id ) 
                                         )
 
    return data                                        
 
}



// @ 取得 _ 特定店家，所有服務價格 
export const useFetch_Shop_Service_Type_Prices = ( account_id : string , service_type : string ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          priceKeys.shop_type( account_id , service_type ) , 
                                          () => fetch_Shop_Service_Type_Prices( account_id , service_type ) ,
                                          { enabled : !!service_type } 
                                         )
 
    return data                                        
 
}




// @ 取得 _ 特定店家，特定寵物品種 id ( 欄位 : species_id )，5 種基本服務價格 : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 
export const useFetch_Shop_Species_5_Service_Prices = ( account_id : string , species_id : string ) : null | IService_5_Prices => {

    // 預設值
    const fallback = {
                        species_Name  : "" ,
                        first_Bath    : 0 ,
                        single_Bath   : 0 ,
                        month_Bath    : 0 ,
                        single_Beauty : 0 ,
                        month_Beauty  : 0
                     } ;  

 
    const { data = fallback } = useQuery( 
                                          priceKeys.shop_species_5_prices( account_id , species_id ) , 
                                          () => fetch_Shop_Species_5_Service_Prices( account_id , species_id ) ,
                                          { enabled : !!species_id } 
                                         )
 
    return data                                        
 
}