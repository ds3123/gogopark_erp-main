
import * as R from "ramda"

import { update_Service_By_Service_Url_Id } from "utils/api/api_Service" ;


const do_A = ( serviceUrl : string ,  serviceId : string ) => {

    alert( "銷單成功" )

    console.log( "AAA : " +  serviceUrl + " _ " + serviceId ) ; 

} ;





// 更新 _ 服務訂單 ()
export const update_ServiceOrder = ( data : {  serviceUrl : string ,  serviceId : string } )  => {

     const { serviceUrl , serviceId } = data ; 

    return ( serviceUrl && serviceId ) ? () => do_A( serviceUrl , serviceId )  : () => alert( "資料錯誤，無法進行銷單" ) ;

} ;




