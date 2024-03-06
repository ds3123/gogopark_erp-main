import { Payment_Method } from "utils/custom_types/finance_types";




// 驗證 _ 新增時提交鈕 : 是否失效 < T >
export const validate_SubmitButton_Disable = ( paymentMethod       : Payment_Method , // 目前付款方式
                                               is_RHF_Valid        : boolean ,        // RHF 驗證
                                               is_Plan_Used        : boolean ,        // 使用方案
                                               invalid_To_Employee : boolean          // 新增帳號
                                             ) : boolean => {


    const is_Paid_Cash = paymentMethod === "現金" ;
    const is_Paid_Plan = paymentMethod === "方案" ;


    return ( is_Paid_Cash && !is_RHF_Valid && !is_Plan_Used && !invalid_To_Employee ) ? true :
           ( is_Paid_Cash && is_RHF_Valid && !is_Plan_Used && !invalid_To_Employee ) ? false :

           ( is_Paid_Plan && !is_RHF_Valid && !is_Plan_Used && !invalid_To_Employee ) ? true :
           ( is_Paid_Plan && is_RHF_Valid && !is_Plan_Used && !invalid_To_Employee ) ? true :
           ( is_Paid_Plan && !is_RHF_Valid && is_Plan_Used && !invalid_To_Employee ) ? true :
           ( is_Paid_Plan && is_RHF_Valid && is_Plan_Used && !invalid_To_Employee ) ? false :
           true ;

} ;