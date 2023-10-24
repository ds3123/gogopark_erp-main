
import { FC, useState } from 'react' ;
import { useDispatch, useSelector } from 'react-redux';
import { useEffect_Plan_Used_Status } from "components/plan/hooks/useEffect_Plan_Used_Column" ;
import { click_Cutomer_Use_Plan_Tag  } from "store/actions/action_Plan" ;
import { CreateTab } from 'utils/custom_types/form';


type Box = {
  tag_Index    : number ; // 目前頁籤索引   
  clicked_Plan : any ;    // 所點選方案
}


// 點選 _ 使用該方案
const show_Click_Use_Plan = ( current_Tab : CreateTab , used_Num : number , quota_Num : number ) => 
                            <span> { current_Tab }使用情形 : { used_Num } / { quota_Num } &nbsp; &nbsp; 點選使用 &nbsp; </span> ;

// 已經點選使用
const show_Is_Clicked_Use_Plan = ( current_Tab : CreateTab , used_Num : number , quota_Num : number  ) => 
                                 <span > { current_Tab }已使用 : { used_Num + 1 } / { quota_Num }  </span> ;

// 額度使用完畢
const show_Is_Quota_Used_Up = (  used_Num : number , quota_Num : number  ) => 
                              <b className = "tag is-rounded is-danger f_10 m_Right_15" > { used_Num } / { quota_Num } &nbsp; 額度使用完畢 </b>  ;




// @ 標籤區塊 : 點選使用/ 復原點選使用、查無自訂方案、額度使用完畢
const Create_Use_Plan_Box : FC< Box > = ( { tag_Index , clicked_Plan } ) => {


  const dispatch = useDispatch() ;


  // 目前 _ 點選使用方案標籤的索引號碼 
  const clicked_Tag_Index = useSelector( ( state : any ) => state.Plan.current_Plan_Tag_Index ) ; 

  // 目前新增類型
  const current_Tag       = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;


  // 方案 _ 洗澡 / 美容 : 額度 / 已使用次數 < T > 
  const { quota_Bath , quota_Beauty , used_Bath , used_Beauty } = useEffect_Plan_Used_Status( clicked_Plan ) ;
 

  // 依照目前新增資料類型 ( 洗澡 / 美容 )，決定 _ 額度 / 已使用次數
  const quota_Num = current_Tag === "洗澡" ? quota_Bath : quota_Beauty ;  // 額度
  const used_Num  = current_Tag === "洗澡" ? used_Bath  : used_Beauty ;   // 已使用次數


  // 點選 _ 使用該方案
  const click_Use_Plan = () => {
     
      dispatch( click_Cutomer_Use_Plan_Tag( current_Tag , tag_Index , clicked_Tag_Index , clicked_Plan ) ) ;

  } ;
  

  return <>

            { /*  1. 點選 _ 使用方案【 未額滿 】 */ }
            { quota_Num !== used_Num  &&  

              <b className = { `tag is-rounded m_Right_15 f_10 ${ clicked_Tag_Index === tag_Index ? 'is-black' : 'is-white' }` } 
                 onClick   = { click_Use_Plan } >

                { /* 點選 _ 使用該方案 */ }
                { clicked_Tag_Index !== tag_Index && show_Click_Use_Plan( current_Tag , used_Num , quota_Num ) }
                
                { /* 已經點選使用 */ }
                { clicked_Tag_Index === tag_Index && show_Is_Clicked_Use_Plan( current_Tag , used_Num , quota_Num ) }
                  
              </b>

            }

            { /*  2. 顯示 _ 使用【 已額滿 】 */ }
            { quota_Num === used_Num && show_Is_Quota_Used_Up( used_Num , quota_Num ) } 
  
         </>

} ;

export default Create_Use_Plan_Box  