/* eslint-disable react/jsx-pascal-case */
import Nav_Info from 'components/management/finance/components/Nav_Info'
import CredictCard_Table_Content from "./components/CredictCard_Table_Content"
import { useFinance_Get_Section_Data , useFinance_Section_Total } from 'hooks/data/useFinance'



// @ 信用卡支付報表
const CreditCard_Report = () => {

   
    // 取得 _ 各區塊資料 ( 依查詢日期：付款日期 / 到店日期 )
    const data_Obj  = useFinance_Get_Section_Data( '信用卡' ) ;

  
    // 總計金額
    const totol_Sum = useFinance_Section_Total( data_Obj ) ;



    return <div className="m_Bottom_200" >

                { /*  導覽區域 ( 報表日期、總計金額 )  */ }
                <Nav_Info total_Amount = { totol_Sum } />

                { /*  各區塊表單內容 */ }
                <CredictCard_Table_Content data_Obj = { data_Obj } />
    
           </div> 

} ;

export default CreditCard_Report
       