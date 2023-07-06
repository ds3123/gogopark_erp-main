import { useMutation , useQueryClient } from "react-query" ;
import { create_Basic } from "utils/api/api_Basic" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { set_Side_Info } from "store/actions/action_Global_Layout" ;



// @ 新增 _ 基礎單
export const useCreate_Basic = () => {

    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    const queryClient = useQueryClient() ;


    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Basic( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                            // 刪除快取
                                                            queryClient.invalidateQueries() ;

                                                            // 新增成功
                                                            Toast( "已新增 : 基礎單" ) ;
                                                            
                                                            // 關掉右側面板
                                                            dispatch( set_Side_Panel( false , null , {} ) ) ;

                                                            // 關掉左側提示面板
                                                            dispatch( set_Side_Info( false ) ) ;


                                                            // 前往相對應頁面
                                                            history.push( "/wrongpath" ) ;  // 錯誤路徑
                                                            history.push( "/services" ) ;  // 正確路徑

                                                        }
                                    }
                                  ) ;

    return mutate ;

} ;