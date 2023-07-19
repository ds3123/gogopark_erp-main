/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */


import { useEffect } from "react" ;
import { useSelector } from "react-redux" ;
import Date_Picker from "templates/form/Date_Picker" ;
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;
import useCreate_Service_Summay_Fee_Context from "../contexts/serviceSummaryFeeContext" ;




// @ 付款日期
const Payment_Date = ( ) => {

   // Context ( for 編輯 )
   const { control , setValue , editType , serviceData  } = useReact_Hook_Form_Context() ;  // React Hook Form 屬性


   // 取得 _ 設定 : 目前付款方式 ( for 新增 )
    const { current_Payment_Method } = useCreate_Service_Summay_Fee_Context() ;

   // 服務( 到店 ) 日期 
   const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;



   // 設定 _ 預設 : 付款日期 ( # 使 "付款日期"，預設上與 "到店日期" 一致 )
   useEffect( () => {

     setValue( 'payment_Date' , new Date( service_Date ) ) ;

   } , [ service_Date ] ) ;


   return <div className="column is-6-desktop">

             {/*  新增 或 修改 時 --> 若付款方式為 '方案'，不顯示 _ 收款日期 ( 因購買方案時已付過 )  */}
             { ( ( editType && serviceData?.payment_method !== '方案' ) || ( !editType && current_Payment_Method !== '方案' ) ) &&

                <div className="tag is-large is-white">

                    <b> 收款日期 : </b> &nbsp;&nbsp; 

                    { /* for 新增  */ }
                    { !editType && <Date_Picker control      = { control } 
                                                name         = 'payment_Date' 
                                                default_Date = { new Date() } /> }

                    { /* for 編輯 */ }
                    { editType &&  <b className="fDblue"> { serviceData?.payment_date } </b> } 
                     
                </div>

              }   

           </div>

} ;


export default Payment_Date
       