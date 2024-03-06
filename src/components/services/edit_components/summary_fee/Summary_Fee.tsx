/* eslint-disable react/jsx-pascal-case */
import Create_Use_Plans from "components/services/edit_components/summary_fee/plan_components/Create_Use_Plans" ;

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
import { useEffect_Is_Show_Create_Use_Plans } from "./hooks/useEffect_Summary_Fee" ;



/* 服務費用 _ 結算明細 */
const Summary_Fee = ( ) => {

    
       // 取得 context 值 : React Hook Form 屬性   
       const { editType } = useReact_Hook_Form_Context() ;  
        
       // 取得 _ 不同新增服務類型 : 應付金額 
       const receivable   = usePrice_Service_Receivable() ;

       // [ 新增 ] 是否顯示 _ 新增時，若類疊為 '洗澡' 或 '美容' 時，當支付方式為 '方案' 時， 特定寵物的：可用方案列表
       const is_Show_Create_Use_Plans = useEffect_Is_Show_Create_Use_Plans() ; 


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

                  { /* [ 新增 ] 顯示 _ 特定寵物方案，以供點選使用 */ }
                  { is_Show_Create_Use_Plans && <Create_Use_Plans /> }
                
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