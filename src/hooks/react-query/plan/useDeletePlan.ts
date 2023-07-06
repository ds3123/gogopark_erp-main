
import { useMutation } from "react-query" ;

import { delete_Plan } from "utils/api/api_Plan" ;
import { delete_Custom_Plan } from "utils/api/api_Plan";

import cookie from 'react-cookies';
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast';



// 刪除 _ 方案
export const useDelete_Plan = () => {

    const history  = useHistory() ;

    const { mutate } = useMutation( 
                                    ( id : string ) => delete_Plan( id ) ,
                                    { 
                                        onSuccess : () => {

                                                              // 刪除成功通知
                                                              Toast( "已刪除此方案" ) ;

                                                              // 設定 cookie ( for 前往 : 作業區 > 洗美 > 方案 / 5 秒後銷毀 )
                                                              cookie.save( 'after_Delete_Plan' , '洗美_方案' , { path : '/' , maxAge : 5 } ) ;

                                                              // 重導向
                                                              history.push("/wrongpath"); // 錯誤路徑
                                                              history.push("/services");  // 正確路徑

                                                            }
                                    }
                                  ) ;


    return mutate ;

} ;

// 刪除 _ 自訂方案
export const useDelete_Custom_Plan = () => {

    const history  = useHistory() ;

    const { mutate } = useMutation( 
                                    ( id : string ) => delete_Custom_Plan( id ) ,
                                    { 
                                        onSuccess : () => {

                                                              // 刪除成功通知
                                                              Toast( "已刪除此自訂方案" ) ;

                                                              // 設定 cookie ( for 前往 : 資料管理 > 方案資料 / 5 秒後銷毀 )
                                                              cookie.save( 'after_Delete_CustomPlan' , '資料管理_方案資料' , { path : '/' , maxAge : 5 } ) ;
                                                     
                                                              // 重導向
                                                              history.push("/wrongpath");   // 錯誤路徑
                                                              history.push("/management");  // 正確路徑

                                                            }
                                    }
                                  ) ;


    return mutate ;


} ;