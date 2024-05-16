/* eslint-disable react/jsx-pascal-case */

import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import Plan_Used_Records from "components/services/edit_components/summary_fee/plan_components/Plan_Used_Records" ;
import { useEffect_Plan_Used_Status } from "../hooks/useEffect_Plan_Used_Column" ;


interface D_Bath  {
    click_Check_Used_List : any ;    // 點選事件
    quota_Bath            : number ; // 預設  : 洗澡數
    used_Bath             : number ; // 已使用 : 洗澡數
}

interface D_Beauty extends D_Bath {
    quota_Beauty          : number ; // 預設  : 美容數
    used_Beauty           : number ; // 已使用 : 美容數
}

interface C_Plan extends D_Beauty {
    custom_Plan           : any ;    // 自訂方案 
}




// * 預設方案 : 包月洗澡
const Deault_Plan_Bath = ( { click_Check_Used_List , quota_Bath , used_Bath } : D_Bath ) => {


   return  <div data-testid = "month-bath-section">  

                { /*  尚未用完  */ }
                <b data-testid = "month-bath-stat" className="tag is-medium is-success is-light is-rounded pointer" onClick={ click_Check_Used_List } >

                    { quota_Bath !== used_Bath &&  <b className="tag is-rounded is-white f_10 m_Right_10"> 還有 { quota_Bath - used_Bath } 次 </b>  }

                    洗 澡&nbsp;&nbsp;  

                    <b className="tag is-rounded is-success"> { used_Bath } / 4 </b>

                </b>

           </div>  

} ;


// * 預設方案 : 包月美容
const Deault_Plan_Beauty = ( { click_Check_Used_List , quota_Bath , used_Bath , quota_Beauty , used_Beauty } : D_Beauty ) => {


    return  <div data-testid = "month-beauty-section">

                { /*  尚未用完 : 洗澡  */ }
                <b data-testid = "month-beauty-stat-bath"  className="tag is-medium is-success is-light is-rounded pointer m_Right_15 m_Bottom_10" onClick={ click_Check_Used_List } >

                    { quota_Bath !== used_Bath && <b className="tag is-rounded is-white f_10 m_Right_10"> 還有 { quota_Bath - used_Bath } 次 </b>  }

                    洗 澡&nbsp;&nbsp; 

                    <b className="tag is-rounded is-success"> { used_Bath } / 3 </b>

                </b>
                
                { /*  尚未用完 : 美容  */ }
                <b data-testid = "month-beauty-stat-beauty"  className="tag is-medium is-danger is-light is-rounded pointer" onClick = { click_Check_Used_List } >

                   { quota_Beauty !== used_Beauty &&  <b className="tag is-rounded is-white f_10 m_Right_10"> 還有 { quota_Beauty - used_Beauty } 次 </b> }

                    美 容&nbsp;&nbsp; 

                    <b className="tag is-rounded is-danger"> { used_Beauty } / 1 </b>

                </b>

            </div>


} ;


// * 自訂方案 
const Custom_Plan = ( { custom_Plan , click_Check_Used_List , quota_Bath , used_Bath , quota_Beauty , used_Beauty } : C_Plan ) => {


    return  <div data-testid = "custom-plan-section">

                { ( custom_Plan && custom_Plan?.bath_num > 0 ) && 

                    <b data-testid = "custom-plan-stat-bath"  className="tag is-medium is-success is-light is-rounded pointer m_Right_15 m_Bottom_10" onClick={ click_Check_Used_List } >

                        { quota_Bath !== used_Bath && <b className="tag is-rounded is-white f_10 m_Right_10"> 還有 { quota_Bath - used_Bath } 次 </b>  }

                        洗 澡&nbsp;&nbsp; 

                        <b className="tag is-rounded is-success"> { used_Bath } / { quota_Bath } </b>

                    </b>

                } 

                { ( custom_Plan && custom_Plan?.beauty_num > 0 ) &&

                    <b data-testid = "custom-plan-stat-beauty" className="tag is-medium is-danger is-light is-rounded pointer" onClick = { click_Check_Used_List } >

                        { quota_Beauty !== used_Beauty && <b className="tag is-rounded is-white f_10 m_Right_10"> 還有 { quota_Beauty - used_Beauty } 次 </b> }

                        美 容&nbsp;&nbsp; 

                        <b className="tag is-rounded is-danger"> { used_Beauty } / { quota_Beauty } </b>

                    </b>

                }
                

            </div>



} ;






// @ 方案使用情形
const Plan_Used_Column = ( { data } : { data : any } ) => {


    const dispatch       = useDispatch() ;  

    // 方案類型 ( 名稱 )  
    const plan_Type      = data['plan_type'] ;

    // 自訂方案 ( 若為預設方案：包月洗澡 / 包月美容 ，該值為 null )
    const custom_Plan    = data?.custom_plan ;


    // 方案 _ 洗澡 / 美容 : 額度 / 已使用次數 < T > 
    const used_Stat      = useEffect_Plan_Used_Status( data ) ;

    const quota_Bath     = used_Stat?.quota_Bath ;            // 預設 _ 洗澡數   
    const quota_Beauty   = used_Stat?.quota_Beauty ;          // 預設 _ 美容數
    const used_Bath      = used_Stat?.used_Bath as number;    // 已使用 _ 洗澡數 
    const used_Beauty    = used_Stat?.used_Beauty as number ; // 已使用 _ 美容數 
    
                                                
    // 點選 _ 右側顯示使用情形 
    const click_Check_Used_List = () => dispatch( set_Side_Panel( true , <Plan_Used_Records /> , { data : data } ) ) ;
 
    

  return <>

                { /* # 預設方案 */ }  
                { plan_Type === '包月洗澡' &&

                    <Deault_Plan_Bath click_Check_Used_List = { click_Check_Used_List } 
                                      quota_Bath            = { quota_Bath } 
                                      used_Bath             = { used_Bath }  />

                }

                { plan_Type === '包月美容' &&

                    <Deault_Plan_Beauty click_Check_Used_List = { click_Check_Used_List } 
                                        quota_Bath            = { quota_Bath } 
                                        used_Bath             = { used_Bath }  
                                        quota_Beauty          = { quota_Beauty }
                                        used_Beauty           = { used_Beauty } />

                }

                { /* # 自訂方案 */ }
                { ( plan_Type !== '包月洗澡' && plan_Type !== '包月美容' && custom_Plan ) &&

                    <Custom_Plan click_Check_Used_List = { click_Check_Used_List } 
                                 quota_Bath            = { quota_Bath } 
                                 used_Bath             = { used_Bath }  
                                 quota_Beauty          = { quota_Beauty }
                                 used_Beauty           = { used_Beauty } 
                                 custom_Plan           = { custom_Plan } />

                }

         </>

} ;

export default Plan_Used_Column 
       