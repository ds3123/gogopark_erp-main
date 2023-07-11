

import { get_Delete_Obj  } from "fp/common/read/get_Delete"




describe( "測試 get_Delete_Obj : 取得  _ 服務單銷單 : 修改物件" , () => { 


    test( "執行 _ 銷單" , () => {
    
         expect( get_Delete_Obj( "Danny" , 1 ) ).toEqual({ 
                                                           is_delete        : 1 , 
                                                           delete_submitter : "Danny" 
                                                         }) ;
    
    }) ;

    test( "撤回 _ 銷單" , () => {
    
        expect( get_Delete_Obj( "Danny" , 0 ) ).toEqual({ 
                                                           is_delete        : 0 , 
                                                           delete_submitter : "Danny" 
                                                         }) ;
   
    }) ;




}) ; 