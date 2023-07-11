/* eslint-disable react/jsx-pascal-case */


import { FC } from 'react' ;
import { useDispatch } from 'react-redux' ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import Appointment_Record from "components/index/list/Appointment_Record" ;
import { 
         get_ServiceOrder_AppointmentNum_Basic ,
         get_ServiceOrder_AppointmentNum_Bath ,
         get_ServiceOrder_AppointmentNum_Beauty ,
         get_ServiceOrder_OnSiteNum_Basic ,
         get_ServiceOrder_OnSiteNum_Bath ,
         get_ServiceOrder_OnSiteNum_Beauty ,
       } from "fp/services/read/get_Statistic" ;



type Appointment = {

    data : any 
}       



// # 今日預約
export const Today_Appointment : FC< Appointment >= ( { data } ) => {

    const dispatch = useDispatch();


    // 顯示 _ 預約紀錄
    const click_Appointments_List = () => dispatch( set_Side_Panel( true , <Appointment_Record /> , {} ) ) ;


    // 預約數 
    const a_Basic  = get_ServiceOrder_AppointmentNum_Basic( data ) ;
    const a_Bath   = get_ServiceOrder_AppointmentNum_Bath( data ) ;
    const a_Beauty = get_ServiceOrder_AppointmentNum_Beauty( data ) ;

    // 現場
    const s_Basic  = get_ServiceOrder_OnSiteNum_Basic( data ) ;
    const s_Bath   = get_ServiceOrder_OnSiteNum_Bath( data ) ;
    const s_Beauty = get_ServiceOrder_OnSiteNum_Beauty( data ) ;


    const slash = <span className = "m_Right_20 f_18" style = {{ color:"rgba(0,0,0,.2)" }}> / </span> ;

    return <div className = "tags has-addons" >

             <b className = "tag is-large is-primary" > <i className = "fas fa-phone" ></i> &nbsp; 今日預約 </b>

             <span className="tag is-large is-light">
        
                基礎 : &nbsp; <b className='fDred m_Right_20'> { a_Basic }  </b>  
                
                { s_Basic > 0 &&
                    <span className="m_Right_20 f_12">
                        ( 現場 + <b className="fBlue"> { s_Basic } </b> )
                    </span> 
                }

                { slash } 

                洗澡 : &nbsp; <b className='fDred m_Right_20'> { a_Bath }   </b> 

                { s_Bath > 0 &&
                    <span className="m_Right_20 f_12">
                        ( 現場 + <b className="fBlue"> { s_Bath } </b> )
                    </span> 
                }

                { slash } 

                美容 : &nbsp; <b className='fDred m_Right_20'> { a_Beauty } </b> 

                { s_Beauty > 0 &&
                    <span className="m_Right_20 f_12">
                        ( 現場 + <b className="fBlue"> { s_Beauty } </b> )
                    </span> 
                }
            
             </span>

             <span className = "tag is-primary is-large is-light pointer" onClick = { click_Appointments_List } >

                <i className = "fas fa-list"></i> &nbsp; 預約紀錄 &nbsp;
                <b className = "tag is-medium is-white relative" style={{ top:"4px" }} >
                    洗澡 + 美容 &nbsp; : &nbsp;
                    <span className='fRed f_14'> { a_Bath + a_Beauty } </span>
                </b>
                
             </span>

           </div>

} ;