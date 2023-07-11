


// 取得 _ 服務單銷單 : 修改物件 -> 刪除 < T >
export const get_Delete_Obj = ( delete_Submitter : string , is_Delete : number ) : Delete_Obj => {

    return { 
             is_delete        : is_Delete ,
             delete_submitter : delete_Submitter  
           }

} ;

