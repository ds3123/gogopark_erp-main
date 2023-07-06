import { useMutation } from "react-query" ;
import { create_Bath } from "utils/api/api_Bath" ;



// @ 新增 _ 洗澡單
export const useCreate_Bath = () => {

    
    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Bath( obj )
                                  ) ;

    return mutate ;

} ;