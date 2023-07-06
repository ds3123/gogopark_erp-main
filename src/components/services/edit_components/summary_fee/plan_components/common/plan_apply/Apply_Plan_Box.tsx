/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { Click_Apply_Tag } from "./Click_Apply_Tag" ;
import { useEffect_Plan_Used_Status } from "components/plan/hooks/useEffect_Plan_Used_Column" ;


type Box = {
  tag_Index    : number ;         // 目前頁籤索引   
  click_Index  : null | number ;  // 已點選 _ 頁籤索引
  clicked_Plan : any ;            // 所點選方案
}


// @ 標籤區塊 : 點選使用/ 復原點選使用、查無自訂方案、額度使用完畢
export const Apply_Plan_Box = ( { tag_Index , click_Index  , clicked_Plan  } : Box ) => { 

  
  // 目前新增類型
  const current_Tag = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;


  // 方案 _ 洗澡 / 美容 : 額度 / 已使用次數 < T > 
  const used_Stat   = useEffect_Plan_Used_Status( clicked_Plan ) ;
  const { quota_Bath , quota_Beauty , used_Bath , used_Beauty } = used_Stat ;
  

  // 依照目前新增資料類型 ( 洗澡 / 美容 )，決定 _ 額度 / 已使用次數
  const quota_Num = current_Tag === "洗澡" ? quota_Bath : quota_Beauty ;  // 額度
  const used_Num  = current_Tag === "洗澡" ? used_Bath : used_Beauty ;    // 已使用次數


  // # 2 種顯示狀態 :
  return <>


              { /*  1. 點選 _ 使用方案【 未額滿 】 */ }
               { quota_Num !== used_Num  &&  

                      <Click_Apply_Tag  tag_Index    = { tag_Index } 
                                        click_Index  = { click_Index }
                                        clicked_Plan = { clicked_Plan } />   

              } 


              { /*  2. 顯示 _ 使用【 已額滿 】 */ }
               { quota_Num === used_Num  &&  

                   <b className = "tag is-rounded is-danger f_10 m_Right_15" > { used_Num } / { quota_Num } &nbsp; 額度使用完畢 </b>  
                    
               } 

         </>

}