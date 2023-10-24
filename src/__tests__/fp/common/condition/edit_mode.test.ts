/* eslint-disable jest/valid-title */

import { 
          is_Create , 
          is_Update ,

          is_Create_Customer ,
          is_Create_Pet ,
          is_Create_Basic ,
          is_Create_Bath ,
          is_Create_Beauty ,
          is_Create_Care , 
          is_Create_Lodge ,
          is_Create_Other ,
          is_Create_Plan ,
          is_Create_Price , 
          is_Create_Species , 
          is_Create_Account ,
          is_Create_Employee , 
          is_Create_Product ,
          is_Create_Bath_Or_Beauty ,

          is_PaymentMethod_Cash ,
          is_PaymentMethod_Plan ,
          is_PaymentMethod_CreditCard ,
          is_PaymentMethod_ThirdParty ,

          is_Show_Create_Use_Plans , 
        } from "fp/common/condition/edit_mode";


describe( "判斷 _ 新增、編輯模式" , () => { 

    test( "is_Create() : 是 _ 新增模式" , () => {
    
       expect( is_Create( undefined ) ).toBeTruthy() ;
       expect( is_Create( "編輯" ) ).not.toBeTruthy() ;
    
    }) ;

    test( "is_Update() : 是 _ 編輯模式" , () => {

       expect( is_Update( "編輯" ) ).toBeTruthy() ;
       expect( is_Update( undefined ) ).not.toBeTruthy() ;
    
    })    

}) ; 


describe( "判斷 _ 新增類型" , () => { 

    test( "is_Create_Customer() : 是 _ 新增客戶" , () => {

        expect( is_Create_Customer( "客戶" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Pet() : 是 _ 新增寵物" , () => {
    
        expect( is_Create_Pet( "寵物" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Basic() : 是 _ 新增基礎" , () => {

        expect( is_Create_Basic( "基礎" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Bath() : 是 _ 新增洗澡" , () => {

        expect( is_Create_Bath( "洗澡" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Beauty() : 是 _ 新增美容" , () => {
    
        expect( is_Create_Beauty( "美容" ) ).toBeTruthy() ;
    
    }) ;

    test( "is_Create_Bath_Or_Beauty() : 是 _ 新增洗澡 or 美容" , () => {
    
        expect( is_Create_Bath_Or_Beauty( "洗澡" ) ).toBeTruthy() ;
        expect( is_Create_Bath_Or_Beauty( "美容" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Care() : 是 _ 新增安親" , () => {
    
        expect( is_Create_Care( "安親" ) ).toBeTruthy() ;

    }) ;
    
    test( "is_Create_Lodge() : 是 _ 新增住宿 " , () => {

        expect( is_Create_Lodge( "住宿" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Other() : 是 _ 新增其他" , () => {
    
        expect( is_Create_Other( "其他" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Plan() : 是 _ 新增方案" , () => {
    
        expect( is_Create_Plan( "方案" ) ).toBeTruthy() ;
    
    }) ;

    test( "is_Create_Price() : 是 _ 新增價格" , () => {
    
        expect( is_Create_Price( "價格" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Species() : 是 _ 新增品種" , () => {

        expect( is_Create_Species( "品種" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Account() : 是 _ 新增帳號" , () => {
    
        expect( is_Create_Account( "帳號" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Employee() : 是 _ 新增員工" , () => {
    
        expect( is_Create_Employee( "員工" ) ).toBeTruthy() ;
    
    }) ;
    
    test( "is_Create_Product() : 是 _ 新增商品" , () => {
    
        expect( is_Create_Product( "商品" ) ).toBeTruthy() ;
    
    }) ;

}) ; 


describe( "判斷 _ 支付方式" , () => { 

    test( "is_PaymentMethod_Cash() : 是 _ 現金" , () => {

        expect( is_PaymentMethod_Cash( "現金" ) ).toBeTruthy(); 
    
    }) ; 

    test( "is_PaymentMethod_Plan() : 是 _ 方案" , () => {
    
        expect( is_PaymentMethod_Plan( "方案" ) ).toBeTruthy(); 
    
    }) ;

    test( "is_PaymentMethod_CreditCard() : 是 _ 信用卡" , () => {

        expect( is_PaymentMethod_CreditCard( "信用卡" ) ).toBeTruthy(); 
    
    }) ;

    test( "is_PaymentMethod_ThirdParty() : 是 _ 第三方支付" , () => {

        expect( is_PaymentMethod_ThirdParty( "第三方支付" ) ).toBeTruthy(); 
    
    }) ;

}) ; 


describe( "判斷 _ 是否顯示：特定區塊" , () => { 

    test( "is_Show_Create_Use_Plans() : 是否顯示 _ 新增時，若類疊為 '洗澡' 或 '美容' 時，當支付方式為 '方案' 時， 特定寵物的：可用方案列表" , () => {
    
        expect( is_Show_Create_Use_Plans( undefined , "洗澡" , "方案" , [ {} ] ) ).toBeTruthy();
        expect( is_Show_Create_Use_Plans( undefined , "美容" , "方案" , [ {} , {} ] ) ).toBeTruthy();
        
        expect( is_Show_Create_Use_Plans( "編輯" , "洗澡" , "方案" , [ {} ] )).not.toBeTruthy();
        expect( is_Show_Create_Use_Plans( undefined , "安親" , "方案" , [ {} ] )).not.toBeTruthy();
        expect( is_Show_Create_Use_Plans( undefined , "洗澡" , "現金" , [ {} ] )).not.toBeTruthy();
        expect( is_Show_Create_Use_Plans( undefined , "洗澡" , "方案" , [ ] )).not.toBeTruthy();
    

    }) ;

}) ; 


















