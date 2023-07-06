/* eslint-disable react/jsx-pascal-case */

import Statistics_Rows from "components/index/components/Statistics_Rows"
import Status_Cards from "components/index/Status_Cards";
import useShopStatus_Sum from "hooks/data/useShopStatus_Sum" ;
import Customer_Confirm_Note from "./components/Customer_Confirm_Note" ;
import User_Info from "./components/User_Info" ;
import cookie from 'react-cookies' ;

import { useFetch_Services_By_ServiceDate_Polling_Today } from "hooks/react-query/service/useFetchServices";

import { useEffect_Is_Detail_Mode } from "components/index/hooks/useEffect_Index" ;



const Index = () => {

   
    // 首頁詳細模式 ( 展開所有統計資料 )
    const { is_Detail_Mode } = useEffect_Is_Detail_Mode() ;

    // 取得 _ 特定帳號、今日 : 服務、客戶、寵物 ( 輪詢 : 每隔 2 秒更新 )
    const _cookie  = cookie.load( 'userInfo' ) ;
    const { data : pet_Arr , isError }   = useFetch_Services_By_ServiceDate_Polling_Today( _cookie?.account_id ) ;


    // 到店個階段，基礎、洗澡、美容數量
    const numObj_1 = useShopStatus_Sum( "到店等候中"   , pet_Arr ) ;
    const numObj_2 = useShopStatus_Sum( "到店美容中"   , pet_Arr ) ;
    const numObj_3 = useShopStatus_Sum( "洗完等候中"   , pet_Arr ) ;
    const numObj_4 = useShopStatus_Sum( "已回家( 房 )" , pet_Arr ) ;


    const card = { padding : "5px" } ;

    return <div className="is-hidden-mobile">

                { /* 美容師請求櫃台確認訊息 */ }
                <Customer_Confirm_Note />

                { /*  帳號資訊  */ }
                <User_Info />

                { /* 今日來店、今日統計 */ }
                { is_Detail_Mode &&  <Statistics_Rows /> }

              
                {/* 今日服務 _ 各階段狀態  */}
                <div className="columns is-mobile is-multiline relative m_Top_150 m_Bottom_50" style={{ width:"110%" , left:"-4%" }} >

                    {/* 到店等候中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr }  shop_Status = "到店等候中"  service_Sum = { numObj_1 } />
                    </div>

                    {/* 到店美容中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr }  shop_Status = "到店美容中" service_Sum = { numObj_2 } />
                    </div>

                    {/* 洗完等候中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr } shop_Status = "洗完等候中" service_Sum = { numObj_3 } />
                    </div>

                    {/* 已回家 ( 房 ) */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr } shop_Status = "已回家( 房 )" service_Sum = { numObj_4 } />
                    </div>

                </div> 

                    
           </div>

};

export default Index