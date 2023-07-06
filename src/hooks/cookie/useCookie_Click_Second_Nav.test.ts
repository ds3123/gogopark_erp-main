/* eslint-disable jest/valid-title */

import { renderHook } from '@testing-library/react-hooks' ;
import { useCookie_Click_Second_Nav } from "./useCookie_Click_Second_Nav" ;
import cookie from 'react-cookies' ;


describe( "方案 : 新增、刪除，依照 Cookie，重導向相對應頁面時，執行 _ 點選函式" , () => { 


    describe( "新增 _ 方案" , () => { 

        // 新增 _ Cookie、執行 Hook
        beforeAll( () => {

            cookie.save( 'after_Created_Plan' , '洗美_方案' , { path : '/' , maxAge : 5 } ) ;

        } ) ;

        // 刪除 _ Cookie
        afterAll( () => {

            cookie.remove( 'after_Created_Plan' , { path : '/' } ) ;

        } ) ;

        test( "" , () => {
        
        
        }) ;
    
        // test( "當設定 Cookie 名稱為 'after_Created_Plan'，值為 '洗美_方案' 時，Hook 輸入的方法，會以參數為'方 案'的方式執行" , () => {

        //     const mock_Click_Second = jest.fn() ;

        //     renderHook( () => useCookie_Click_Second_Nav( mock_Click_Second ) ) ;

        //     expect( mock_Click_Second ).toHaveBeenCalledWith( "方 案" )

        // }) ;
    
    }) ;


    describe( "刪除 _ 方案" , () => { 

        
        // 新增 _ Cookie、執行 Hook
        beforeAll( () => {

            cookie.save( 'after_Delete_Plan' , '洗美_方案' , { path : '/' , maxAge : 5 } ) ;

        } ) ;

        // 刪除 _ Cookie
        afterAll( () => {

           cookie.remove( 'after_Delete_Plan' , { path : '/' } ) ;

        } ) ;

        test( "" , () => {
        
        
        }) ;
    
        // test( "當設定 Cookie 名稱為 'after_Delete_Plan'，值為 '洗美_方案' 時，Hook 輸入的方法，會以參數為'方 案'的方式執行" , () => {
            
        //     const mock_Click_Second = jest.fn() ;

        //     renderHook( () => useCookie_Click_Second_Nav( mock_Click_Second ) ) ;
            
        //     expect( mock_Click_Second ).toHaveBeenCalledWith( "方 案" )

        // }) ;
    
    }) ;
 

}) ;












