
import { useMutation } from "react-query" ;
import { create_Service_Price } from "utils/api/api_Service_Price" ;


// @ 新增 _ 價格
export const useCreate_Price = ( ) => { 

    
    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Service_Price( obj ) 
                                  ) ;

    return mutate ;

}


