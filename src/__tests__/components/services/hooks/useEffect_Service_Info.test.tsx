/* eslint-disable jest/valid-title */
import { renderHook , act } from '@testing-library/react-hooks' ;


import { 
         useEffect_Set_CurrentTime , 

       } from "components/services/hooks/useEffect_Service_Info" ;



 


 test( "useEffect_Set_CurrentTime : 設定 _ 目前時間 ( for 到店時間、離店時間 )" , () => {
 
     const setValue    = jest.fn() ;
     const currentTime = '14:10' ;
     const columnName  = 'actual_Leave' ;
    
     const { result } = renderHook( () => useEffect_Set_CurrentTime( setValue , currentTime ) ) ;


     // 初始值 : false
     expect( result.current.is_CurrentTime_Column ).toBe( "" );           


     // 點選設定  
     act( () => result.current.click_Set_CurrentTime( columnName ) ) ; 


     // ----------------------

     // 初始值 : true
     expect( result.current.is_CurrentTime_Column ).toBe( columnName ) ; 
     
     // setValue 呼叫參數
     expect( setValue ).toHaveBeenCalledWith( columnName , currentTime ) ; 


     // 回傳物件內容 : { is_CurrentTime , click_Set_CurrentTime }
     const objectKeys = Object.keys( result.current ) ;          // 先取得物件 key
     expect( objectKeys ).toContain( "is_CurrentTime_Column" ) ;
     expect( objectKeys ).toContain( "click_Set_CurrentTime" ) ;


 }) ;








