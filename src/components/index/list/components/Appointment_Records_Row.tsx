
import { FC } from 'react' ;
import { useEffect_Cick_Check_Service } from "../../hooks/useEffect_Appointment_Record" ;
import { string_Short } from "utils/string/edit_string" ;
import useServiceType from "hooks/layout/useServiceType";
import { useDispatch } from 'react-redux' ;
import { useHistory } from "react-router" ;
import { switch_Appointment_Status  } from "store/actions/action_Service" ;
import { get_ServiceOrderId } from "fp/services/read/get_ServiceOrder" ;


type Record = {

  record : any ;

}


// # 預約記錄 _ 列
export const Appointment_Records_Row : FC< Record >  = ( { record } ) => {

    const dispatch = useDispatch() ; 
    const history  = useHistory() ;


    // 點選 _ 檢視服務
    const click_Service   = useEffect_Cick_Check_Service() ;

    // 取得 : 資料類型樣式
    const get_ServiceType = useServiceType( null , true , 'medium' ) ;

    // 切換 _ 預約狀態
    const click_Switch_Status = ( data : any ) => dispatch( switch_Appointment_Status( data , '到店等候中' , history ) ) ;


    // -----------------


    // * 基本資訊
    const q_Code         = record[ 'q_code' ] ;         // Q code
    const is_Delete      = record[ 'is_delete' ] ;      // 是否刪除
    const created_At     = record[ 'created_at' ] ;     // 建檔日期

    // * 服務單
    const service_Type   = record[ 'service_type' ] ;   // 服務類型 ( Ex. 洗澡、美容 )
    const service_Status = record[ 'service_status' ] ; // 服務狀態 ( Ex. 已到店、預約_今天、預約_未來 )
    const shop_Status    = record[ 'shop_status' ] ;    // 到店狀態 ( Ex. 到店等候中、到店美容中、洗完等候中、已回家 ( 房 ) )

    // * 付款
    const payment_Method = record[ 'payment_Method' ] ; // 付款方式
    const amount_Payable = record[ 'amount_payable'] ;  // 應付金額
    const amount_Paid    = record[ 'amount_paid'] ;     // 已付金額

    // * 寵物
    const pet_Name        = record['pet']['name'] ;
    const pet_Species     = record['pet']['species'] ;

    // * 客人
    const customer_Name   = record['customer']['name'] ;
    const customer_Mobile = record['customer']['mobile_phone'] ;

    // * 作業人員
    const admin_User      = record['admin_user'] ;



    return <tr className = "f_11" >

                <td className="relative">

                    { is_Delete === 1 && <b className="absolute fRed" style = {{ top:"13px" , left:"-10px" }} >  <i className="fas fa-trash-alt"></i> </b> }

                    <b className = { get_ServiceType( service_Type , true , service_Status )['color']  }  onClick={ () => click_Service( record ) } >
                        <i className = { get_ServiceType( service_Type , true , service_Status )['icon'] } ></i> &nbsp; { service_Type }
                        &nbsp; Q{ q_Code } ( { get_ServiceOrderId( record ) } )
                    </b>
                
                </td>
                <td> 
                    { shop_Status === '尚未到店' && <b className = "fDred f_11">  { shop_Status } </b> }
                    { shop_Status === '尚未到店' || <b className = "fDblue f_11"> { shop_Status } </b> }
                </td>
                <td> 
                    { /* 應付金額 */ }   
                    { payment_Method === "方案" ? "方案" : amount_Payable }  
                </td>     
                <td> 
                    { /* 已付金額 */ } 
                    { amount_Payable !== amount_Paid ? <b className="fRed"> { amount_Paid }</b> : <span> { amount_Paid } </span>  }
                </td>     
                <td>
                    { ( shop_Status === '尚未到店' && is_Delete === 0 ) &&
                        <b className="tag is-medium pointer" onClick = { () => click_Switch_Status( record ) } > 轉 : 到店等候中 </b>   
                    }
                </td>
                <td className="td_Left">
                    { string_Short( pet_Name , 3 ) } ( { string_Short( pet_Species , 3 ) } ) 
                </td>
                <td> { customer_Name }                                                </td>
                <td> { customer_Mobile }                                              </td>
                <td> { admin_User === '測試員' ? '店長' : admin_User }  { /* 再確認 */ } </td>
                <td> { created_At ? created_At.slice( 5 , 16 ) : '' }                  </td>

            </tr>

    




} ;