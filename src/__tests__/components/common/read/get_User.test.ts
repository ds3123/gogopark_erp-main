/* eslint-disable jest/valid-title */

import { get_Cookie_EmployeeName } from "fp/common/read/get_User"


describe( "測試 _  登入使用者相關資訊" , () => { 


    test( "登入時，使用者 Cookie 的 employee_name 欄位 _ 有值 -> 回傳員工姓名" , () => {

        const Cookie_UserInfo = {
                                  employee_name : "Danny Shih"  // 員工姓名
                                  }
    
        expect( get_Cookie_EmployeeName( Cookie_UserInfo ) ).toBe( "Danny Shih" ) ;
    
    }) ;

    test( "登入時，使用者 Cookie 的 employee_name 欄位 _ 沒有值 -> 回傳 ''" , () => {

        const Cookie_UserInfo = {
                                  employee_name : ""  // 員工姓名
                                 }
    
        expect( get_Cookie_EmployeeName( Cookie_UserInfo ) ).toBe( "" ) ;
    
    }) ;



}) ; 




