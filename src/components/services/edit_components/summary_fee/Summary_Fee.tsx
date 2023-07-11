/* eslint-disable react/jsx-pascal-case */
import Apply_Plans from "components/services/edit_components/summary_fee/plan_components/Apply_Plans" ;

// 主要元件
import Service_Item from "./summary_components/Service_Item" ;
import Amount_Payable from "components/services/edit_components/summary_fee/summary_components/Amount_Payable" ;
import Payment_Method from "components/services/edit_components/summary_fee/summary_components/Payment_Method" ;
import Amount_Paid from "components/services/edit_components/summary_fee/summary_components/Amount_Paid" ;
import Admin_User from "components/services/edit_components/summary_fee/summary_components/Admin_User" ;
import Admin_Note from "components/services/edit_components/summary_fee/summary_components/Admin_Note" ;
import Create_Date from "./summary_components/Create_Date" ;
import Payment_Date from "./summary_components/Payment_Date" ;
import { usePrice_Service_Receivable } from "hooks/data/usePrice" ;
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;
 


/* 服務費用 _ 結算明細 */
const Summary_Fee = ( ) => {

    
       // 取得 context 值 : React Hook Form 屬性   
       const { editType } = useReact_Hook_Form_Context() ;  
        

       // 取得 _ 不同新增服務類型 : 應付金額 
       const receivable   = usePrice_Service_Receivable() ;


    return <>

              { editType ? "" : <><hr/><br/></> }
             
              { /* # 費用明細 */ }
              <div className = "columns is-multiline is-mobile" >

                  { /* 服務項目 */ }
                  <Service_Item />
                  
                  { /* 應收金額 */ }
                  <Amount_Payable receivable = { receivable } />  
                  
                  { /* 付款方式  */ }
                  <Payment_Method />

                  { /* 實收金額 */ }
                  <Amount_Paid receivable = { receivable } />

                  { /* 顯示方案，以供點選使用 */ }
                  <Apply_Plans /> 
                
              </div>

              { /* # 櫃台經手資訊 */ }
              <div className="columns is-multiline is-mobile">

                  { /* 櫃台人員 */ }
                  <Admin_User />

                  { /* 櫃台備註 */ }
                  <Admin_Note />

                  { /* 建檔日期 */ }
                  <Create_Date />

                  { /* 收款日期 */ }
                  <Payment_Date /> 
                    
              </div>

           </>

} ;

export default Summary_Fee