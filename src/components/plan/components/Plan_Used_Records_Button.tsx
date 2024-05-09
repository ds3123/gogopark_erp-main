/* eslint-disable react/jsx-pascal-case */
import { FC } from 'react' 
import Plan_Used_ExtraItem_Sign from "components/services/edit_components/summary_fee/plan_components/common/plan_used/Plan_Used_ExtraItem_Sign";
import { usePlan_Click_Check_Used_Records } from "hooks/data/usePlan" ;




// # 按鈕：檢視 _ 方案使用用紀錄
const Plan_Used_Records_Button : FC< { plan : any } > = ( { plan } ) => {


   // 點選 _ 檢視 : 方案使用紀錄
   const click_Check_Used_Records = usePlan_Click_Check_Used_Records() ;


  return <span className = "tag is-rounded is-primary relative pointer"
               onClick   = { () => click_Check_Used_Records( plan ) } > 
                    
            { /* 
                 標示 : 方案是否有使用 "加價項目" 
                  --> 使用在：方案 ( 已使用 ) 列表時，可能因過多查詢，會顯示 axios 相關錯誤，再確認 2024.05.09 */ }
            {/*  <Plan_Used_ExtraItem_Sign plan = { plan } />  */}
            <i className = "fas fa-list" ></i>    

          </span>
} ;

export default Plan_Used_Records_Button  