/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import Check_Lodge_Button from "components/lodge/components/Check_Lodge_Button" ;
import { useFetch_Services_By_ServiceDate_Polling_Today } from "hooks/react-query/service/useFetchServices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { Today_Appointment } from "./Today_Appointment" ;
import { Today_Statistic } from "./Today_Statistic" ;



/* @ 今日預約、今日統計 */
const Statistics_Rows = () => {

    // 目前登入者，所屬商店 id    
    const shop_Id  = useAccount_Shop_Id() ; 

    // 取得 _ 特定店家帳號、今日 : 服務、客戶、寵物 ( 輪詢 : 每隔 2 秒更新 )
    const { data : pet_Arr } = useFetch_Services_By_ServiceDate_Polling_Today( shop_Id ) ;
   
         
    return <>
               { /* 點選 _ 檢視住宿情形  */ }
               <b className="absolute" style={{ top : "200px" , right : "-11%" }}> <Check_Lodge_Button /> </b>

               <div className="columns is-mobile  is-multiline relative" style={ { top : "80px" , left : "-5%" } } >

                  { /* 今日預約 */ }
                  <div className="column is-12-desktop" >

                       <Today_Appointment data = { pet_Arr } />                    
 
                  </div>

                  { /* 今日統計 */ }
                  <div className="column is-12-desktop relative" style={{ zIndex:1 } as any}>

                       <Today_Statistic data = { pet_Arr } />

                  </div>

               </div>
          </>

} ;

export default Statistics_Rows ;