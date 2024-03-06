

/* @ 服務單明細  */

import { Payment_Method } from "utils/custom_types/finance_types";

interface ISummary {

    current_PaymentMethod : Payment_Method ; // 目前付款方式

}

const initState : ISummary = {

    current_PaymentMethod  : "現金" ,
  
} ;


const reducer_Summary = ( state = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 目前付款方式
        case "SET_CURRENT_PAYMENTMETHOD" : return { ...state , current_PaymentMethod : action.current_PaymentMethod } ;

        default : return state ;

    }


} ;

export default reducer_Summary ;
