/* eslint-disable react-hooks/exhaustive-deps */

// useContext
import { useContext } from "react" ;
import { SidePanelContext } from "templates/panel/Side_Panel" ;
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;

import useCreate_Service_Summay_Fee_Context from "components/services/edit_components/summary_fee/contexts/serviceSummaryFeeContext" ;
import { useEffect_Amount_Paid_Create  } from "../hooks/useEffect_Amount_Paid" ;


type Paid = {
   
   receivable : number ;  // 應收金額
    
}


// @ 實收金額
const Amount_Paid = ( { receivable } : Paid ) => {


    // # Context
    const value = useContext( SidePanelContext ) ;                             // 取得 context 值  
    const data  = value.preLoadData ? value.preLoadData : value.data ;         // 預先取得資料

    const { register , setValue , editType } = useReact_Hook_Form_Context() ;  // 取得 context 值 : React Hook Form 屬性   


    // 付款方式
    const { current_Payment_Method } = useCreate_Service_Summay_Fee_Context() ;

    
    // [ 新增 ] 服務 ，實收金額 : 相關 effect
    const handle_ActualPayment = useEffect_Amount_Paid_Create( setValue , receivable , editType , data ) ; 
         


   return  <>

              { /*  @ 新增資料  */ }
              { ( !editType && ( current_Payment_Method === '現金' || current_Payment_Method === '信用卡' || current_Payment_Method === '第三方支付' ) )  &&

                    <> 

                        <div className="column is-2-desktop relative">

                            <span className="tag is-large is-white m_Right_10"> <b> 實收金額 : </b> </span> 

                        </div>

                        <div className="column is-2-desktop relative">

                            { /* for 新增 */ }
                            <div className="control has-icons-left" style={{left: "-64px"}}>

                                <input className="input relative" type="number" min="0" 
                                        { ...register("amount_Paid")} onChange ={ e => handle_ActualPayment( e.target.value ) } />

                                <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                                <span className="absolute" style={{left: "170px",top:"5px"}}> <b> 元 </b> </span>

                            </div>

                        </div>

                    </>     

              }   


              { /*  @ 編輯資料  */ }
              { ( editType && ( data?.payment_method === '現金' || data?.payment_method === '信用卡' || data?.payment_method === '第三方支付' ) )  &&  
              
                   <>

                        <div className="column is-2-desktop">
                            <span className="tag is-large is-white"> <b> 實收金額 : </b> </span>
                        </div>

                        <div className="column is-2-desktop relative">
                
                            <div className="control has-icons-left" style={{left: "-64px"}}>

                                <input className="input relative" type="number" min="0"
                                        { ...register("amount_Paid")} onChange ={ e => handle_ActualPayment(e.target.value) } />

                                <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                                <span className="absolute" style={{left: "170px",top:"5px"}}> <b> 元 </b> </span>

                            </div>
                   
                        </div>
                   
                   </>
                     
               }

          </>


} ;


export default Amount_Paid
       