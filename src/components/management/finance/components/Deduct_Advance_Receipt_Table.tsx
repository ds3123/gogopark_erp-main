/* eslint-disable react/jsx-pascal-case */
import { FC , useState } from 'react' ;
import { useSelector } from "react-redux";
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useFetch_Services_By_ServiceDate } from "hooks/react-query/service/useFetchServices" 
import { get_Finance_Plan_Services } from "fp/management/finance/plan/get_Plan_Services";
import Deduct_Advance_Receipt_Table_Row from "./sub_components/Deduct_Advance_Receipt_Table_Row"; 
import { sort_ObjAttr } from 'fp/tool';





// @ 表單 : 扣 _ 預收款 ( 洗澡、美容 )
const Deduct_Advance_Receipt_Table : FC = () => {

    
    const shop_Id    = useAccount_Shop_Id() ;


    // 所查詢 _ 報表日期
    const query_Date = useSelector( ( state : any ) => state.Info.service_Date ) ; 
    
    // 特定到店日期，所有服務 ( 基礎、洗澡、美容、安親、住宿 )
    const services_By_ServiceDate = useFetch_Services_By_ServiceDate( shop_Id , query_Date ) ; 

    // 取得 _ 付款方式為「 方案 」的 洗澡單 或 美容單 ( 排除 _ 銷單 )
    const plan_Servcies  = get_Finance_Plan_Services( services_By_ServiceDate ) ;

    // 依照 q_code 排序
    const _plan_Servcies = sort_ObjAttr( 'q_code' , 'asc' )( plan_Servcies ) ;


   return <table className = "table is-fullwidth is-hoverable m_Bottom_100" >

                <thead>

                    <tr>
                        <th> 項 目   </th>
                        <th> 寵物資訊 </th> 
                        <th> 到店日期 </th>
                        <th> 付款方式 </th>
                        <th> 方案價格 </th>
                        <th> 調整金額 </th>
                        <th> 接送費用 </th>
                        <th> 實收金額 </th>
                        {/* <th> 總計金額 </th> */}
                        <th> <span className = "fDblue" > 此次方案使用金額 </span> </th>
                    </tr>
                    
                </thead>

                <tbody>

                  { _plan_Servcies.map( ( x : any , y : any ) =>
                         <Deduct_Advance_Receipt_Table_Row key = { y } data = { x } /> ) }

                </tbody>

            </table>
                  
} ;

export default Deduct_Advance_Receipt_Table
       