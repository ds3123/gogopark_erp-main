/* eslint-disable react/jsx-pascal-case */

import { useSelector } from "react-redux";

import { FeeDetail_Basic ,
         FeeDetail_Bath ,
         FeeDetail_Beauty ,
         FeeDetail_Care_Ordinary ,
         FeeDetail_Care_Ahead ,
         FeeDetail_Care_Postpone ,
         FeeDetail_Lodge ,
         FeeDetail_Default_Plan_Bath ,
         FeeDetail_Default_Plan_Beauty ,
         FeeDetail_Custom_Plan 
       } from "./hooks/useEffect_Fee_Detail"



type feeDetail = {
                   editType      : string | undefined ;
                   paymentMethod : string ;
                 }



// @ 費用項目標籤
export const FeeDetail = ( { editType , paymentMethod } : feeDetail ) => {

   
   // 目前所點選 _ 新增類別標籤
   const current_Create_Tab = useSelector(( state : any ) => state.Service.current_Create_Tab ) ;

   // 安親類型 ( Ex. 一般安親、住宿 _ 提早抵達、住宿 _ 延後帶走 )  
   const current_Care_Type   = useSelector(( state : any ) => state.Care.current_Care_Type ) ;    
  
   // 方案類型( 名稱 ) ( Ex. 預設方案 : 包月洗澡、包月美容 、自訂方案 )
   const current_Plan_Type   = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;        


   return  <>

              { ( !editType  && paymentMethod === '現金' )  &&

                  <>

                        { /* 主要服務 : 基礎、洗澡、美容  */ }
                        { current_Create_Tab === '基礎' && <FeeDetail_Basic /> }

                        { current_Create_Tab === '洗澡' && <FeeDetail_Bath /> }
                        { current_Create_Tab === '美容' && <FeeDetail_Beauty /> }

                        { /* 安親 */ }
                        { ( current_Create_Tab === '安親' && current_Care_Type === '一般安親' ) &&      <FeeDetail_Care_Ordinary /> }
                        { ( current_Create_Tab === '安親' && current_Care_Type === '住宿_提早抵達' ) &&  <FeeDetail_Care_Ahead /> }
                        { ( current_Create_Tab === '安親' && current_Care_Type === '住宿_延後帶走' ) &&  <FeeDetail_Care_Postpone /> }

                        { /* 住宿 */ }
                        { current_Create_Tab === '住宿' && <FeeDetail_Lodge /> }

                        { /* 方案 ( 預設 : 包月洗澡 、 包月美容 / 自訂 ) */ }
                        { ( current_Create_Tab === '方案' && current_Plan_Type === '包月洗澡' ) && <FeeDetail_Default_Plan_Bath  /> }
                        { ( current_Create_Tab === '方案' && current_Plan_Type === '包月美容' ) && <FeeDetail_Default_Plan_Beauty /> }

                        { ( current_Create_Tab === '方案' && ( current_Plan_Type && current_Plan_Type !== '包月洗澡' && current_Plan_Type !== '包月美容' ) ) && 
                                    <FeeDetail_Custom_Plan /> }

                  </>

               }

          </>

} ;


