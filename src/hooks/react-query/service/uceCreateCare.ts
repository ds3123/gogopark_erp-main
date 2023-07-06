
import { useMutation , useQueryClient } from "react-query" ;
import { create_Care } from "utils/api/api_Care" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import cookie from 'react-cookies' ;



// @ 新增 _ 安親單
export const useCreate_Care = ( ) => { 


    const dispatch    = useDispatch() ;
    const history     = useHistory() ;

    const queryClient = useQueryClient() ;

    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Care( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                             // 刪除快取
                                                             queryClient.invalidateQueries() ; 
                                                       
                                                             // 新增成功
                                                             Toast( "已新增 : 安親單" ) ;
                                                            
                                                             // 關掉右側面板
                                                             dispatch( set_Side_Panel( false , null , {} ) ) ;

                                                             // 設定 cookie ( for 前往 : 住宿 > 安親 / 5 秒後銷毀 )
                                                             cookie.save( 'after_Created_Care' , '住宿_安親' , { path : '/' , maxAge : 5 } ) ;

                                                             // 前往相對應頁面
                                                             history.push( "/wrongpath" ) ;  // 錯誤路徑
                                                             history.push( "/lodge" ) ;  // 正確路徑

                                                          } 

                                    }
                                  ) ;

    return mutate ;





}