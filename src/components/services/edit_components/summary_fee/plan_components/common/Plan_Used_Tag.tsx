/* eslint-disable react/jsx-pascal-case */

import { useDispatch , useSelector } from "react-redux" ;
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Plan_Used_Records from "components/services/edit_components/summary_fee/plan_components/Plan_Used_Records" ;
import { string_Short } from "utils/string/edit_string" ;
import Plan_Used_ExtraItem_Sign from "./plan_used/Plan_Used_ExtraItem_Sign" ;
import Create_Use_Plan_Box from "./plan_apply/Create_Use_Plan_Box" ;



// 依照方案類型，回傳 _ 標籤樣式差異
const get_Tag_Style = ( plan : any ) => {
  
    let tag_Color    = '' ;                                                                                // 標籤樣式   
    let tag_Style    = 'tag is-medium m_Left_15 m_Bottom_15 is-light pointer ' ;                           // 標籤顏色 
    const title_Type =  plan['plan_type']=== '包月洗澡' || plan['plan_type']=== '包月美容' ? '預設' : '自訂' ; // 標籤類型 ( 預設 / 自訂 ) 

    if( plan['plan_type'] === '包月洗澡' ) tag_Color = 'is-success' ;
    if( plan['plan_type'] === '包月美容' ) tag_Color = 'is-danger' ;
    if( plan['plan_type'] !== '包月洗澡' && plan['plan_type'] !== '包月美容' ) tag_Color = 'is-warning' ;

    tag_Style += tag_Color ;

    return { tag_Style , title_Type  }

} ;  

type Tag = {
    plan    : any ;
    index   : number ;
}



// @ 方案點選使用標籤
const Plan_Used_Tag = ( { plan , index } : Tag ) => {


    const dispatch      = useDispatch() ; 

    // 標籤樣式
    const { tag_Style } = get_Tag_Style( plan ) ;  

    // 點選 _ 檢視 : 寵物資訊
    const click_Check_Used_Records = ( plan_Data : any ) => 
                                       dispatch( set_Modal( true , <Plan_Used_Records /> , { data : plan_Data , modal_Style : { width : "80%" , left : "10%" , bottom : "0px" } } )) ;


    return  <b className = { tag_Style } style = { { boxShadow : "0px 1px 2px 1px rgba( 0 , 0 , 0 , .2 )" , borderRadius : "20px" } } >

                { /* 方案名稱、建立日期 */ }
                { string_Short( plan['plan_type'] , 5 ) } &nbsp; 
                <span className = "f_10 m_Right_15" > ( id : { plan['id'] } / 建檔 : { plan['created_at'] ? plan['created_at'].slice( 0 , 10 ) : "" } ) </span> 

                { /* 方案點選使用 / 復原點選使用、查無自訂方案、額度使用完畢  */ } 
                <Create_Use_Plan_Box tag_Index = { index } clicked_Plan = { plan } />

                { /* 點選顯示 _ 已使用列表 ( Modal )  */ }
                <span className = "tag is-rounded is-primary relative" onClick = { () => click_Check_Used_Records( plan ) } > 
                    
                    { /* 標示 : 方案是否有使用 "加價項目" */ }
                    <Plan_Used_ExtraItem_Sign plan = { plan } /> 
                    <i className = "fas fa-list" ></i>    

                </span>
                    
            </b>

} ;

export default Plan_Used_Tag
       