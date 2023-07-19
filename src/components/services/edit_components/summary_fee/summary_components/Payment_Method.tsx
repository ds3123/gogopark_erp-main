/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux" ;

// useContext
import { useContext } from "react" ;
import { SidePanelContext } from "templates/panel/Side_Panel" ;
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;


import { useFetch_Pet_Plans } from "hooks/react-query/plan/useFetchPlans" ;
import useCreate_Service_Summay_Fee_Context from "../contexts/serviceSummaryFeeContext" ;
import { useEffect_Payment_Method_Create } from "../hooks/useEffect_Payment_Method" ;




// @ 付款方式 ( Ex. 現金、包月洗澡、包月美容 )
const Payment_Method = ( ) => {


    // 取得 context 值 : React Hook Form 屬性   
    const { register , setValue , editType } = useReact_Hook_Form_Context() ;  


    // 目前所點選 _ 新增類別標籤
    const current_Create_Tab             = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;

    // 取得 _ 設定 : 目前付款方式
    const { set_Current_Payment_Method } = useCreate_Service_Summay_Fee_Context() ;


    // # for 編輯
    const value = useContext( SidePanelContext ) ;                      // 取得 context 值  
    const data  = value.preLoadData ? value.preLoadData : value.data ;  // 預先取得資料


    const current_Pet              = useSelector( ( state : any ) => state.Pet.current_Pet ) ;  // 取得 _ 目前所點選寵物
    const { data : pet_All_Plans } = useFetch_Pet_Plans( current_Pet?.serial ) ;                // 取得 _ 目前所點選寵物 : 有購買的方案  

    
    // # 變動處理 : 設定 _ 付款方式
    const handle_PaymentMethod     = ( method : string ) => set_Current_Payment_Method( method ) ;

    // 執行 _ 新增服務時，相關 effect 
    useEffect_Payment_Method_Create( current_Create_Tab , setValue , set_Current_Payment_Method ) ;

  

   return <div className="column is-4-desktop" >

              <span className="tag is-large is-white relative" >

                <b> 付款方式 : </b> &nbsp; 
                { /* for 新增 */ }
                { !editType &&

                    <div className = "control has-icons-left" >

                        <div className = "select is-small relative" >

                            <select { ...register( "payment_Method" ) }
                                        style    = {{ fontSize : "13pt" , top: "-7px" , fontWeight : "bold" }}
                                        onChange = { e => handle_PaymentMethod( e.target.value )} >

                                <option value="現金">      現金      </option>

                                { /* 該寵物有買方案 & 位於洗澡、美容  */ }
                                {
                                  ( pet_All_Plans.length > 0 && ( current_Create_Tab === '洗澡' || current_Create_Tab === '美容' ) ) && 
                                        <option value="方案"> 方案 </option> 
                                }  

                                <option value="信用卡">    信用卡     </option>
                                <option value="第三方支付"> 第三方支付 </option>

                            </select>

                        </div>

                        <div className="icon is-small is-left"> <i className="fas fa-money-bill-wave"></i> </div>

                    </div>

                }

                { /*  for 編輯  */ }
                { editType && <b className="fDblue"> 
                
                    { data?.payment_method } 
                    
                       { data?.plan && <span className = "f_12" > ( id : { data?.plan?.plan_id } ) </span>   }
                    
                    </b>  }

              </span>

           </div> 

} ;


export default Payment_Method
       