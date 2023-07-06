
import { useDispatch , useSelector } from "react-redux" ;
import { click_Cutomer_Use_Plan_Tag  } from "store/actions/action_Plan" ;
import { useEffect_Plan_Used_Status } from "components/plan/hooks/useEffect_Plan_Used_Column" ;


       
export type Type_Available = {

    tag_Index    : number ;         // 目前頁籤索引   
    click_Index  : null | number ;  // 已點選 _ 頁籤索引

    clicked_Plan : any ;            // 所點選方案                             
   
} ;




// @ 點選 _ 使用 / 復原使用 方案頁籤
export const Click_Apply_Tag = ( { tag_Index , click_Index  , clicked_Plan  } : Type_Available ) => { 


     const dispatch    = useDispatch() ;

     // 目前新增類型
     const current_Tag = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;



     // 方案 _ 洗澡 / 美容 : 額度 / 已使用次數 < T > 
     const used_Stat  = useEffect_Plan_Used_Status( clicked_Plan ) ;

     const { quota_Bath , quota_Beauty , used_Bath , used_Beauty } = used_Stat ;

     const quota_Num = current_Tag === "洗澡" ? quota_Bath : quota_Beauty ;
     const used_Num  = current_Tag === "洗澡" ? used_Bath : used_Beauty ;




     // 點選使用樣式
     const used_Style  = `tag is-rounded m_Right_15 f_10 ${ click_Index === tag_Index ? 'is-black' : 'is-white' }` ;   



     const click_Use_Plan = () => {
     
          dispatch( click_Cutomer_Use_Plan_Tag( current_Tag , tag_Index , click_Index , clicked_Plan ) ) ;
     
     } ;
     
  

  return <b className   = { used_Style } 
            data-testid = "btn_click_use_plan"
            onClick     = { click_Use_Plan } >


            { click_Index !== tag_Index &&

                 // 點選 _ 使用該方案
                 <span data-testid="click_apply_plan" >
                     
                      { current_Tag }使用情形 : { used_Num } / { quota_Num } &nbsp;

                      &nbsp; 點選使用 &nbsp;

                 </span>

            }
             
            { click_Index === tag_Index && 

                 // 已經點選使用
                 <span data-testid="used_num_stat">
                    
                    { current_Tag }已使用 : { used_Num + 1 } / { quota_Num } 

                 </span>

            }
            
               
         </b>

}
