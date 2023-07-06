/* eslint-disable jest/valid-title */
import { append_Obj } from "fp/tool"



describe( "測試 _ 轉換 ( Transaction ) : 物件" , () => { 

    test( " append_Obj 新增 _ 物件 : 屬性 & 值" , () => {
    
        const obj = {}

        const obj_1 = append_Obj( "Name" , "Danny Shih" )( obj ) ;
        const obj_2 = append_Obj( "Age"  , 18 )( obj_1 ) ;         // 再追加一對 : 屬性 / 值

        expect( obj_1 ).toEqual( { "Name" : "Danny Shih"  } ) ; 
        expect( obj_2 ).toEqual( { 
                                   "Name" : "Danny Shih" ,
                                   "Age"  : 18     
                                  } ) ; 


    }) ;

    test( " append_Obj 若輸入的第 2 個參數，類型並非 'object'，會回傳空物件 {} " , () => {

        const string = append_Obj( "Name" , "Danny Shih" )( "字串" ) ;
        
        expect( string ).toEqual( {} ) ;
    
    }) ;


}) ; 




