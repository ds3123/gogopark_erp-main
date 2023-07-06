
import { useMutation } from "react-query" ;
import { create_Beauty } from "utils/api/api_Beauty" ;



// @ 新增 _ 美容單
export const useCreate_Beauty = () => {


    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Beauty( obj ) 
                                  ) ;

    return mutate ;

} ;