/* eslint-disable react/jsx-pascal-case */

import Apply_Plan_Title from "./common/Apply_Plan_Title" ;
import Apply_Plan_Options from "./common/Apply_Plan_Options" ;
import useCreate_Service_Summay_Fee_Context from "components/services/edit_components/summary_fee/contexts/serviceSummaryFeeContext" ;
import { usePlan_Validator } from "hooks/data/useForm_Validator" ;



// @ 使用 _ 方案 ( 預設 : 包月洗澡、包月美容 / 自訂 )
const Create_Use_Plans = () => {
  
    // 付款方式
    const { current_Payment_Method } = useCreate_Service_Summay_Fee_Context() ;
  
    // 方案相關驗證條件
    usePlan_Validator( current_Payment_Method ) ;


  return <div className = "column is-8-desktop" >

             { /* 標題 : 客戶、寵物、此次價格 */ }
             <Apply_Plan_Title /> 

             { /* 方案 _ 點選使用 / 紀錄標籤  */ }
             <Apply_Plan_Options />

          </div>
             
} ;

export default Create_Use_Plans  