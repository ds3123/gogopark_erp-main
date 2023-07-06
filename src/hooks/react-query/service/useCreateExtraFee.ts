import { useMutation , useQueryClient } from "react-query" ;
import { create_Extra_Fee } from "utils/api/api_Service" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel , set_Side_Extra_Fee } from "store/actions/action_Global_Layout" ;



// @ 新增 _ 加價單
export const useCreateExtraFee = () => {


    const dispatch    = useDispatch() ;
    const history     = useHistory() ;
    const queryClient = useQueryClient() ;


    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Extra_Fee( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                             // 刪除快取
                                                             queryClient.invalidateQueries() ;

                                                             // 新增成功
                                                             Toast( "已新增 : 加價單" ) ;
                                                            
                                                             // 關掉 右側 : 面板
                                                             dispatch( set_Side_Panel( false , null , {} ) ) ;

                                                             // 關掉 左側：服務加價面板
                                                             dispatch( set_Side_Extra_Fee( false , null ) ) ;

                                                             // 前往相對應頁面
                                                             history.push( "/wrongpath" ) ; // 錯誤路徑
                                                             history.push( "/services" ) ;  // 正確路徑

                                                          }
                                    }
                                  ) ;

    return mutate ;


} ;