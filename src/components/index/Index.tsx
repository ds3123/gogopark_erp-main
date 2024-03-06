/* eslint-disable react/jsx-pascal-case */

import Statistics_Rows from "components/index/components/Statistics_Rows" ;
import Customer_Confirm_Note from "./components/Customer_Confirm_Note" ;
import User_Info from "./components/User_Info" ;
import { useFetch_Services_By_ServiceDate_Polling_Today } from "hooks/react-query/service/useFetchServices" ;
import Shop_Status from "./Shop_Status" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;




const Index = () => {

    
    // 目前登入者，所屬商店 id    
    const shop_Id  = useAccount_Shop_Id() ; 


    // 取得 _ 特定帳號、今日 : 服務、客戶、寵物 ( 輪詢 : 每隔 2 秒更新 )
    const { data } = useFetch_Services_By_ServiceDate_Polling_Today( shop_Id ) ;



    return <div className = "is-hidden-mobile" >

                { /* 美容師請求櫃台確認訊息 */ }
                <Customer_Confirm_Note />

                { /* 帳號資訊 */ }
                <User_Info />

                { /* 今日來店、今日統計 */ }
                <Statistics_Rows data = { data } /> 

                { /* 今日服務 _ 各階段狀態 */ }
                <Shop_Status data = { data } />
                
           </div>

} ;

export default Index