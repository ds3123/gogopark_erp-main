import { useMutation, useQueryClient } from "react-query" ;
import { create_Pet } from "utils/api/api_Pet" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;



// @ 新增 _ 寵物
export const useCreate_Pet = () => {

    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    const queryClient = useQueryClient() ;


    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Pet( obj ) ,
                                    { 
                                        onSuccess : () => {
 
                                                             // 刪除快取
                                                             queryClient.invalidateQueries() ;

                                                             // 新增成功
                                                             Toast( "已新增 : 寵物" ) ;
                                                            
                                                             // 關掉右側面板
                                                             dispatch( set_Side_Panel( false , null , {} ) ) ;

                                                             // 前往相對應頁面
                                                             history.push( "/wrongpath" ) ; // 錯誤路徑
                                                             history.push( "/pets" ) ;      // 正確路徑

                                                           }
                                    }
                                  ) ;


    return mutate ;

} ;