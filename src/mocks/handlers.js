
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
                 
                

       ] ;



