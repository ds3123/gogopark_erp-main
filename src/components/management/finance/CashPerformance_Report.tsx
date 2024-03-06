/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { FC , useMemo } from 'react' 
import Nav_Info from 'components/management/finance/components/Nav_Info' 
import Title_Folder from "./components/Title_Folder"  
import Service_Receivable_Table from "components/management/finance/components/Service_Receivable_Table"
import Deduct_Advance_Receipt_Table from "components/management/finance/components/Deduct_Advance_Receipt_Table"
import Advance_Receipt_Table from "components/management/finance/components/Advance_Receipt_Table"
import Lodge_Receivable_Table from "components/management/finance/components/Lodge_Receivable_Table"
import Other_Cash_Income_Table from "components/management/finance/components/Other_Cash_Income_Table"
import Other_Cash_Expenditure_Table from "components/management/finance/components/Other_Cash_Expenditure_Table"
import { useFinance_Get_Section_Data } from 'hooks/data/useFinance' 
import { useFinance_Section_Total } from 'hooks/data/useFinance' 
import { useSelector } from "react-redux"
import { useEffect_Get_UsePlan_ServiceAmount_Total , useEffect_Get_UsePlan_Data } from './hooks/useEffect_UsePlan'
import { useAccount_Shop_Id } from 'hooks/data/useAccount'
import { useEffect_Get_Advance_Receipt_Data } from "./hooks/useEffect_Advance_Receipt_Services" 
import { useEffect_Get_Other_Data } from "./hooks/useEffect_Others"
import { useEffect_Get_Services_By_PaymentDate } from "./hooks/useEffect_Services_By_PaymentDate"
import { useEffect_Is_Fetching_Status , useEffect_Set_Is_Downloading  } from "./hooks/useEffect_Handle_DataFetching"
import { 
         get_Amount_Paid_Total , 
         get_Other_Total , 
         get_Pickup_Fee_Total ,
         get_Lodge_BathFee_Total , 
         get_Lodge_BeautyFee_Total
        } from 'fp/management/finance/service/get_Finance_Services'




// @ 現金績效報表
const CashPerformance_Report : FC = () => {



   // 所屬店家 id
   const shop_Id    = useAccount_Shop_Id() ; 
   
   // 所查詢 _ 報表日期
   const query_Date = useSelector( ( state : any ) => state.Info.service_Date ) ; 
    

   // 取得 _ 各區塊資料 ( 依查詢日期：付款日期 / 到店日期 )
   // const data_Obj = useFinance_Get_Section_Data( '綜合' ) ;
   

   // 各區塊資料取得狀態，是否已完成
   const { 
          is_Fetching_Service_Receivable_Done ,     // 洗澡美容：應收
          is_Fetching_Deduct_Advance_Receipt_Done , // 洗澡美容：扣 _ 預收款
          is_Fetching_Advance_Receipt_Done ,        // 洗澡美容：預收款
          is_Fetching_Lodge_Receivable_Done         // 住宿安親：應收款
         } = useEffect_Is_Fetching_Status() ;
   

   // ---------------------------------


   // 取得資料 _ < 洗澡美容：應收款 > ＆ < 住宿安親：應收款 >    
   const { service_Receivable_Data , lodgeCare_Receivable_Data } = useEffect_Get_Services_By_PaymentDate( shop_Id , query_Date ) ;


   // # 洗澡美容 : 應收款
   const serviceReveivable_Total        = useMemo( () => get_Amount_Paid_Total( service_Receivable_Data ) , [ service_Receivable_Data ] ) ; // 小計
   const serviceReveivable_Pickup_Total = useMemo( () => get_Pickup_Fee_Total( service_Receivable_Data ) , [ service_Receivable_Data ] ) ;  // 小計 ( 接送費 )


   // ＃ 洗澡美容 : 扣 _ 預收款 
   const usePlan_Data           = useEffect_Get_UsePlan_Data( shop_Id , query_Date ) ;                     // 資料
   const usePlan_Total          = useEffect_Get_UsePlan_ServiceAmount_Total( usePlan_Data , query_Date ) ; // 小計


   // # 洗澡美容 : 預收款
   const advanceReceipt_Data    = useEffect_Get_Advance_Receipt_Data( shop_Id , query_Date ) ;   // 資料
   const advanceReceipt_Total   = useMemo( () => get_Amount_Paid_Total( advanceReceipt_Data ) , [ advanceReceipt_Data ] ) ; // 小計


   // # 住宿安親：應收款
   const lodgeCare_Total        = useMemo( () => get_Amount_Paid_Total( lodgeCare_Receivable_Data ) , [ lodgeCare_Receivable_Data ] )  ;     // 小計
   const lodgeCare_Bath_Total   = useMemo( () => get_Lodge_BathFee_Total( lodgeCare_Receivable_Data ) , [ lodgeCare_Receivable_Data ] )  ;   // 小計 ( 洗澡費 )
   const lodgeCare_Beauty_Total = useMemo( () => get_Lodge_BeautyFee_Total( lodgeCare_Receivable_Data ) , [ lodgeCare_Receivable_Data ] )  ; // 小計 ( 美容費 )
   const lodgeCare_Pickup_Total = useMemo( () => get_Pickup_Fee_Total( lodgeCare_Receivable_Data ) , [ lodgeCare_Receivable_Data ] )  ;      // 小計 ( 接送費 )


   // # 其他
   const { income , expenditure } = useEffect_Get_Other_Data( shop_Id , query_Date ) ;                  // 資料 ( 收入 / 支出 )
   const income_Total             = useMemo( () => get_Other_Total( income ) , [ income ] ) ;           // 小計 ( 收入 )
   const expenditure_Total        = useMemo( () => get_Other_Total( expenditure ) , [ expenditure ] ) ; // 小計 ( 支出 )


   // 下載圖示
   const downloadIcon = <button className = "button is-loading is-white relative" style = {{ top : "-5px" }} ></button> ; 


   // 變換 _ 查詢日期時，先顯示：下載中圖示
   useEffect_Set_Is_Downloading( query_Date ) ;  



  return <div className = "m_Bottom_200" >

            { /* 導覽區域 ( 報表日期、總計金額 )  */ }
            <Nav_Info serviceReveivable_Total = { serviceReveivable_Total }  
                      usePlan_Total           = { usePlan_Total }
                      advanceReceipt_Total    = { advanceReceipt_Total }
                      lodgeCare_Total         = { lodgeCare_Total }
                      income_Total            = { income_Total }
                      expenditure_Total       = { expenditure_Total } />
           
            <div className = "relative" > 
              <b className = "absolute f_16" style = {{ right : "230px" , top : "-40px" }} > 收入金額 </b>
              <b className = "absolute f_16" style = {{ right : "80px" , top : "-40px" }}  > 支出金額 </b>
            </div>
            
            <hr className = "m_Bottom_80" />
           
            { /*  洗澡美容：應收款  */ }
            <Title_Folder tag_Color    = "is-success" 
                          service_Type = "洗澡美容" 
                          amount_Type  = "應收款" 
                          amount_Total = { !is_Fetching_Service_Receivable_Done ? downloadIcon : serviceReveivable_Total } 
                          pickup_Total = { serviceReveivable_Pickup_Total }  >
            
                <Service_Receivable_Table data = { service_Receivable_Data } />
            
            </Title_Folder>

            <br/>  

            { /* 洗澡美容：扣 _ 預收款 */ }
            <Title_Folder tag_Color    = "is-warning" 
                          service_Type = "洗澡美容" 
                          amount_Type  = "扣 _ 預收款"
                          amount_Total = {  !is_Fetching_Deduct_Advance_Receipt_Done ? downloadIcon : usePlan_Total  } >

                <Deduct_Advance_Receipt_Table data = { usePlan_Data } />

            </Title_Folder>

            <br/>  

            { /* 洗澡美容：預收款 */ }
            <Title_Folder tag_Color    = "is-warning" 
                          service_Type = "洗澡美容" 
                          amount_Type  = "預收款" 
                          amount_Total = { !is_Fetching_Advance_Receipt_Done ? downloadIcon : advanceReceipt_Total } >
            
                <Advance_Receipt_Table data = { advanceReceipt_Data } />
            
            </Title_Folder>

            <br/> <br/> 

            { /* 住宿安親：應收款 */ }
            <Title_Folder tag_Color          = "is-success" service_Type = "住宿安親" amount_Type = "應收款" 
                          amount_Total       = { !is_Fetching_Lodge_Receivable_Done ? downloadIcon : lodgeCare_Total } 
                          pickup_Total       = { lodgeCare_Pickup_Total } 
                          lodge_Bath_Total   = { lodgeCare_Bath_Total }
                          lodge_Beauty_Total = { lodgeCare_Beauty_Total } >

                <Lodge_Receivable_Table data = { lodgeCare_Receivable_Data } />

            </Title_Folder>

            <br/> 

            { /* 其他：收入 */ }
            <Title_Folder tag_Color    = "is-link" 
                          service_Type = "其 他" 
                          amount_Type  = "收 入" 
                          amount_Total = { income_Total }  >
           
                <Other_Cash_Income_Table data = { income } />
           
            </Title_Folder>

            { /* 其他：支出 */ }
            <Title_Folder tag_Color    = "is-link" 
                          service_Type = "其 他" 
                          amount_Type  = "支 出" 
                          amount_Total = { expenditure_Total }  >
             
                <Other_Cash_Expenditure_Table data = { expenditure } />
            
            </Title_Folder>
             
         </div>
} ;

export default CashPerformance_Report   
