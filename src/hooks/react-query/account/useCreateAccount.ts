

import { useMutation } from "react-query" ;
import { create_Account } from "utils/api/api_Account" ;


// @ 新增 _ 帳號
export const useCreate_Account = ( ) => { 

  
  


    const { mutate } = useMutation( 
                                     ( obj : any ) => create_Account( obj ) ,
                                  ) ;

                                  
    return mutate ;


}