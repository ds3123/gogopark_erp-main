
import { useMutation } from "react-query" ;
import { create_Employee } from "utils/api/api_Employee" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import cookie from 'react-cookies';


// @ 新增 _ 員工
export const useCreate_Employee = ( ) => { 

    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Employee( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                            // 新增成功通知
                                                            Toast( "已新增 : 員工" ) ;
                                                        
                                                            // 關掉右側面板
                                                            dispatch( set_Side_Panel(false , null ,{} ) ) ;

                                                            // 設定 cookie ( for 前往 : 員工管理 / 5 秒後銷毀 )
                                                            cookie.save( 'after_Created_Redirect' , '員工管理'  ,  { path : '/' , maxAge : 5 } ) ;

                                                            history.push("/wrongpath");   // 錯誤路徑
                                                            history.push("/management");  // 正確路徑

                                                          }
                                    }
                                  ) ;

    return mutate ;


}