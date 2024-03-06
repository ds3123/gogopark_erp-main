/* eslint-disable jest/valid-title */


import { validate_SubmitButton_Disable } from "fp/common/condition/validator" ;
import { Payment_Method } from "utils/custom_types/finance_types";



describe( "validate_SubmitButton() : 驗證 _ 新增 : 提交鈕" , () => { 

    
    describe( "付款方式 : 現金" , () => { 

        const paymentMethod : Payment_Method = "現金" ;

        const is_Plan_Used        = false ;
        const invalid_To_Employee = false ;

        test( "初始狀態，回傳 : true ( disable )" , () => {

            const is_RHF_Valid = false ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                   is_RHF_Valid ,
                                                   is_Plan_Used ,
                                                   invalid_To_Employee
                                                 ) ).toBeTruthy() ;
           
        
        }) ;

        test( "通過 RHF 驗證，回傳 : false ( disable )" , () => {
        
            const is_RHF_Valid = true ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                    is_RHF_Valid ,
                                                    is_Plan_Used ,
                                                    invalid_To_Employee
                                                 ) ).not.toBeTruthy() ;
        
        }) ;
    
    }) ; 


    describe( "付款方式 : 方案" , () => { 

        const paymentMethod : Payment_Method = "方案" ;

        const invalid_To_Employee = false ;

        test( "尚未通過 RHF 驗證 && 尚未點選 _ 使用方案，回傳 : true ( disable )" , () => {

            const is_RHF_Valid = false ;
            const is_Plan_Used = false ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                    is_RHF_Valid ,
                                                    is_Plan_Used ,
                                                    invalid_To_Employee
                                                ) ).toBeTruthy() ;
                                            

        
        }) ;

        test( "通過 RHF 驗證 && 尚未點選 _ 使用方案，回傳 : true ( disable )" , () => {

            const is_RHF_Valid = true ;
            const is_Plan_Used = false ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                    is_RHF_Valid ,
                                                    is_Plan_Used ,
                                                    invalid_To_Employee
                                                  ) ).toBeTruthy() ;

        
        }) ;

        test( "尚未通過 RHF 驗證 && 已經點選 _ 使用方案，回傳 : true ( disable )" , () => {

            const is_RHF_Valid = false ;
            const is_Plan_Used = true ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                    is_RHF_Valid ,
                                                    is_Plan_Used ,
                                                    invalid_To_Employee
                                                  ) ).toBeTruthy() ;
        
        
        }) ;

        test( "通過 RHF 驗證 && 已經點選 _ 使用方案，回傳 : false ( disable )" , () => {
        
            const is_RHF_Valid = true ;
            const is_Plan_Used = true ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                    is_RHF_Valid ,
                                                    is_Plan_Used ,
                                                    invalid_To_Employee
                                                  ) ).not.toBeTruthy() ;
        
        }) ;


    
    }) ; 
    

    describe( "新增員工，「 帳號 」是否重複" , () => { 


        const paymentMethod : Payment_Method = "現金" ;
        const is_Plan_Used = false ;


        test( "初始狀態，回傳 : true ( disable )" , () => {

            const is_RHF_Valid        = false ;
            const invalid_To_Employee = false ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                   is_RHF_Valid ,
                                                   is_Plan_Used ,
                                                   invalid_To_Employee
                                                 ) ).toBeTruthy() ;

        }) ;

        test( "通過 RHF 驗證，回傳 : false ( disable )" , () => {
        
            const is_RHF_Valid        = true ;
            const invalid_To_Employee = false ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                    is_RHF_Valid ,
                                                    is_Plan_Used ,
                                                    invalid_To_Employee
                                                ) ).not.toBeTruthy() ;

        

        }) ;

        test( "通過 RHF 驗證，但「 帳號 」重複，回傳 : true ( disable )" , () => {
        
            const is_RHF_Valid        = true ;
            const invalid_To_Employee = true ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                    is_RHF_Valid ,
                                                    is_Plan_Used ,
                                                    invalid_To_Employee
                                                ) ).toBeTruthy() ;

        
        }) ;


        test( "通過 RHF 驗證，且「 帳號 」不重複，回傳 : false ( disable )" , () => {
        
            const is_RHF_Valid        = true ;
            const invalid_To_Employee = false ;

            expect( validate_SubmitButton_Disable( paymentMethod , 
                                                  is_RHF_Valid ,
                                                  is_Plan_Used ,
                                                  invalid_To_Employee
                                                ) ).not.toBeTruthy() ;
        
        }) ;
    



    
    }) ; 
    

}) ; 




