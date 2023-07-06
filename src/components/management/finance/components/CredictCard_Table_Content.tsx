/* eslint-disable react/jsx-pascal-case */

import useSection_Folding from "hooks/layout/useSection_Folding"
import Section_Title_Bar from 'components/management/finance/components/Section_Title_Bar'
import Service_Receivable_Table from "components/management/finance/components/Service_Receivable_Table"
import Advance_Receipt_Table from "components/management/finance/components/Advance_Receipt_Table"
import Lodge_Receivable_Table from "components/management/finance/components/Lodge_Receivable_Table"
import { useFinance_Section_Total  } from 'hooks/data/useFinance'





// @表單內容 : 信用卡支付
const CredictCard_Table_Content = ( { data_Obj }  : { data_Obj : I_Finance_Section_2 } ) => {


    // 取得 _ 各區塊小計                   
    const total_Obj = useFinance_Section_Total( data_Obj ) ;  



    // # 收折區塊
    const { is_folding : is_folding_Receivable , Folding_Bt : Folding_Bt_Receivable } = useSection_Folding( false ) ;  // 應收款
    const { is_folding : is_folding_Prepayment , Folding_Bt : Folding_Bt_Prepayment } = useSection_Folding( false ) ;  // 預收款
    const { is_folding : is_folding_LodgeCare ,  Folding_Bt : Folding_Bt_LodgeCare }  = useSection_Folding( false ) ;  // 住宿款 + 安親款


    return <>   

                { /* 洗澡美容 : 應收款 */ }
                <Section_Title_Bar tag_Color='is-success' service_Type='洗澡美容' amount_Type='應收款' amount_Total={ total_Obj.Service_Receivable } Folding_Bt_Type={ Folding_Bt_Receivable } />
                { is_folding_Receivable && <div className="m_Bottom_100"> <Service_Receivable_Table data={ data_Obj.service_Data } /> </div>  }


                { /* 洗澡美容 ( 方案 ) : 預收款 */ }
                <Section_Title_Bar tag_Color='is-warning' service_Type='洗澡美容' amount_Type='預收款' amount_Total={ total_Obj.Advance_Receipt  } Folding_Bt_Type={ Folding_Bt_Prepayment } />
                { is_folding_Prepayment && <div className="m_Bottom_100"> <Advance_Receipt_Table data={ data_Obj.plan_Data } /> </div> }


                { /* 住宿 + 安親 */ }
                <Section_Title_Bar tag_Color='is-success' service_Type='住宿安親' amount_Type='應收款' amount_Total={ total_Obj.Lodge_Receivable  } Folding_Bt_Type={ Folding_Bt_LodgeCare } />
                { is_folding_LodgeCare && <div className="m_Bottom_100"> <Lodge_Receivable_Table data={ data_Obj.care_Lodge_Data } /> </div> }

           </>

} ;


export default CredictCard_Table_Content
       