

import { useMutation } from "react-query" ;
import { create_Other } from "utils/api/api_Other" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;


// @ 新增 _ 其他 ( 現金 )
export const useCreate_Other = () => { 


    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Other( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                             // 新增成功
                                                             Toast( "已新增 : 其他現金收支" ) ;
                                                            
                                                             // 關掉 右側 ：面板
                                                             dispatch( set_Side_Panel( false , null , {} ) ) ;

                                                             // 前往相對應頁面
                                                             history.push( "/wrongpath" ) ;  // 錯誤路徑
                                                             history.push( "/management" ) ; // 正確路徑

                                                          }
                                    }
                                  ) ;

    return mutate ;


}