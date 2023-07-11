
import { rest } from "msw" ;



// @ Mock Service Worker -> Handler 設定

export const handlers = [

              
                // 取得 _ 特定店家，特定服務日期，所有 【 預約 】與 【 轉異常 】服務單
                rest.get('http://localhost:7777/Laravel_Projects/gogopark/public/index.php/api/services/show_services_is_delete_error_by_date/1/2023-07-11' , ( req , res , ctx ) => {
                           
                    return res(
                                ctx.json( [ 
                                            { service_type : "洗澡" } , 
                                            { service_type : "美容" } , 
                                          ] )
                              )

                }) , 

                 // 取得 _ 特定 [ 付款日期 ] : 所有加價單
                 rest.get( 'http://localhost:7777/Laravel_Projects/gogopark/public/index.php/api/extra_fees/show_extra_fees_by_paymentdate/1/2023-07-11' , ( req , res , ctx ) => {
                           
                    return res(
                                ctx.json( [ 
                                            { service_type : "洗澡" , is_delete : 1 } , 
                                            { service_type : "美容" , is_delete : 0 } , 
                                            { service_type : "洗澡" , is_delete : 1 } , 
                                          ] )
                              )

                }) , 

                
                // 取得 _ 特定日期，到店狀態為 : 已回家(房)
                rest.get( 'http://localhost:7777/Laravel_Projects/gogopark/public/index.php/api/services/show_services_is_gohome_by_date/1/2023-07-11' , ( req , res , ctx ) => {
                                      
                    return res(
                                ctx.json([ 
                                            { shop_status : "已回家( 房 )" , amount_payable : 400 , amount_paid : 300 }  , 
                                            { shop_status : "已回家( 房 )" , amount_payable : 600 , amount_paid : 600 }  , 
                                        ])
                              )

                }) , 

                 
                

       ] ;



