
import { useMutation , useQueryClient } from "react-query" ;
import { create_Plan , create_Custom_Plan , create_Plan_Record } from "utils/api/api_Plan" ;

import cookie from 'react-cookies';
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast';
import { useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { set_Side_Info } from "store/actions/action_Global_Layout" ;



// @ 新增 _ 方案 ( 客戶購買方案 )
export const useCreate_Plan = () => {

    const dispatch    = useDispatch() ;
    const history     = useHistory() ;

    const queryClient = useQueryClient() ;


    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Plan( obj ) ,
                                    { 
                                        onSuccess : () => {
                                                             
                                                             // 刪除快取
                                                             queryClient.invalidateQueries() ; 

                                                             // 新增成功通知
                                                             Toast( "已新增 : 預設方案" ) ;
                                                            
                                                             // 關掉右側面板
                                                             dispatch( set_Side_Panel(false , null ,{} ) ) ;

                                                             // 關掉左側提示面板
                                                             dispatch( set_Side_Info( false ) ) ;  
                                                
                                                             // 設定 cookie ( for 前往 : 洗美 > 方案 / 5 秒後銷毀 )
                                                             cookie.save( 'after_Created_Plan' , '洗美_方案' , { path : '/' , maxAge : 5 } ) ;
                                                
                                                             history.push("/wrongpath");  // 錯誤路徑
                                                             history.push("/services");   // 正確路徑

                                                           }
                                    }
                                  ) ;

    return mutate ;


} ;


// @ 新增 _ 自訂方案 ( 後台新增自訂方案選項 )
export const useCreate_Custom_Plan = () => {

    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Custom_Plan( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                            // 新增成功通知
                                                            Toast( "已新增 : 自訂方案" ) ;

                                                            // 設定 cookie ( for 前往 : 管理區 > 資料管理 > 方案資料 / 5 秒後銷毀 )
                                                            cookie.save( 'after_Created_Redirect' , '資料管理_方案資料'  ,  { path : '/' , maxAge : 5 } ) ;


                                                            // 關閉 Modal
                                                            dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;

                                                            // 重導向
                                                            history.push("/wrongpath");   // 錯誤路徑
                                                            history.push("/management");  // 正確路徑

                                                           }
                                    }
                                  ) ;

    return mutate ;

} ;



// @ 新增 _ 方案：使用紀錄
export const useCreate_Plan_Record = () => {

    const dispatch    = useDispatch() ;
    const history     = useHistory() ;

    const queryClient = useQueryClient() ;

    const { mutate } = useMutation( 
                                    ( obj : any ) => create_Plan_Record( obj ) ,
                                    { 
                                        onSuccess : () => {

                                                             // 刪除快取
                                                             queryClient.invalidateQueries() ;
 
                                                             // 新增成功
                                                             Toast( "已新增 : 方案使用紀錄" ) ; 

                                                             // 關閉 Side Panel
                                                             dispatch( set_Side_Panel( false , null , {} ) ) ;

                                                             // 關掉左側提示面板
                                                             dispatch( set_Side_Info( false ) ) ;  

                                                             // 重導向
                                                             history.push("/wrongpath") ; // 錯誤路徑
                                                             history.push("/services") ;  // 正確路徑

                                                          }
                                    }
                                  ) ;

    return mutate ;

} ;