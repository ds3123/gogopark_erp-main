import { useState , useEffect } from 'react' ;

import { useEffect_Check_PlanRecord_ExtraItems } from "../../../hooks/useEffect_Plan_Used_ExtraItem_Sign"


const num = { height:"22px" , paddingLeft:"4px" , paddingRight:"4px" ,background:"red" ,top:"-13px" , left:"25px" , fontSize:"8pt"} ;




// @ 標示 : 方案是否有使用 "加價項目"
const Plan_Used_ExtraItem_Sign = ( { plan } : { plan : any } ) => {


   // 檢查 _ 該方案使用紀錄，是否有 : 加價項目
   const is_ExtraItem_Used = useEffect_Check_PlanRecord_ExtraItems( plan ) ;



   return <>

             { is_ExtraItem_Used && <b className = "tag absolute fWhite" style = { num } > ＋加價 </b>  }

          </>
          
} ;

export default Plan_Used_ExtraItem_Sign
       