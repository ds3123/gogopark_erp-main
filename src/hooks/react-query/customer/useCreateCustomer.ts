

import { useMutation , useQueryClient } from "react-query" ;
import { create_Customer } from "utils/api/api_Customer" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;



// @ 新增 _ 客戶
export const useCreate_Customer = () => {

    const dispatch    = useDispatch() ;
    const history     = useHistory() ;

    const queryClient = useQueryClient() ;

    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Customer( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                            // 刪除快取
                                                            queryClient.invalidateQueries() ; 


                                                            // 新增成功
                                                            Toast( "已新增 : 客戶" ) ;
                                                            
                                                            // 關掉右側面板
                                                            dispatch( set_Side_Panel( false , null , {} ) ) ;

                                                            // 前往相對應頁面
                                                            history.push( "/wrongpath" ) ;  // 錯誤路徑
                                                            history.push( "/customers" ) ;  // 正確路徑

                                                        }
                                    }
                                  ) ;


      return mutate ;

} ;