/* eslint-disable react-hooks/exhaustive-deps */

import { useFetch_Custom_Plans } from "hooks/react-query/plan/useFetchPlans" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;

import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;

import { useEffect_Handle_Plan_Type_Change } from "../../hooks/useEffect_Applied_Plan_Type" ;



// @ 方案類型 ( 下拉選單 )
const Applied_Plan_Type = ( ) => {


    
    // 取得 context 值 : React Hook Form 屬性   
    const { register , setValue , editType , serviceData } = useReact_Hook_Form_Context() ;  


    // 目前登入者，所屬店家 id
    const shop_Id      =  useAccount_Shop_Id() ;
    
    // 取得 _ 特定店家，所有 : 自訂方案
    const custom_Plans = useFetch_Custom_Plans( shop_Id );  

     
    // 變動處理 : 方案類型 ( 名稱 ) 
    const handle_Plan_Type_Change = useEffect_Handle_Plan_Type_Change( setValue ) ;


    
    const is_Edit = editType === '編輯' ;


   return  <div className="column is-3-desktop">

                { /* for 新增  */ }
                { is_Edit ||

                    <>

                        <p> <b> 方案類型 </b> </p>

                        <div className="select">

                            <select { ...register( "plan_Type" ) } onChange={ e => handle_Plan_Type_Change( e.target.value ) } >

                                <option value="請選擇">   請選擇    </option>
                                <option value="包月洗澡"> 包月洗澡  </option>
                                <option value="包月美容"> 包月美容  </option>
                                
                                { /* 自訂方案 */ } 
                                { custom_Plans.map( ( x : any , y : number ) => <option key={y} value={ x['plan_name'] } > { x['plan_name'] }  </option> ) }
                                
                            </select>

                        </div>

                    </>

                }
                
                
                { /* for 編輯 */ }
                { is_Edit &&  <div className="f_14"> 方案類型 : <b className="fDblue"> { serviceData.plan_type }  </b> </div>  }

          </div>

} ;


export default Applied_Plan_Type 
       