/* eslint-disable react/jsx-pascal-case */


import { useQuery } from "react-query" ;
import { customerKeys } from "react-query/query-key/customerKeys" ; 
import { fetch_Shop_Customers_With_Pets , 
         fetch_Shop_Customers_Query_By_Column ,
         fetch_All_Shops_Customers_Query_By_Column ,
         fetch_Customer_Pets_By_CustomerId
       } from "utils/api/api_Customer" ;



// 取得 _ 特定店家，所有客戶，及其寵物  
export const useFetch_Shop_Customers_With_Pets = ( account_id : string ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          customerKeys.shop_with_pets( account_id ) , 
                                          () => fetch_Shop_Customers_With_Pets( account_id ),
                                          { enabled : !!account_id }  
                                        ) ; 
                                      
    return data  
 
}


// 取得 _ 特定店家，依照特定欄位 ( Ex. 身分證字料、手機號碼 ) 搜尋相關客戶
export const useFetch_Shop_Customers_Query_By_Column = ( account_id : string , column : "id" | "mobile_phone" , value : string | undefined ) => {

    // 預設值
    const fallback = [] as any[] ;  
  
    const { data = fallback } = useQuery( 
                                          customerKeys.shop_query_by_column( account_id , column , value ) , 
                                          () => fetch_Shop_Customers_Query_By_Column( account_id , column , value ) ,
                                          { enabled : !!value }  // 有輸入值，才進行查詢
                                        ) ; 
                              
    return data  

} ;


// 取得 _ 特定店家，依照特定欄位 ( Ex. 身分證字料、手機號碼 ) 搜尋相關客戶
export const useFetch_All_Shops_Customers_Query_By_Column = ( column : "id" | "mobile_phone" , value : string | undefined ) => {

    // 預設值
    const fallback = [] as any[] ;  
  
    const { data = fallback } = useQuery( 
                                          customerKeys.all_shops_query_by_column( column , value ) , 
                                          () => fetch_All_Shops_Customers_Query_By_Column( column , value ) ,
                                          { enabled : !!value }  // 有輸入值，才進行查詢
                                        ) ; 
                              
    return data  

} ;



// 取得 _ 特定客戶：所有寵物   
export const useFetch_Customer_Pets_By_CustomerId  = ( customer_id : string ) => {

  // 預設值
  const fallback = [] as any[] ;  

  const { data = fallback } = useQuery( 
                                        customerKeys.customer_pets_by_customer_id( customer_id ) , 
                                        () => fetch_Customer_Pets_By_CustomerId( customer_id ),
                                        { enabled : !!customer_id }  
                                      ) ; 
                                    
  return data  

}
