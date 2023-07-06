/* eslint-disable jest/valid-title */
import { renderHook , act } from '@testing-library/react-hooks' ;
import { useEffect_Plan_Used_Status } from "./useEffect_Plan_Used_Column"



describe( "useEffect_Plan_Used_Status() 方案使用次數" , () => { 


   describe( "預設方案 : 包月洗澡" , () => { 


        test( "沒有使用洗澡" , () => {

            const mock_Plan = {
                                plan_type         : "包月洗澡" ,      
                                plan_used_records : [] ,
                                custom_plan       : null      
                              } ;

            const { result } = renderHook( () => useEffect_Plan_Used_Status( mock_Plan ) )  ;
                
            expect( result.current ).toEqual({
                                                quota_Bath   : 4 ,
                                                quota_Beauty : 0 ,
                                                used_Bath    : 0 ,
                                                used_Beauty  : 0 
                                            } ) ;

        }) ;


        test( "使用 2 次洗澡" , () => {

            const mock_Plan = {
                                plan_type         : "包月洗澡" ,      
                                plan_used_records : [
                                                      { service_type : "洗澡" , is_delete : 0 } ,
                                                      { service_type : "洗澡" , is_delete : 0 } ,
                                                    ] ,
                                custom_plan       : null      
              } ;

            const { result } = renderHook( () => useEffect_Plan_Used_Status( mock_Plan ) )  ;

            expect( result.current ).toEqual({
                                                quota_Bath   : 4 ,
                                                quota_Beauty : 0 ,
                                                used_Bath    : 2 ,
                                                used_Beauty  : 0 
                                             } ) ;
        
        
        }) ;

    
   }) ;

   describe( "預設方案 : 包月美容" , () => { 
   

        test( "沒有使用美容" , () => {

                const mock_Plan = {
                                    plan_type         : "包月美容" ,      
                                    plan_used_records : [] ,
                                    custom_plan       : null      
                                } ;

                const { result } = renderHook( () => useEffect_Plan_Used_Status( mock_Plan ) )  ;

                expect( result.current ).toEqual({
                                                   quota_Bath   : 3 ,
                                                   quota_Beauty : 1 ,
                                                   used_Bath    : 0 ,
                                                   used_Beauty  : 0 
                                                }) ;
    
        }) ; 


        test( "使用 2 次洗澡、1 次美容" , () => {

                const mock_Plan = {
                    plan_type         : "包月美容" ,      
                    plan_used_records : [
                                        { service_type : "洗澡" , is_delete : 0 } ,
                                        { service_type : "洗澡" , is_delete : 0 } ,
                                        { service_type : "美容" , is_delete : 0 } ,
                                        ] ,
                    custom_plan       : null      
                } ;

                const { result } = renderHook( () => useEffect_Plan_Used_Status( mock_Plan ) )  ;

                expect( result.current ).toEqual({
                                                quota_Bath   : 3 ,
                                                quota_Beauty : 1 ,
                                                used_Bath    : 2 ,
                                                used_Beauty  : 1 
                                                }) ;
        
        

        }) ;


   }) ;


   describe( "自訂方案" , () => { 

   
        test( "沒有使用自訂方案" , () => {

                    const mock_Plan = {
                                        plan_type         : "2023 新年 3洗2美 優惠" ,      
                                        plan_used_records : [] ,
                                        custom_plan       : {
                                                                bath_num   : 3 ,
                                                                beauty_num : 2
                                                            }      
                                    } ;

            const { result } = renderHook( () => useEffect_Plan_Used_Status( mock_Plan ) )  ;

            expect( result.current ).toEqual({
                                                quota_Bath   : 3 ,
                                                quota_Beauty : 2 ,
                                                used_Bath    : 0 ,
                                                used_Beauty  : 0 
                                            }) ;

        
        
        }) ; 



        test( " 3 洗 2 美自訂方案中，使用 1 次洗澡、2 次美容" , () => {

            const mock_Plan = {
                                plan_type         : "2023 新年 3洗2美 優惠" ,      
                                plan_used_records : [
                                                      { service_type : "洗澡" , is_delete : 0 } ,
                                                      { service_type : "美容" , is_delete : 0 } ,
                                                      { service_type : "美容" , is_delete : 0 } ,
                                                    ] ,
                                custom_plan       : {
                                                        bath_num   : 3 ,
                                                        beauty_num : 2
                                                    }      
                            } ;

            const { result } = renderHook( () => useEffect_Plan_Used_Status( mock_Plan ) )  ;

            expect( result.current ).toEqual({
                                                quota_Bath   : 3 ,
                                                quota_Beauty : 2 ,
                                                used_Bath    : 1 ,
                                                used_Beauty  : 2 
                                            }) ;



        }) ; 



   }) ;
   
   
}) ;



