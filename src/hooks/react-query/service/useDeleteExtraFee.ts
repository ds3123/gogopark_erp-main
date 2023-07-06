
import { useMutation , useQueryClient } from "react-query" ;
import { useDispatch } from "react-redux" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast';
import { delete_Extra_Fee } from "utils/api/api_Service" ;
import { set_Side_Panel , set_Modal , set_Side_Extra_Fee } from "store/actions/action_Global_Layout" ;



// 刪除 _ 加價單
export const useDelete_Extra_Fee = () => {


    const dispatch    = useDispatch() ;
    const history     = useHistory() ;
    const queryClient = useQueryClient() ;


    const { mutate } = useMutation( 
                                    ( id : string ) => delete_Extra_Fee( id ) ,
                                    { 
                                        onSuccess : () => {


                                                              // 刪除快取
                                                              queryClient.invalidateQueries() ;


                                                              // 刪除成功通知
                                                              Toast( "已刪除此加價單" ) ;

                                                              // 關掉 右側 : 面板
                                                              dispatch( set_Side_Panel( false , null , {} ) ) ;

                                                              // 關掉 左側：服務加價面板
                                                              dispatch( set_Side_Extra_Fee( false , null ) ) ;

                                                              // 關掉 Ｍodal
                                                              dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;


                                                              history.push( "/wrongpath" );  // 錯誤路徑
                                                              history.push( '/services' );

                                                           }
                                    }
                                  ) ;


    return mutate ;

} ;