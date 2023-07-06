/* eslint-disable react/jsx-pascal-case */

import Nav_Info from 'components/management/finance/components/Nav_Info'
import Cash_Table_Content from "./components/Cash_Table_Content"
import { useFinance_Get_Section_Data , useFinance_Section_Total } from 'hooks/data/useFinance'
import { nav_Total_Note_1 } from './components/Nav_Total_Note';



//  @ 現金帳報表  
const Cash_Report = () => {

    
       // 取得 _ 各區塊資料 ( 依查詢日期：付款日期 / 到店日期 )
       const data_Obj  = useFinance_Get_Section_Data( '現金' ) ;
            
       // 總計金額
       const totol_Sum = useFinance_Section_Total( data_Obj ) ;


       // 導覽區域，總計金額說明
       const nav_Total_Note = nav_Total_Note_1() ;
    
               
  return <div className="m_Bottom_200"> 

            { /* 導覽區域 ( 報表日期、總計金額 )  */ }
            <Nav_Info total_Amount = { totol_Sum.Sum_Total } total_Note = { nav_Total_Note }  />

            { /* 各區塊表單內容 */ }
            <Cash_Table_Content data_Obj = { data_Obj } />
      
         </div>

} ;

export default Cash_Report ;