


import { useMutation , useQueryClient } from "react-query" ;
import { useDispatch } from "react-redux" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast';
import { update_Extra_Fee_By_Id } from "utils/api/api_Service" ;
import { set_Side_Panel , set_Modal , set_Side_Extra_Fee } from "store/actions/action_Global_Layout" ;


type Obj = {

    extra_fee_id     : string ;
    is_delete        : number ; 
    delete_submitter : string ;

}



// 更新 _ 加價單 : 是否刪除
export const useUpdate_Extra_Fee = () => {


    const dispatch    = useDispatch() ;
    const history     = useHistory() ;
    const queryClient = useQueryClient() ;


    const { mutate } = useMutation( 
                                    ( obj : Obj ) => update_Extra_Fee_By_Id( obj ) ,
                                    { 
                                        onSuccess : () => {


                                                              // 刪除快取
                                                              queryClient.invalidateQueries() ;


                                                              // 刪除成功通知
                                                              Toast( "已更新此加價單" ) ;

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