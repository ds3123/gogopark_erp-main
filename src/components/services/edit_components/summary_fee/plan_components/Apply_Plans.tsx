/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useSelector } from "react-redux";
import { usePlan_Validator } from "hooks/data/useForm_Validator" ;
import Apply_Plan_Title from "./common/Apply_Plan_Title" ;
import Apply_Plan_Options from "./common/Apply_Plan_Options" ;
import { useFetch_Pet_Plans } from "hooks/react-query/plan/useFetchPlans"  ;
import useCreate_Service_Summay_Fee_Context from "components/services/edit_components/summary_fee/contexts/serviceSummaryFeeContext" ;
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;


// @ 使用 _ 方案 ( 預設 : 包月洗澡、包月美容 / 自訂 )
const Apply_Plans = ( ) => {

     // 取得 context 值 : React Hook Form 屬性   
     const { register , setValue , editType } = useReact_Hook_Form_Context() ;  

     // 目前所點選 _ 新增類別標籤
     const current_Create_Tab         = useSelector(( state : any ) => state.Service.current_Create_Tab ) ;
   
     // 目前在寵物區，所點選寵物資料
     const current_Pet                = useSelector( ( state : any ) => state.Pet.current_Pet ) ;
     const current_Pet_Serial         = current_Pet ? current_Pet['serial'] : '' ;   // 寵物編號
   
   
     // 使用本次方案的 _ 價格 ( 點選 _ 標籤 "使用此方案" 後設定 )
     const current_Plan_Service_Price = useSelector( ( state : any ) => state.Plan.current_Plan_Service_Price ) ;
     

     // 付款方式
     const { current_Payment_Method } = useCreate_Service_Summay_Fee_Context() ;

     // 特定寵物 _ 所有購買的方案  
     const { data : pet_All_Plans }   = useFetch_Pet_Plans( current_Pet_Serial ) ;


    
     // 方案相關驗證條件
     usePlan_Validator( current_Payment_Method ) ;

      
  
     // 設定 _ 使用本次方案的 _ 價格 ( "此次價格" )
     useEffect( () => {
       
        setValue( 'current_Plan_Used_Fee' , current_Plan_Service_Price ) ;

     } , [ current_Plan_Service_Price ] ) ;


    return <div className="column is-8-desktop">

               { /* @ 新增 _ 洗澡或美容時，付款方式為方案，且該寵物所有購買的方案  */ }  
                { ( !editType && ( current_Create_Tab === '洗澡' || current_Create_Tab === '美容' ) && current_Payment_Method === '方案' && pet_All_Plans.length > 0 ) &&

                   <>
                      { /* 標題 : 客戶、寵物、此次價格 */ }
                      <Apply_Plan_Title register={ register } /> 
                    
                      { /* 方案 _ 點選使用 / 紀錄標籤  */ }
                      <Apply_Plan_Options current_Tap = { current_Create_Tab }  pet_All_Plans = { pet_All_Plans } />

                   </>

                } 
              
           </div>


} ;

export default Apply_Plans