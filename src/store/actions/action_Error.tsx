import { switch_Service_Type_Id } from "utils/data/switch"
import { set_Side_Panel , set_Side_Extra_Fee } from "store/actions/action_Global_Layout";
import cookie from "react-cookies";
import { Toast } from 'templates/note/Toast';

import { update_Plan_Record_By_Id } from "utils/api/api_Plan" ;
import { update_Service_By_Service_Url_Id } from "utils/api/api_Service" ;




// # 點選 _ 提交異常 ( 服務轉異常 ) 
export const submit_Service_Error = ( data              : any , 
                                      error_Cause       : string , 
                                      current_User_Name : string , 
                                      history           : any ,
                                      queryClient       : any
                                    ) => {

    return ( dispatch : any ) => {

                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } = switch_Service_Type_Id( data ) ;
                
                // 更新 _ 異常狀態
                if( service_Id && service_Url ){
        
                    const obj = {
                                  is_error        : 1 ,
                                  error_cause     : error_Cause ,
                                  error_submitter : current_User_Name ? current_User_Name : '測試員'
                                } ;
        
                   
                    update_Service_By_Service_Url_Id( service_Url ,  service_Id , obj ).then( () => {

                        Toast( "已通報異常案件" ) ;

                        // 刪除快取
                        queryClient.invalidateQueries() ;

                        // 關掉右側面板
                        dispatch( set_Side_Panel( false , null , {} ) ) ;

                        // 關掉 左側：服務加價面板
                        dispatch( set_Side_Extra_Fee( false , null ) ) ;
        
                        history.push("/wrongpath") ;  // 錯誤路徑

                        if( service_Url === '/lodges' || service_Url === '/cares' ){

                           history.push( "/lodge" ) ;      

                        }else{

                           history.push( "/index" ) ;    

                        }
        
                    })
        
                }

           } ;

} ;


// # 點選 _ 回復 : 提交異常
export const submit_Undo_Service_Error = ( data    : any , 
                                           history : any ,
                                           update_Service_By_Service_Url_Id : any ,
                                           queryClient : any
                                         ) => {

    return ( dispatch : any ) => {


                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } =  switch_Service_Type_Id( data ) ;

                // 更新 _ 異常狀態
                if( service_Id && service_Url ){

                    const obj = {
                                    is_error        : 0 ,
                                    error_cause     : null ,
                                    error_submitter : null
                                } ;
                   
                    update_Service_By_Service_Url_Id( service_Url ,  service_Id , obj ).then( () => {

                        // 刪除快取
                        queryClient.invalidateQueries() ;

                        Toast( "已解除異常" ) ;
                
                        dispatch( set_Side_Panel(false , null ,{} ) ) ;

                        // 設定 cookie ( for 前往 : 資料管理 > 服務異常 / 5 秒後銷毀 )
                        cookie.save( 'after_Updated_Data' , '資料管理_服務異常' , { path : '/' , maxAge : 5 } ) ;

                        history.push("/wrongpath");  // 錯誤路徑
                        history.push("/management");  // 正確路徑

                    })

                }

               

           } ;

} ;


// # 點選 _ 銷單 ( 取消該單據 )
export const submit_Delete_Service = ( data              : any , 
                                       current_User_Name : string , 
                                       history           : any ,
                                       current_Url       : string ,
                                       queryClient       : any        
                                     ) => {

    return ( dispatch : any ) => {

                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } = switch_Service_Type_Id( data ) ;

                
                // 更新 _ 銷單 ( is_delete )
                if( service_Id && service_Url ){
        
                    // 更新資訊
                    const obj = {
                                   is_delete        : 1 ,
                                   delete_submitter : current_User_Name ? current_User_Name : '測試員'
                                } ;
        
                    update_Service_By_Service_Url_Id( service_Url ,  service_Id , obj ).then( () => {

                        // 刪除快取
                        queryClient.invalidateQueries() ;
                       
                        Toast( "此服務已銷單" ) ;
                    
                        // 關掉 右側面板
                        dispatch( set_Side_Panel( false , null , {} ) ) ;

                        // 關掉 左側：服務加價面板
                        dispatch( set_Side_Extra_Fee( false , null ) ) ;


        
                        history.push("/wrongpath");  // 錯誤路徑

                        if( current_Url === "/index" )    history.push("/index") ;    
                        if( current_Url === "/services" ) history.push("/services") ; 
        
                    })

                    // # 銷單的服務若為 : 使用 "方案" -> 更新 _ 此服務，在方案紀錄表的值 ( 資料表 : plan_used_records )
                    if( data[ 'payment_method' ] === "方案" && data.plan ){
                         
                        // 更新 _ 使用方案的服務紀錄
                        update_Plan_Record_By_Id( data.plan.id , obj ).then( () => Toast( "已更新方案使用紀錄" ) ) ;      

                    }
        
                }

           } ;

} ;


// # 點選 _ 回復 : 銷單 
export const submit_Undo_Delete_Service = ( data    : any , 
                                            history : any ,
                                            update_Service_By_Service_Url_Id : any ,
                                            update_Plan_Record_By_Id         : any
                                          ) => {

    return ( dispatch : any ) => {

        
                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } =  switch_Service_Type_Id( data ) ;

                // 更新 _ 異常狀態
                if( service_Id && service_Url ){

                    // 更新資訊
                    const obj = {
                                  is_delete        : 0 ,
                                  delete_submitter : null
                                } ;

                    update_Service_By_Service_Url_Id( service_Url ,  service_Id , obj ).then( () => {


                        // # 銷單的服務若為 : 使用 "方案" -> 更新 _ 此服務，在方案紀錄表的值 ( 資料表 : plan_used_records )
                        if( data[ 'payment_method' ] === "方案" && data.plan ){
                         
                            // 更新 _ 使用方案的服務紀錄
                            update_Plan_Record_By_Id( data.plan.id , obj ).then( () => Toast( "已更新方案使用紀錄" ) ) ;      

                        }



                        Toast( "已解除銷單" ) ;

                        dispatch( set_Side_Panel(false , null ,{} ) ) ;

                        // 設定 cookie ( for 前往 : 資料管理 > 銷單資料 / 5 秒後銷毀 )
                        cookie.save( 'after_Updated_Data' , '資料管理_銷單資料' , { path : '/' , maxAge : 5 } ) ;

                        history.push("/wrongpath");  // 錯誤路徑
                        history.push("/management");  // 正確路徑

                    })

                }

           } ;

} ;


