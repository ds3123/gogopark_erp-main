

import { useMutation , useQueryClient } from "react-query" ;
import { create_Holiday } from "utils/api/api_Lodge" ;




// @ 新增 _ 熱門時段
export const useCreate_Holiday = () => {

    
    const queryClient = useQueryClient() ;

    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Holiday( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                             // 刪除快取
                                                             queryClient.invalidateQueries() ; 

                                                          }
                                    }
                                  ) ;


      return mutate ;

} ;