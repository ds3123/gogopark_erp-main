/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import { Edit_Form_Type } from "utils/Interface_Type" ;
import { useSelector } from "react-redux" ;
import Qcode_Select_Options from "components/services/edit_components/Qcode_Select_Options" ;
import useSection_Folding from "hooks/layout/useSection_Folding" ;
import Date_Picker from "templates/form/Date_Picker" ;
import Time_Picker from "templates/form/Time_Picker" ;
import "react-datepicker/dist/react-datepicker.css" ;
import 'antd/dist/antd.css' ;
import { useEffect_Set_ServiceStatus , useEffect_Set_Redux_ServiceStatus , useEffect_Set_CurrentTime } from "../hooks/useEffect_Service_Info" ;
import { get_H_M } from "utils/time/time" ;
import { is_ServiceStatus_Appointment_TodayFuture } from 'fp/state' ;
import { get_ServiceOrder_LeaveTime , get_ServiceOrder_ArrivedTime } from 'fp/services/read/get_ServiceOrder' ;

import { is_Update } from 'fp/common/condition/edit_mode';
import { EditType } from 'utils/custom_types/form';


// 各表單驗證條件

/*
*
*  @ 資料狀態 ( shop_status ) 共有 7 種 ( 服務_類型的 "已到店 "，與到店_類型的 "到店等候中"，相同 ) ~
*
*     # 服務 _ 類型 ( service_Status ， 3 種 ) : 已到店、預約_今天、預約_未來
*     # 到店 _ 類型 ( shop_Status ,     5 種 ) : 尚未到店、到店等候中、到店美容中、洗完等候中、已回家( 房 )
*
*/


// for 編輯
interface IInfo extends Edit_Form_Type {
    editType?    : EditType | string  ;
    serviceData? : any ;
}


const way   = { fontSize : "11pt" , top : "-2px" , fontWeight : "bold" } ;
const green = { color : "rgb(30,180,30)" } ;
const blue  = { color : "rgb(30,30,180)" } ;


type C_Button = {

    is_CurrentTime_Column : string ;

    columnName            : string ;
    callBack              : ( columnName : string ) => void ;

}


// 設定 _ 時間按鈕
export const Set_CurrenTime_Button : FC< C_Button > = ( { is_CurrentTime_Column , callBack , columnName }  ) =>   

                <b className = { `pointer m_Left_10 ${ is_CurrentTime_Column === columnName ? "tag is-large is-success" : "tag is-large hover" }` }  
                    onClick  = { () => callBack( columnName ) } > 

                    <i className = "far fa-clock" ></i> 

                </b> ;


/* 服務單( 基礎、洗澡、美容 ) _ 基本資訊 */
const Service_Info = ( { register , setValue , control , editType , serviceData } : IInfo ) => { 


    // 到店日期( 預設 : 今日 )
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ; 


    // 設定 _ 服務狀態 ( serviceStutus )
    const { serviceStatus , click_Appoint_Today , click_Arrive_Shop } = useEffect_Set_ServiceStatus( editType as EditType , service_Date , setValue ) ;


    // 設定 _ Redux Store : 服務狀態 ( serviceStutus ) --> 供 Data_Obj_Extra_Props.tsx 追加 data 物件新屬性 ( 判斷此服務單為 : 已到店 / 預約_今天 / 預約_未來 )
    useEffect_Set_Redux_ServiceStatus( serviceStatus ) ;

    const is_Arrived_Today         = serviceStatus.is_Arrived_Today ;            // 已到店 
    const is_Appointed_Today       = serviceStatus.is_Appointed_Today ;          // 預約_今天
    const is_Appointed_Future      = serviceStatus.is_Appointed_Future ;         // 預約_未來
    const is_Appointed_TodayFuture = is_Appointed_Today || is_Appointed_Future ; // 預約_今天 or 預約_未來


    // 為預約服務單 ( for 編輯 )
    const is_Update_Appointment = is_ServiceStatus_Appointment_TodayFuture( serviceData ) ;


    // 點選 _ 設定現在時間
    const { is_CurrentTime_Column , click_Set_CurrentTime } = useEffect_Set_CurrentTime( setValue , get_H_M() ) ;


    // 預設時間
    const default_Time = "00:00" ;

    
    // 收折區塊
    const { is_folding , Folding_Bt } = useSection_Folding( false ) ; 


    return <>

              { /* 標題、收折鈕 */ }
              <label className="label relative" style={{ fontSize : "1.3em" }} >
                <i className="fas fa-file-alt"></i> &nbsp; 基本資料 &nbsp;
                { Folding_Bt }  
              </label> <br/>

              { /* 是否收折 : 基本資料 */ }
              { is_folding ||

                <div className="columns is-multiline is-mobile">

                    { /* 服務性質 : 已到店、預約 _ 今天、預約 _ 未來 */}
                    <div className="column is-4-desktop">

                        <div className="tag is-large is-white">

                            <span> 服務性質 : </span> &nbsp;

                            { /* for 新增  */ }
                            { !editType &&

                                <>

                                    { is_Arrived_Today &&
                                        <>
                                            <b style = { green } > 已到店 &nbsp; </b>
                                            <b className="tag is-medium pointer" onClick={click_Appoint_Today}> 預約 _ 今天 </b>
                                        </>
                                    }

                                    { is_Appointed_Today &&
                                        <>
                                            <b style = { green } > 預約 _ 今天 &nbsp; </b>
                                            <b className="tag is-medium pointer" onClick={click_Arrive_Shop}> 已到店 </b>
                                        </>
                                    }

                                    { is_Appointed_Future && <b style = { green } > 預約 _ 未來 &nbsp; </b> }

                                </>

                            }

                            { /* for 編輯 */ }
                            { editType && 
                             
                                <>
                                
                                    <b className="fDred m_Right_30"> 
                                       { serviceData['service_status'] === '已到店' ? '到 店' : '預 約' }
                                    </b>  
                                   
                                    { /* 調整 _ 到店狀態 */ }  
                                    <div className="select is-small relative is-link">

                                        <select {...register("appointment_Status")} style={way}>

                                            { is_Update_Appointment &&  <option value="尚未到店"> 尚未到店 </option> }
                                            <option value="到店等候中"> 到店等候中 </option>
                                            <option value="到店美容中"> 到店美容中 </option>
                                            <option value="洗完等候中"> 洗完等候中 </option>
                                            <option value="已回家( 房 )"> 已回家( 房 ) </option>

                                        </select>

                                    </div>

                                </>      
                                   
                            }
                           
                        </div>

                    </div>

                    { /* 到店日期 */}
                    <div className="column is-4-desktop">

                        <div className="tag is-large is-white">

                            <span> 到店日期 : </span> &nbsp;

                            { /* for 新增  */ }
                            { !editType &&  <Date_Picker control={control} name="service_Date" default_Date={ new Date() }/> } 

                            { /* for 編輯 */ }
                            { editType  &&  <b style={ blue } > { serviceData.service_date } </b> } 
                            {/* { editType  &&  <Date_Picker control={control} name="service_Date" /> }  */}

                        </div>

                    </div>

                    { /* Q 處理碼 */}
                    <div className="column is-4-desktop">

                        { /* for 新增  */ }
                        { !editType && <Qcode_Select_Options /> }

                        { /* for 編輯 */ }
                        { editType && <div className="tag is-large is-white">  <> 到店處理碼 :&nbsp;<b style={ blue }> Q{ serviceData.q_code } </b>  </> &nbsp; </div> } 
                      
                    </div>

                    { /* 預計到店時間 */}
                    { (
                        is_Appointed_Today   || 
                        is_Appointed_Future  || 
                        ( editType && !is_Arrived_Today ) ||  
                        ( editType && serviceData['service_status'] === '預約_今天' ) ||
                        ( editType && serviceData['service_status'] === '預約_未來' ) 
                      ) &&

                        <div className="column is-4-desktop relative">

                            <div className="tag is-large is-white">

                                <span> <span style={{color: "rgb(230,100,0)"}}> 預計</span>到店 : </span> &nbsp;

                                { /* for 新增 */ }
                                <Time_Picker name = "expected_Arrive" control = { control } default_Time = { default_Time }  /> 
                                
                                { !editType && <Set_CurrenTime_Button is_CurrentTime_Column = { is_CurrentTime_Column } callBack = { click_Set_CurrentTime } columnName = 'expected_Arrive' /> }

                                { /* for 編輯 */ }
                                { /* { editType === '編輯' && <b style={ blue }> { serviceData.expected_arrive } </b>  } */ }

                            </div>

                        </div>

                    }

                    { /* 實際到店時間 */}
                    { !is_Appointed_TodayFuture && 

                        <div className="column is-4-desktop relative">
                            <div className="tag is-large is-white">
                                <span> 實際到店 : </span> &nbsp;

                                { /* for 新增 */ }
                                {  !editType  &&
                                    <>
                                      <Time_Picker name = "actual_Arrive" control = { control } default_Time = { default_Time } /> 
                                      <Set_CurrenTime_Button is_CurrentTime_Column = { is_CurrentTime_Column } callBack = { click_Set_CurrentTime } columnName = 'actual_Arrive' />
                                    </>
                                }
                            

                                { /* for 編輯 */ }
                                { editType === '編輯' && <b style={ blue }> { get_ServiceOrder_ArrivedTime( serviceData ) } </b>  } 

                            </div>
                        </div>

                    }

                    { /* 期望離店時間 */}
                    <div className="column is-4-desktop relative">

                        <div className="tag is-large is-white" >

                            <span> 期望離店 : </span> &nbsp;

                            { /* for 新增 */ }
                            <Time_Picker name="expected_Leave" control = { control } default_Time = { default_Time } /> 

                            { /* for 編輯 */ }
                            { /* { editType === '編輯' && <b style={ blue } > { serviceData.expected_leave } </b>  } */ }

                        </div>

                    </div>

                    { /* 到店方式 */}
                    <div className="column is-4-desktop">

                        <div className="tag is-large is-white">

                            <span> 到店方式 : </span> &nbsp;

                            { /* for 新增 */ }
                            <div className="select is-small relative">
                                <select {...register("way_Arrive")} style={way}>
                                    <option value="主人送來"> 主人送來     </option>
                                    <option value="接送員接來"> 接送員接來 </option>
                                    <option value="住宿轉來"> 住宿轉來     </option>
                                </select>
                            </div>

                            { /* for 編輯 */ }
                            {/* { editType === '編輯' && <b style={ blue } > { serviceData.way_arrive } </b>  } */}

                        </div>

                    </div>


                    { /* 實際離店時間 */ }
                    { is_Update( editType as EditType ) &&  

                        <div className="column is-4-desktop relative">

                            <div className="tag is-large is-white" >

                                <span> 離店時間 : </span> &nbsp;

                                <b style = { blue } > 
                                
                                    { get_ServiceOrder_LeaveTime( serviceData ) }
                                     
                                </b>
                               
                            </div>

                        </div>

                    }

                    { /* 離店方式 */}
                    <div className="column is-4-desktop">

                        <div className="tag is-large is-white">

                            <span> 離店方式 : </span> &nbsp;

                            { /* for 新增 */ }
                            <div className="select is-small relative">
                                <select {...register("way_Leave")} style={way}>
                                  <option value="主人接走">   主人接走   </option>
                                  <option value="接送員接送"> 接送員接送  </option>
                                  <option value="轉回住宿">   轉回住宿   </option>
                                </select>
                            </div>

                            { /* for 編輯 */ }
                            {/* { editType === '編輯' && <b style={ blue } > { serviceData.way_leave } </b>  } */}

                        </div>

                    </div>

                </div>

              }

              <hr/> <br/>

           </>

};

export default Service_Info