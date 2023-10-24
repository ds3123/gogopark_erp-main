/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { FC , useState , useEffect } from 'react' ;
import Nav_Info from 'components/management/finance/components/Nav_Info' ;
import Title_Folder from "./components/Title_Folder" ; 
import Service_Receivable_Table from "components/management/finance/components/Service_Receivable_Table"
import Deduct_Advance_Receipt_Table from "components/management/finance/components/Deduct_Advance_Receipt_Table"
import Advance_Receipt_Table from "components/management/finance/components/Advance_Receipt_Table"
import Lodge_Receivable_Table from "components/management/finance/components/Lodge_Receivable_Table"
import Other_Cash_Income_Table from "components/management/finance/components/Other_Cash_Income_Table"
import Other_Cash_Expenditure_Table from "components/management/finance/components/Other_Cash_Expenditure_Table"
import { useFinance_Get_Section_Data } from 'hooks/data/useFinance' ;
import { useFinance_Section_Total } from 'hooks/data/useFinance' ;
import { useSelector } from "react-redux";
import { useEffect_Get_UsePlan_Amount_Total } from './hooks/useEffect_Get_UsePlan_Amount_Total';


// @ 現金績效報表
const CashPerformance_Report : FC = () => {

   
   // 所查詢 _ 報表日期
   const query_Date = useSelector( ( state : any ) => state.Info.service_Date ) ; 

    
   // 取得 _ 各區塊資料 ( 依查詢日期：付款日期 / 到店日期 )
   const data_Obj  = useFinance_Get_Section_Data( '綜合' ) ;

   // 總計金額
   const totol_Sum = useFinance_Section_Total( data_Obj ) ;

   // 取得 _ 各區塊小計                   
   const total_Obj = useFinance_Section_Total( data_Obj ) ; 


   // 洗澡美容：扣 _ 預收款 總計金額
   // const usePlan_Total = useEffect_Get_UsePlan_Amount_Total( query_Date ) ;
   const usePlan_Total = undefined ;

  return <div className = "m_Bottom_200" >

            { /* 導覽區域 ( 報表日期、總計金額 )  */ }
            <Nav_Info total_Amount = { totol_Sum }  />
           
            <div className = "relative" > 
              <b className = "absolute f_16" style = {{ right : "230px" , top : "-40px" }} > 收入金額 </b>
              <b className = "absolute f_16" style = {{ right : "80px" , top : "-40px" }}  > 支出金額 </b>
            </div>
            
            <hr className = "m_Bottom_40" />
           
            { /* 各區塊收支表 */ }
            <Title_Folder tag_Color = "is-success" service_Type = "洗澡美容" amount_Type = "應收款" amount_Total = { total_Obj.Service_Receivable + total_Obj.Extra_Fee }  >
                <Service_Receivable_Table data = { data_Obj.service_Data.concat( data_Obj.extra_Fee_By_PaymentDate ) } />
            </Title_Folder>

            <Title_Folder tag_Color = "is-warning" service_Type = "洗澡美容" amount_Type = "扣 _ 預收款" amount_Total = { usePlan_Total }  >
                <Deduct_Advance_Receipt_Table  />
            </Title_Folder>

            <Title_Folder tag_Color = "is-warning" service_Type = "洗澡美容" amount_Type = "預收款" amount_Total = { total_Obj.Advance_Receipt  }  >
                <Advance_Receipt_Table data = { data_Obj.plan_Data } />
            </Title_Folder>

            <Title_Folder tag_Color = "is-success" service_Type = "住宿安親" amount_Type = "應收款" amount_Total = { total_Obj.Lodge_Receivable }  >
                <Lodge_Receivable_Table data = { data_Obj.care_Lodge_Data } />
            </Title_Folder>

            <Title_Folder tag_Color = "is-link" service_Type = "其 他" amount_Type = "收 入" amount_Total = { total_Obj.Cash_Income }  >
                <Other_Cash_Income_Table data = { data_Obj.others_By_Date  } />
            </Title_Folder>

            <Title_Folder tag_Color = "is-link" service_Type = "其 他" amount_Type = "支 出" amount_Total = { total_Obj.Cash_Expenditure }  >
                <Other_Cash_Expenditure_Table data = { data_Obj.others_By_Date } />
            </Title_Folder>
             
         </div>
} ;

export default CashPerformance_Report   
