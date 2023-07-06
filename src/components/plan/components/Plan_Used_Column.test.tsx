/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jest/valid-title */
import { render , screen } from "@testing-library/react" ;


// Redux
import { storeFactory } from "store/tool";
import { Provider } from "react-redux" ;
import reducer_Plan from "store/reducers/reducer_Plan" ;

import Plan_Used_Column from "./Plan_Used_Column" ; 



describe( "方案資料列中，方案使用情形(統計)欄位" , () => { 

   let store : any ;

   // <Plans_Table /> 相關 ruducer
   const reducers_Obj = { 
                           Plan : reducer_Plan ,
                        } ;   

   // 渲染元件                     
   const render_Provider = ( mock_Data : any ) => {

                              return render( 
                                             <Provider store={ store }>  
                                                <Plan_Used_Column data = { mock_Data  } /> 
                                             </Provider> 
                                          ) ;     
                        
                          } ;
                        
   // 建立 store、渲染 <Second_Nav_Options />                         
   beforeEach( () => {

      store = storeFactory( reducers_Obj ) ; 

   }) ;       
   

   // ----------------

   test( "" , () => {
   
   
   }) ;



   // 以下再確認，是否要修改或廢除 2023.01.03 


   // describe( "方案屬於 _ 預設方案 －> 屬性 plan_type 的值 ， 為 '包月洗澡' 或 '包月美容'" , () => { 
 
   //    describe( "方案為：包月洗澡 ( 有 4 次洗澡 )" , () => { 

   //       test( "初始顯示 : 顯示 _ 洗澡區塊，不顯示 _ 美容區塊、自訂方案區塊" , async() => {
         
   //          const mock_Data = {  plan_type : "包月洗澡" }

   //          const { getByTestId , queryByTestId } = render_Provider( mock_Data ) ;

   //          expect( getByTestId( "month-bath-section" ) ).toBeInTheDocument();          // 包月洗澡區塊

   //          expect( queryByTestId( "month-beauty-section" ) ).not.toBeInTheDocument();  // 包月美容區塊
   //          expect( queryByTestId( "custom-plan-section" )).not.toBeInTheDocument();    // 自訂方案區塊
         
   //       }) ;

   //       test( "已使用 0 次洗澡 -> 尚未使用狀態" , () => {

   //          const mock_Data = { 
   //                               plan_type         : "包月洗澡" ,
   //                               plan_used_records : [] 
   //                            }

   //          const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    


   //          expect( getByTestId("month-bath-stat") ).toHaveTextContent( "洗 澡 0 / 4" ); // 洗澡使用統計標籤
   //          expect( queryByText( /已用完/i ) ).not.toBeInTheDocument();                   //方案已用完標籤 
                  
   //       }) ;

   //       test( "已使用 2 次洗澡 -> 已經使用狀態" , () => {

   //          const mock_Data = { 
   //                               plan_type         : "包月洗澡" ,
   //                               plan_used_records : [
   //                                                     { service_type : "洗澡" } ,
   //                                                     { service_type : "洗澡" } 
   //                                                    ] 
   //                            }

   //          const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    


   //          expect( getByTestId("month-bath-stat") ).toHaveTextContent( "洗 澡 2 / 4" ); // 洗澡使用統計標籤
   //          expect( queryByText( /已用完/i ) ).not.toBeInTheDocument();                  // 方案已用完標籤 

         
   //       }) ;

   //       test( "已使用 4 次洗澡 -> 已用完狀態" , () => {

   //          const mock_Data = { 
   //                               plan_type         : "包月洗澡" ,
   //                               plan_used_records : [
   //                                                      { service_type : "洗澡" } ,
   //                                                      { service_type : "洗澡" } ,
   //                                                      { service_type : "洗澡" } ,
   //                                                      { service_type : "洗澡" } 
   //                                                    ] 
   //                             }

   //          const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    

   //          expect( getByTestId("month-bath-stat") ).toHaveTextContent( "洗 澡 4 / 4" ); // 洗澡使用統計標籤
   //          expect( queryByText( /已用完/i ) ).toBeInTheDocument();                      // 方案已用完標籤 
         
         
   //       }) ;
      
        
   //    }) ;
      
   //    describe( "方案為：包月美容 ( 有 3 次洗澡、1 次美容 )" , () => { 

   //       test( "初始顯示 : 顯示 _ 美容區塊，不顯示 _ 洗澡區塊、自訂方案區塊" , () => {
         
   //          const mock_Data = {  plan_type : "包月美容" }

   //          const { getByTestId , queryByTestId } = render_Provider( mock_Data ) ;


   //          expect( getByTestId( "month-beauty-section" ) ).toBeInTheDocument();     // 包月美容區塊
            
   //          expect( queryByTestId( "month-bath-section" ) ).not.toBeInTheDocument(); // 包月洗澡區塊
   //          expect( queryByTestId( "custom-plan-section" )).not.toBeInTheDocument(); // 自訂方案區塊
         
   //       }) ;

   //       test( "已使用 0 次洗澡、0 次美容 -> 尚未使用狀態" , () => {
         
   //          const mock_Data = { 
   //                                plan_type         : "包月美容" ,
   //                                plan_used_records : [] 
   //                            }

   //          const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    


   //          expect( getByTestId("month-beauty-stat-bath") ).toHaveTextContent( "洗 澡 0 / 3" );   // 洗澡使用統計標籤
   //          expect( getByTestId("month-beauty-stat-beauty") ).toHaveTextContent( "美 容 0 / 1" ); // 美容使用統計標籤
            
   //          expect( queryByText( /已用完/i ) ).not.toBeInTheDocument();                           // 方案已用完標籤 

         
   //       }) ;

   //       test( "已使用 1 次洗澡、1 次美容 -> 已經使用狀態" , () => {
         
   //          const mock_Data = { 
   //                               plan_type         : "包月美容" ,
   //                               plan_used_records : [
   //                                                     { service_type : "洗澡" } ,
   //                                                     { service_type : "美容" } ,
   //                                                   ] 
   //         }

   //          const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    


   //          expect( getByTestId("month-beauty-stat-bath") ).toHaveTextContent( "洗 澡 1 / 3" );   // 洗澡使用統計標籤
   //          expect( getByTestId("month-beauty-stat-beauty") ).toHaveTextContent( "美 容 1 / 1" ); // 美容使用統計標籤

   //          expect( queryByText( /已用完/i ) ).not.toBeInTheDocument();                           // 方案已用完標籤 

         
   //       }) ;

   //       test( "已使用 4 次洗澡、1 次美容 -> 已用完狀態" , () => {
         
   //          const mock_Data = { 
   //                               plan_type         : "包月美容" ,
   //                               plan_used_records : [
   //                                                    { service_type : "洗澡" } ,
   //                                                    { service_type : "洗澡" } ,
   //                                                    { service_type : "洗澡" } ,
   //                                                    { service_type : "美容" } ,
   //                                                 ] 
   //                            }

   //          const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    


   //          expect( getByTestId("month-beauty-stat-bath") ).toHaveTextContent( "洗 澡 3 / 3" );   // 洗澡使用統計標籤
   //          expect( getByTestId("month-beauty-stat-beauty") ).toHaveTextContent( "美 容 1 / 1" ); // 美容使用統計標籤

   //          expect( queryByText( /已用完/i ) ).toBeInTheDocument();                               // 方案已用完標籤 
                     

   //       }) ;
         
      
   //    }) ;
      
   // }) ;

   // describe( "方案屬於 _ 自訂方案 －> 屬性 plan_type 的值 ， 不為 '包月洗澡' 且 不為 '包月美容'" , () => { 

   //     test( "初始顯示 : 顯示 _ 自訂方案區塊，不顯示 _ 洗澡區塊、美容區塊" , () => {
         
   //       const mock_Data = {  plan_type : "八月週年慶方案" }

   //       const { getByTestId , queryByTestId } = render_Provider( mock_Data ) ;


   //       expect( getByTestId( "custom-plan-section" )).toBeInTheDocument();         // 自訂方案區塊

   //       expect( queryByTestId( "month-bath-section" ) ).not.toBeInTheDocument();   // 包月洗澡區塊
   //       expect( queryByTestId( "month-beauty-section" ) ).not.toBeInTheDocument(); // 包月美容區塊
       
   //    }) ;

   //    test( "僅使用洗澡 ( 5 次 ) -> 顯示 : 洗澡統計標籤，不顯示：美容統計標籤" , () => {

   //       const mock_Data = { 
   //                            plan_type         : "5 次洗澡方案" ,
   //                            plan_used_records : [] ,
   //                            custom_plan       : {
   //                                                  bath_num   : 5 ,
   //                                                  beauty_num : null 
   //                                              }
   //                          }

   //       const { queryByText , queryByTestId , getByTestId } = render_Provider( mock_Data ) ;    

   //       expect( getByTestId("custom-plan-stat-bath") ).toHaveTextContent( "洗 澡 0 / 5" ); // 洗澡使用統計標籤

   //       expect( queryByTestId("custom-plan-stat-beauty") ).not.toBeInTheDocument();       // 美容使用統計標籤    
   //       expect( queryByText( /已用完/i ) ).not.toBeInTheDocument();                        // 方案已用完標籤 
                
   //    }) ;


   //    test( "僅使用美容 ( 3 次 )  -> 顯示 : 美容統計標籤，不顯示：洗澡統計標籤" , () => {

   //       const mock_Data = { 
   //                            plan_type         : "3 次美容方案" ,
   //                            plan_used_records : [] ,
   //                            custom_plan       : {
   //                                                 bath_num   : null ,
   //                                                 beauty_num : 3 
   //                                              }
   //                          }

   //       const { queryByText , queryByTestId , getByTestId } = render_Provider( mock_Data ) ;    

         
   //       expect( getByTestId("custom-plan-stat-beauty") ).toHaveTextContent( "美 容 0 / 3" ); // 美容使用統計標籤

   //       expect( queryByTestId("custom-plan-stat-bath") ).not.toBeInTheDocument();            // 洗澡使用統計標籤    
   //       expect( queryByText( /已用完/i ) ).not.toBeInTheDocument();                           // 方案已用完標籤 
                
      
      
   //    }) ;


   //    test( "已使用 0 次洗澡、 0 次美容 -> 尚未使用狀態" , () => {

   //          const mock_Data = { 
   //                               plan_type         : "八月週年慶方案" ,
   //                               plan_used_records : [] ,
   //                               custom_plan       : {
   //                                                     bath_num   : 2 ,
   //                                                     beauty_num : 2 
   //                                                   }
   //                            }

   //          const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    


   //          expect( getByTestId("custom-plan-stat-bath") ).toHaveTextContent( "洗 澡 0 / 2" );   // 洗澡使用統計標籤
   //          expect( getByTestId("custom-plan-stat-beauty") ).toHaveTextContent( "美 容 0 / 2" ); // 美容使用統計標籤
            
   //          expect( queryByText( /已用完/i ) ).not.toBeInTheDocument();                           // 方案已用完標籤 

   
   //    }) ; 

   //    test( "已經使用洗澡或美容 -> 已經使用狀態" , () => {

   //          const mock_Data = { 
   //                               plan_type         : "八月週年慶方案" ,
   //                               plan_used_records : [
   //                                                      { service_type : "洗澡" } 
   //                                                   ] ,
   //                               custom_plan       : {
   //                                                     bath_num   : 2 ,
   //                                                     beauty_num : 2 
   //                                                   }
   //                             }

   //          const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    

   //          expect( getByTestId("custom-plan-stat-bath") ).toHaveTextContent( "洗 澡 1 / 2" );   // 洗澡使用統計標籤
   //          expect( getByTestId("custom-plan-stat-beauty") ).toHaveTextContent( "美 容 0 / 2" ); // 美容使用統計標籤
            
   //          expect( queryByText( /已用完/i ) ).not.toBeInTheDocument();                           // 方案已用完標籤 

      
   //    }) ;

   //    test( "已使用洗澡、美容次數，等於洗澡、美容可使用次數 -> 已用完狀態" , () => {

   //       const mock_Data = { 
   //                            plan_type         : "八月週年慶方案" ,
   //                            plan_used_records : [
   //                                                  { service_type : "洗澡" } ,
   //                                                  { service_type : "洗澡" } ,
   //                                                  { service_type : "美容" } ,
   //                                                  { service_type : "美容" } ,
   //                                                ] ,
   //                            custom_plan       : {
   //                                                  bath_num   : 2 ,
   //                                                  beauty_num : 2 
   //                                                }
   //                         }

   //       const { queryByText , getByTestId } = render_Provider( mock_Data ) ;    

   //       expect( getByTestId("custom-plan-stat-bath") ).toHaveTextContent( "洗 澡 2 / 2" );   // 洗澡使用統計標籤
   //       expect( getByTestId("custom-plan-stat-beauty") ).toHaveTextContent( "美 容 2 / 2" ); // 美容使用統計標籤
         
   //       expect( queryByText( /已用完/i ) ).toBeInTheDocument();                              // 方案已用完標籤 
            
   //    }) ;
   
   // }) ;
   
   
}) ;



