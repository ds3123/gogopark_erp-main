
import { get_ServiceOrder_Url_Id , get_ServiceOrder_DeleteInfo_Obj  } from "fp/services/read/get_ServiceOrder" ;
import { update_ServiceOrder  } from "fp/services/update/update_ServiceOrder" ;

import * as R from 'ramda';
import { compose } from "fp/tool" ;



const show = ( msg : any ) => {

  console.log( "--> " ,  msg ) ;

} ;

const display = ( fn : any ) => {

    fn() ;

}


// 刪除 _ 服務單 ( 銷單 )
export const delete_ServiceOrder = ( data : any ) => {

     compose( 
              get_ServiceOrder_DeleteInfo_Obj ,  // 取得 _ 服務單 : API url、資料表 id、刪除物件
              // update_ServiceOrder , 
              show
            )( data ) ;

} ;


