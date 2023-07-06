/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-lone-blocks */

import useServiceType from "hooks/layout/useServiceType";
import { useDispatch , useSelector } from "react-redux";
import Date_Picker from "templates/form/Date_Picker";

// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;
import { IService } from "utils/Interface_Type" ;
import { useHistory } from "react-router" ;
import { switch_Appointment_Status  } from "store/actions/action_Service"
import { string_Short } from "utils/string/edit_string"

import { useEffect_Cick_Check_Service ,
         useEffect_Handle_Today_Reservation 
        } from "../hooks/useEffect_Appointment_Record" ;

import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useFetch_Shop_Reservations_From_ServiceDate } from "hooks/react-query/service/useFetchServices" ;



// @ 預約紀錄 
const Appointment_Records = ( ) => {


    const dispatch     = useDispatch() ;
    const history      = useHistory() ;

    // 登入者所屬商店 id
    const shop_Id      = useAccount_Shop_Id() ;

    // React Hook Form
    const { control }  = useForm<IService>({ mode : "all" }) ;

    // Data_Picker 查詢日期 : 預設今日
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;

    // 取得 : 資料類型樣式
    const get_ServiceType = useServiceType( null , true , 'medium' ) ;

    // 點選 _ 檢視服務
    const click_Service   = useEffect_Cick_Check_Service() ;

    // 切換 _ 預約狀態
    const click_Switch_Status = ( data : any ) => dispatch( switch_Appointment_Status( data , '到店等候中' , history ) ) ;


    // ------------------------------------------


    // 取得 : 從 DataPicker 目前日期起，所有【 預約 】資料
    const raw_Reservation     = useFetch_Shop_Reservations_From_ServiceDate( shop_Id , service_Date ) 

    // 今日預約來店
    const reservation_Today   = useEffect_Handle_Today_Reservation( raw_Reservation , service_Date ) ;


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

                    {

                        reservation_Today.map( ( x : any , y ) => {

                             const a_Payable      = x['amount_payable'] ; // 應付金額
                             const a_Paid         = x['amount_paid'] ;    // 已付金額
                             const payment_Method = x['payment_method'] ; // 付款方式 ( Ex. 現金 / 方案 )

                             const is_Deleted     = x['is_delete'] ;      // 已銷單


                             return <tr key={y} className="f_11">

                                       <td className="relative">

                                           { is_Deleted === 1 && 
                                                <b className="absolute fRed" style={{ top:"13px" , left:"-10px" }}> 
                                                   <i className="fas fa-trash-alt"></i>  
                                                </b> 
                                           }

                                           <b className = { get_ServiceType( x['service_type'] , true , x['service_status'] )['color']  }  onClick={ ( ) => click_Service( x ) } >
                                               <i className = { get_ServiceType( x['service_type'] , true , x['service_status'])['icon'] } ></i> &nbsp; { x['service_type'] }
                                               &nbsp; Q{ x['q_code'] }
                                           </b>
                                       
                                       </td>
                                       <td> 
                                           { x['shop_status'] === '尚未到店' && <b className="fDred f_11">  { x['shop_status'] } </b> }
                                           { x['shop_status'] === '尚未到店' || <b className="fDblue f_11"> { x['shop_status'] } </b> }
                                       </td>
                                       <td> 
                                            { /* 應付金額 */ }   
                                            { payment_Method === "方案" ? "方案" : a_Payable }  
                                       
                                       </td>     
                                       <td> 
                                            { /* 已付金額 */ } 
                                            { a_Payable !== a_Paid ? <b className="fRed"> { a_Paid }</b> : <span> { a_Paid } </span>  }
                                        
                                       </td>     
                                       <td>

                                           { x['shop_status'] === '尚未到店' &&
                                               <b className="tag is-medium pointer" onClick = { () => click_Switch_Status( x ) } > 轉 : 到店等候中 </b>   
                                           }

                                       </td>
                                       <td className="td_Left">
                                            { string_Short( x['pet']['name'] , 3 ) } ( { string_Short( x['pet']['species'] , 3 ) } ) 
                                       </td>
                                       <td> { x['customer']['name'] }                                  </td>
                                       <td> { x['customer']['mobile_phone'] }                          </td>
                                       <td> { x['admin_user'] === '測試員' ? '店長' : x['admin_user'] }                                        </td>
                                       <td> { x[ 'created_at' ] ? x[ 'created_at' ].slice(5,16) : '' } </td>

                                    </tr>

                       })
                    }

                  </tbody>

              </table>

           </>

} ;

export default Appointment_Records