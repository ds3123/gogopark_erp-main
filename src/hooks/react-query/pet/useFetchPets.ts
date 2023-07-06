import { useQuery } from "react-query" ;
import { petKeys } from "react-query/query-key/petKeys" ;
import { 
         fetch_Shop_Pets_With_Customers ,
         fetch_Shop_Species_By_SpeciesName ,
         fetch_Pet_Owner ,
         fetch_Shop_Pet 
        } from "utils/api/api_Pet" ;


// 取得 _ 特定店家，所有寵物，及其主人  
export const useFetch_Shop_Pets_With_Customers = ( account_id : string ) => {

  const fallback = [] as any[] ;  // 預設值

  const { data = fallback } = useQuery( 
                                        petKeys.shop_pets_customers( account_id ) , 
                                        () => fetch_Shop_Pets_With_Customers( account_id ) ,
                                        { enabled : !!account_id }
                                      ) ;

  return data      

}



// 取得 _ 特定店家，在資料表 pet 中，為特定品種 (名稱) 的所有寵物
export const useFetch_Shop_Species_By_SpeciesName = ( account_id : string , species_name : string ) => {

    const fallback = [] as any[] ;  // 預設值
 
    const { data = fallback } = useQuery( 
                                          petKeys.shop_species_name( account_id , species_name ) , 
                                          () => fetch_Shop_Species_By_SpeciesName( account_id , species_name ) ,
                                          { enabled : !!species_name }
                                        ) ;
 
    return data      
 
}


// 取得 _ 特定寵物的主人
export const useFetch_Pet_Owner = ( pet_serial : string | undefined ) => {

    const fallback = null ;  // 預設值
 
    const { data = fallback } = useQuery( 
                                          petKeys.pet_owner( pet_serial ) , 
                                          () => fetch_Pet_Owner( pet_serial ) ,
                                          { enabled : !!pet_serial }
                                        ) ;
 
    return data      
 
}


// 取得 _ 特定店家，特定寵物
export const useFetch_Shop_Pet = ( account_id : string , serial : string ) => {

    const fallback = [] as any[] ;  // 預設值
 
    const { data = fallback } = useQuery( 
                                          petKeys.shop_serial_pet( account_id , serial ) , 
                                          () => fetch_Shop_Pet( account_id , serial ) ,
                                          { enabled : !!serial }
                                        ) ;
 
    return data     

}






