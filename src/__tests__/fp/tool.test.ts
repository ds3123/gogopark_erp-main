/* eslint-disable jest/valid-title */
import { 
          append_Obj ,
          sort_ObjAttr

        } from "fp/tool"



describe( "append_Obj " , () => { 

    test( "新增 _ 物件 : 屬性 & 值" , () => {
    
        const obj = {}

        const obj_1 = append_Obj( "Name" , "Danny Shih" )( obj ) ;
        const obj_2 = append_Obj( "Age"  , 18 )( obj_1 ) ;         // 再追加一對 : 屬性 / 值

        expect( obj_1 ).toEqual( { "Name" : "Danny Shih"  } ) ; 
        expect( obj_2 ).toEqual( { 
                                   "Name" : "Danny Shih" ,
                                   "Age"  : 18     
                                  } ) ; 


    }) ;

    test( "若輸入的第 2 個參數，類型並非 'object'，會回傳空物件 {} " , () => {

        const string = append_Obj( "Name" , "Danny Shih" )( "字串" ) ;
        
        expect( string ).toEqual( {} ) ;
    
    }) ;

}) ; 


describe( "sort_ObjAttr_Direction :  排序 ( sort ) _ 依照 : 物件屬性 ( objAttr ) 與 新舊方向 ( sortDirection ) " , () => { 
             
    const data = [ 
                   { created_at : "2023-07-12 01:24:58" } ,
                   { created_at : "2023-01-22 21:09:58" } ,
                   { created_at : "2023-06-12 02:10:58" } ,
                   { created_at : "2023-11-02 21:20:58" } ,
                   { created_at : "2023-03-24 21:20:58" } ,
                  ] ;


   test( "屬性 : 建檔日期 ( created_at ) : 新 -> 舊 " , () => {

        const result = [ 
                         { created_at : "2023-11-02 21:20:58" } ,
                         { created_at : "2023-07-12 01:24:58" } ,
                         { created_at : "2023-06-12 02:10:58" } ,
                         { created_at : "2023-03-24 21:20:58" } ,
                         { created_at : "2023-01-22 21:09:58" } ,
                       ] ;
   
        expect( sort_ObjAttr( 'created_at' , 'desc' )( data ) ).toEqual( result ) ;   

   }) ;

   test( "屬性 :建檔日期 ( created_at ) : 舊 -> 新 " , () => {

        const result = [ 
                         { created_at : "2023-01-22 21:09:58" } ,
                         { created_at : "2023-03-24 21:20:58" } ,
                         { created_at : "2023-06-12 02:10:58" } ,
                         { created_at : "2023-07-12 01:24:58" } ,
                         { created_at : "2023-11-02 21:20:58" } ,
                       ] ;

        expect( sort_ObjAttr( 'created_at' , 'asc' )( data ) ).toEqual( result ) ;   

   }) ;

}) ; 




