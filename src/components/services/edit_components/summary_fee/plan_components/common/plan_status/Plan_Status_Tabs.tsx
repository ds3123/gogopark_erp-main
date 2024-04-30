/* eslint-disable react/jsx-pascal-case */

import { FC , useState } from 'react' 
import Plan_Used_Tag from "components/services/edit_components/summary_fee/plan_components/common/Plan_Used_Tag"
import { is_Plan_Done } from 'components/plan/hooks/useEffect_Plan_Used_Column'




type Tab = {
    plan_Options : any[] ;
}


// # 方案使用情形標籤 : 
const Plan_Status_Tabs : FC< Tab > = ( { plan_Options } ) => {


    // 方案使用情形
    const [ is_Type , set_Is_Type ] = useState< "未用完" | "已用完" | "所有方案" >( "未用完" ) ;
 

    // 篩選 : 未用完方案
    const is_Not_Done_Plans = plan_Options?.filter( ( plan : any ) => !is_Plan_Done( plan ) ) ;


    // 篩選 : 已用完方案
    const is_Done_Plans     = plan_Options?.filter( ( plan : any ) => is_Plan_Done( plan ) ) ;
    

  return <>
  
                <div className = "m_Bottom_20" >

                    <b onClick   = { () => set_Is_Type( "未用完" ) } 
                       className = { `tag is-large is-rounded pointer m_Right_20 ${ is_Type === "未用完" ? "is-black" : "" }` }> 
                       未用完方案 &nbsp; <span className = "tag is-white is-rounded" > { is_Not_Done_Plans?.length } </span>
                    </b>

                    <b onClick   = { () => set_Is_Type( "已用完" ) }  
                       className = { `tag is-large is-rounded pointer m_Right_20 ${ is_Type === "已用完" ? "is-black" : "" }` }> 
                       已用完方案 &nbsp; <span className = "tag is-white is-rounded" > { is_Done_Plans?.length } </span>
                    </b>

                    <b onClick   = { () => set_Is_Type( "所有方案" ) }  
                       className = { `tag is-large is-rounded pointer ${ is_Type === "所有方案" ? "is-link" : "is-link is-light" }` }> 
                       所有方案 &nbsp; <span className = "tag is-white is-rounded" > { plan_Options?.length } </span>
                    </b>

                </div>

                { /* 未用完方案 */ }
                { 
                   is_Type === "未用完" && <div className = "m_Left_10" > 

                                              {
                                                is_Not_Done_Plans.map(( x : any , y : number ) => {

                                                                        return <div key = { y } className = "m_Left_10" data-testid = "plan-option-row" >

                                                                                <Plan_Used_Tag plan = { x } index = { y } />

                                                                            </div>

                                                                      }) 
                                              }

                                          </div>

                }

                { /* 已用完方案 */ }
                { 
                   is_Type === "已用完" && <div className = "m_Left_10" > 

                                              {
                                                is_Done_Plans.map(( x : any , y : number ) => {

                                                                      return <div key = { y } className = "m_Left_10" data-testid = "plan-option-row" >

                                                                              <Plan_Used_Tag plan = { x } index = { y } />

                                                                          </div>

                                                                }) 
                                              }

                                          </div>
                }

                { /* 所有方案 */ }
                {
                  is_Type === "所有方案" && <div className = "m_Left_10" > 

                                             { 

                                                plan_Options.map( ( x : any , y : number ) => {

                                                    return <div key = { y } className = "m_Left_10" data-testid = "plan-option-row" >

                                                               <Plan_Used_Tag plan = { x } index = { y } />

                                                           </div>

                                                }) 

                                             }

                                          </div>

                }
             
         </>

} ;

export default Plan_Status_Tabs  