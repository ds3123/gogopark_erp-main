
import { rest } from "msw" ;



// @ Mock Service Worker -> Handler 設定

export const handlers = [

                rest.get('http://localhost:7777/Laravel_Projects/gogopark/public/index.php/api/basics' , ( req , res , ctx ) => {
                // rest.get('http://localhost:7777/Laravel_Projects/gogopark/public/index.php/api/plans/show_all_with_customer_species_records/1' , ( req , res , ctx ) => {
                           
                    return res(
                                ctx.status( 200 ),
                                ctx.json([ 
                                            { service_type : "1234" } , 
                                            { service_type : "Mary" } ,         
                                            { service_type : "gggg" } ,         
                                            { service_type : "444" } ,         
                                          ]),
                              )

                }) , 

                // 取得 _ 特定店家，特定服務日期，所有 【 預約 】與 【 轉異常 】服務單
                rest.get('http://localhost:7777/Laravel_Projects/gogopark/public/index.php/api/services/show_services_is_delete_error_by_date/1/2023-07-11' , ( req , res , ctx ) => {
                           
                    return res(
                                ctx.status( 200 ),
                                ctx.json( [ 
                                            { service_type : "洗澡" } , 
                                            { service_type : "美容" } , 
                                          ] )
                              )

                }) , 
                 
                

       ] ;



