
import { useMutation } from "react-query" ;

import cookie from 'react-cookies';
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast';

import { delete_Species } from "utils/api/api_Pet_Species"


// 刪除 _ 品種
export const useDelete_Species = () => {

    const history  = useHistory() ;

    const { mutate } = useMutation( 
                                    ( id : string ) => delete_Species( id ) ,
                                    { 
                                        onSuccess : () => {

                                                              // 刪除成功通知
                                                              Toast( "已刪除此品種" ) ;
                                                              
                                                              cookie.save( 'after_Created_Redirect' , '系統設定_寵物品種'  ,  { path : '/' , maxAge : 5 } ) ;

                                                              history.push( "/wrongpath" );  // 錯誤路徑
                                                              history.push( '/management' );

                                                           }
                                    }
                                  ) ;


    return mutate ;

} ;