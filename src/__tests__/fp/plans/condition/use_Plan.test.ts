/* eslint-disable jest/valid-title */
import { 
         is_Pet_Has_Plans , 
         
        } from "fp/plans/condition/use_Plan";


describe( "" , () => { 

    test( "is_Pet_Has_Plans() : 某特定寵物，有 _ 可使用方案" , () => {
    
        const pet_Plans_1 : any[] = [ {} , {} ] ;
        const pet_Plans_2 : any[] = [] ;

        expect( is_Pet_Has_Plans( pet_Plans_1 ) ).toBeTruthy() ;
        expect( is_Pet_Has_Plans( pet_Plans_2 ) ).not.toBeTruthy() ;
    
    }) ;

}) ; 

describe( "是否顯示 _ 特定區塊" , () => { 


    

}) ; 









