



import { Dispatch } from "redux"
import { Payment_Method } from "utils/custom_types/finance_types";


// 設定 _ 目前付款方式
export const set_Current_PaymentMethod = ( paymentMethod : Payment_Method ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                           type                  : "SET_CURRENT_PAYMENTMETHOD" ,
                           current_PaymentMethod : paymentMethod
                         }) ;

           } ;

} ;