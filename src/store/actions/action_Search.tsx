

import { Dispatch } from "redux"


// 設定 _ 為客戶關係人相關資訊
export const set_Is_Customer_Relatives_Info = ( info : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                           type                      : "SET_IS_CUSTOMER_RELATIVES_INFO" ,
                           iS_Csutomer_Relative_Info : info
                         }) ;

           } ;

} ;