
import { useState , useEffect } from 'react' ;
import { useSelector } from "react-redux" ;


// * 新增提交按鈕 _ 是否有效啟用 ( 加上 : 自訂 _ 表單驗證邏輯 --> 因欲驗證值 / 邏輯，有些區塊無法僅透過 RHF 表單欄位值表示 )
export const useValidate_Create_Data_Container = ( isValid : boolean ) => {
    
    const [ disabled_Form , set_Disabled_Form ] = useState( true ) ;

     // # 額外條件  

     // 方案 : 包月洗澡 _ 條件不符 
     const invalid_To_Plan     = useSelector( ( state : any ) => state.Form.invalid_To_Plan ) ;
   
     // 員工
     const invalid_To_Employee = useSelector( ( state : any ) => state.Form.invalid_To_Employee ) ;

     
    // 設定 _ 表單新增按鈕 : 驗證邏輯
    useEffect( () => {
      
       // React Hook Form 本身的驗證機制
       const is_RHF_Valid = isValid ;  

       // # 決定 _ 提交按鈕是否有作用的 : 條件組合 [ RHF 本身 + 其他額外條件 ( Ex. invalid_To_Plan ) ]
       const is_Disabled_Form = !is_RHF_Valid || invalid_To_Plan || invalid_To_Employee  ;
  
       // 設定 _ state
       set_Disabled_Form( is_Disabled_Form ? true : false ) ;
       

    } , [ isValid , invalid_To_Plan , invalid_To_Employee ] ) ;

    return disabled_Form 

} ;