
import { useState , useEffect } from 'react' ;
import { useSelector } from "react-redux" ;
import { validate_SubmitButton_Disable } from 'fp/common/condition/validator';



/*

   # 新增提交按鈕 _ 是否有效啟用 ( disable )

      * 加上 : 自訂 _ 表單驗證邏輯 --> 因欲驗證值 / 邏輯，有些區塊無法僅透過 RHF 表單欄位值表示  :
     

*/ 
export const useValidate_Create_Data_Container = ( is_RHF_Valid : boolean ) => {
    

    const [ disabled_Form , set_Disabled_Form ] = useState( true ) ;


     // 目前所選擇 _ 付款方式
     const current_Payment_Method = useSelector(( state : any ) => state.Summary.current_PaymentMethod ) ;


     // # 額外條件  

     // 是否已點選 : 方案標籤中 "使用此方案" 
     const is_Plan_Used        = useSelector(( state : any ) => state.Plan.is_Plan_Used ) ;

     // 員工
     const invalid_To_Employee = useSelector( ( state : any ) => state.Form.invalid_To_Employee ) ;



    // 設定 _ 表單新增按鈕 : 驗證邏輯
    useEffect( () => {

       // 驗證 _ 新增時提交鈕 : 是否失效 < T >
       const disable = validate_SubmitButton_Disable(  current_Payment_Method , 
                                                       is_RHF_Valid , 
                                                       is_Plan_Used  , 
                                                       invalid_To_Employee 
                                                    ) ;
       
       set_Disabled_Form( disable ) ;

    } , [ current_Payment_Method , is_RHF_Valid , is_Plan_Used , invalid_To_Employee ] ) ;

    return disabled_Form 

} ;