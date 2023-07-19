/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-lone-blocks */

import { useSelector } from "react-redux";
import Date_Picker from "templates/form/Date_Picker";
import { useForm } from "react-hook-form" ;
import { IService } from "utils/Interface_Type" ;
import { useEffect_Handle_Today_Reservation } from "../hooks/useEffect_Appointment_Record" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useFetch_Shop_Reservations_From_ServiceDate } from "hooks/react-query/service/useFetchServices" ;
import { Appointment_Records_Row } from "./components/Appointment_Records_Row"



// @ 預約紀錄 
const Appointment_Records = () => {


    // 登入者所屬商店 id
    const shop_Id           = useAccount_Shop_Id() ;

    // React Hook Form
    const { control }       = useForm<IService>({ mode : "all" }) ;

    // Data_Picker 查詢日期 : 預設今日
    const service_Date      = useSelector( ( state : any ) => state.Info.service_Date ) ;


    // 取得 : 從 DataPicker 目前日期起，所有【 預約 】資料
    const raw_Reservation   = useFetch_Shop_Reservations_From_ServiceDate( shop_Id , service_Date ) ;

    // 今日預約來店
    const reservation_Today = useEffect_Handle_Today_Reservation( raw_Reservation , service_Date ) ;


    

    return <>  

              <b className="tag is-large is-primary is-light m_Bottom_30">
                 <i className="fas fa-list"></i> &nbsp; 今日預約來店 &nbsp;
                 <b className="tag is-medium is-white is-rounded"> { reservation_Today.length } </b>
              </b>

              { /* 查詢日期 */ } 
              <div className="columns is-multiline is-mobile relative m_Bottom_50">

                  <div className="column is-3-desktop">

                      <b className="f_14"> 查詢 : 預約日期 </b>
                      <Date_Picker control={control} name="service_Date" default_Date={new Date()}/>

                  </div>

              </div>

              <table className="table is-fullwidth is-hoverable">

                  <thead>
                      <tr className="f_12">
                        <th> 預約類別  </th>
                        <th> 預約狀態  </th>
                        <th className="relative" style={{ width:"80px" }} > 應付 </th>
                        <th> 已付     </th> 
                        <th> 狀態調整 </th>
                        <th> 寵物資訊 </th>
                        <th> 主人     </th>
                        <th> 手機     </th>
                        <th> 經手     </th>
                        <th> 預約建檔 </th>
                      </tr>
                  </thead>
                  <tbody>

                    { reservation_Today.map( ( x : any , y ) => <Appointment_Records_Row key = { y } record = { x } /> )}

                  </tbody>

              </table>

           </>

} ;

export default Appointment_Records