



import { useMutation } from "react-query" ;
import { create_Pet_Species } from "utils/api/api_Pet_Species" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import cookie from 'react-cookies';



// @ 新增 _ 品種
export const useCreate_Species = ( ) => { 


    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Pet_Species( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                             // 新增成功通知
                                                             Toast( "已新增 : 品種" ) ;

                                                             // 關掉右側面板
                                                             dispatch( set_Side_Panel( false , null ,{} ) ) ;

                                                             // 設定 cookie ( for 前往 : 系統設定 > 寵物品種 / 5 秒後銷毀 )
                                                             cookie.save( 'after_Created_Redirect' , '系統設定_寵物品種'  ,  { path : '/' , maxAge : 5 } ) ;

                                                             history.push("/wrongpath");   // 錯誤路徑
                                                             history.push("/management");  // 正確路徑

                                                          }
                                    }
                                  ) ;

    return mutate ;


}