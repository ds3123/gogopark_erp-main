/* eslint-disable react/jsx-pascal-case */
import Plan_Used_Tag from "components/services/edit_components/summary_fee/plan_components/common/Plan_Used_Tag";
import { usePlan_Filter_By_Type } from "hooks/data/usePlan";


type Options = {

    current_Tap   : "洗澡" | "美容" ;
    pet_All_Plans : any[] ;

}



// @ 特定寵物，所有購買、可供使用的方案選項
const Apply_Plan_Options = ( { current_Tap , pet_All_Plans } : Options ) => {

    
    // < T > 特定寵物 : 所有購買方案，依所處新增 _ 洗澡 或 美容 頁籤，顯示可用方案 ( 並依 "建檔日期" 欄位 ( created_at ）: 新 -> 舊 )
    const plan_Options = usePlan_Filter_By_Type( current_Tap , pet_All_Plans ) ;


    return <>
 
               { 
                
                  plan_Options.map( ( x , y ) => {

                     return <div key = { y } data-testid = "plan-option-row" >

                                <Plan_Used_Tag plan = { x } index = { y } />

                            </div>

                  }) 
                
                }
              
            </>

} ;

export default Apply_Plan_Options
       