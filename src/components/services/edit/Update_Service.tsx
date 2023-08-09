/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-lone-blocks */

import { useState , useEffect , useContext } from "react"

// Context
import { ReachHookFormContext } from "contexts/reactHookFormContext" ;


import { set_Modal } from "store/actions/action_Global_Layout" ;


// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form"

// 各表單驗證條件
import { schema_Customer } from "utils/validator/form_validator"
import { IService, Shop_Status  } from "utils/Interface_Type"
import { yupResolver } from "@hookform/resolvers/yup"

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel"

// 各區塊表單元件
import Service_Info from "components/services/edit_components/Service_Info"
import Customer_Note from "components/services/edit_components/Customer_Note"
import Basic_Form from "components/services/edit_components/Basic_Form"
import Bath_Form from "components/services/edit_components/Bath_Form"
import Beauty_Form from "components/services/edit_components/Beauty_Form"
import Extra_Beauty from "components/services/edit_components/Extra_Beauty"
import Extra_Item from "components/services/edit_components/Extra_Item"
import Pickup_Fee from "components/services//edit_components/Pickup_Fee"
import Summary_Fee from "components/services/edit_components/summary_fee/Summary_Fee"
import useServiceType from "hooks/layout/useServiceType"
import Lodge_Form from "components/lodge/edit/Lodge_Form"
import Care_Form from "components/lodge/care/edit/Care_Form"
import Nav_Qcode_List from "components/services/Nav_Qcode_List"
import Appointment_Records from "components/index/list/Appointment_Record"
import Customer_Consumption_Records from "components/customers/edit/info/Customer_Consumption_Records"
import Pet_Consumption_Records from "components/pets/edit/info/Pet_Consumption_Records"

import Is_Info_Sign from "../edit_components/info_sign/Is_Info_Sign"

// Hook
import { useUpdate_Data } from "hooks/ajax_crud/useAjax_Update"
import { set_Side_Panel , set_Side_Extra_Fee } from "store/actions/action_Global_Layout"
import { useDispatch } from "react-redux"

import { switch_Service_Type_Id } from "utils/data/switch"
import Self_Adjust_Amount from "components/services/edit_components/Self_Adjust_Amount"
import Beautician_Process from "components/index/components/Beautician_Process"  
import Submit_Error from "components/index/components/Submit_Error"
import cookie from 'react-cookies'

import { colCovert_Basic_UPDATE , colCovert_Bath_UPDATE , colCovert_Beauty_UPDATE } from "hooks/crud/process/convert_Columns_Update" 
import { useMatch_Obj } from "containers/data_components/Condition_for_Currnet_Tab" ;
import To_Previous_Page from "templates/note/To_Previous_Page" ;
import Data_Table_Id from 'templates/note/Data_Table_Id' ;

import Update_Submit_Button from 'templates/button/Update_Submit_Button' ;

import { ServiceSummaryFeeProvider } from "components/services/edit_components/summary_fee/contexts/serviceSummaryFeeContext"
import { setTimeout } from "timers" ; 

import Side_Extra_Fee_List from '../components/Side_Extra_Fee_List';

import { execute_Update_ServiceOrder_LeaveTime } from "fp/services/update/update_ServiceOrder" ;
import { get_H_M } from "utils/time/time" ;




{ /* 編輯服務 */ }
const Update_Service = ( ) => {


    const dispatch     = useDispatch();
    const value        = useContext( SidePanelContext ) ;                      // 取得 context 值

    const service_Type = value.service_Type as any ;                           // 服務類別 ( Ex. 基礎、洗澡、美容、安親、住宿 )
    const data         = value.preLoadData ? value.preLoadData : value.data ;  // 預先取得資料
        
    const pet          = data.pet ? data.pet : {}  ;                           // 寵物資料
    const Q_code       = data.q_code  ;
    const source_Page  = value.source_Page as any ;                            // 來源網頁 ( for 點選、回到上一個頁面  Ex. Nav_Qcode_List > Update_Service )


    // 目前登入使用者資訊
    const [ current_User , set_Current_User ] = useState({
                                                           account : '' ,  // 帳號
                                                           name    : ''    // 姓名 
                                                         }) ;


    // 取得 _ "服務( 基礎、洗澡、美容 ) 相對應服務資料表 id"、"服務 Url ( /basics 、/bathes、/beauties ) "
    const { service_Id , service_Url } = switch_Service_Type_Id( data ) ; 

    // 標題樣式
    const { color , icon } = useServiceType( service_Type , false , 'large' , false ) ;

    // React Hook Form
    const { register , setValue , control , watch , handleSubmit , formState: { errors , isDirty , isValid } } =
                useForm< IService >({
                                       mode          : "all" ,
                                       // resolver  : yupResolver( schema_Customer ) ,  // schema_Customer ? 再確認 ( 2021.08.13 )
                                       defaultValues : {

                                                               // # 基本資料 ( Service_Info )
                                                               service_Date    : new Date( data.service_date ) as any ,

                                                               actual_Arrive   : data.actual_arrive ? data.actual_arrive : '00:00' ,     // 實際 _ 到店時間
                                                               expected_Arrive : data.expected_arrive ? data.expected_arrive : '00:00' , // 預計 _ 到店時間 ( 預約 )
                                                               expected_Leave  : data.expected_leave ? data.expected_leave : '00:00' ,   // 預計 _ 離店時間

                                                               appointment_Status : data.shop_status ,                                   // 預約狀態 ( 尚未到店 | 到店等候中 ) 

                                                               way_Arrive      : data.way_arrive ,       // 到店方式
                                                               way_Leave       : data.way_leave ,        // 離店方式

                                                               // # 客戶交代、物品 ( Customer_Note )
                                                               customer_Object       : data.customer_object ? data.customer_object.split(',') : [] ,
                                                               customer_Object_Other : data.customer_object_other ,
                                                               customer_Note         : data.customer_note ? data.customer_note.split(',') : [] ,
                                                               admin_Customer_Note   : data.admin_customer_note ,

                                                               // # 基礎單資料 ( Basic_Form )
                                                               basic_Option          : data.basic_data ? data.basic_data.split(',') : [] ,

                                                               // # 洗澡單資料 ( Bath_Form )
                                                               bath_Option_1 : data.bath_1 ,
                                                               bath_Option_2 : data.bath_2 ,
                                                               bath_Option_3 : data.bath_3 ,
                                                               bath_Option_4 : data.bath_4 ,
                                                               bath_Option_5 : data.bath_5 ,
                                                               bath_Option_6 : data.bath_6 ,

                                                               // # 美容單資料 ( Beauty_Form )
                                                               beauty_Option_Body  : data.b_body ,
                                                               beauty_Option_Head  : data.b_head ,
                                                               beauty_Option_Ear   : data.b_ear ,
                                                               beauty_Option_Tail  : data.b_tail ,
                                                               beauty_Option_Foot  : data.b_foot ,
                                                               beauty_Option_Other : data.b_other ,

                                                               // # 加價項目
                                                               extra_Item   : data.extra_service ? data.extra_service.split(',') : [] ,

                                                               // # 加價美容
                                                               extra_Beauty : data.extra_beauty ? data.extra_beauty.split(',') : [] ,

                                                               // # 住宿單資料 ( Lodge_Form )
                                                               lodge_Room_Type     : data.room_type ,

                                                               lodge_CheckIn_Date  : new Date( data.start_date ) ,
                                                               lodge_CheckIn_Time  : data.start_time ,

                                                               lodge_CheckOut_Date : new Date( data.end_date ) ,
                                                               lodge_CheckOut_Time : data.end_time ,


                                                               // # 接送費
                                                               pickup_Fee   : data.pickup_fee ,

                                                               // # 服務明細 ( Summary_Fee )
                                                               payment_Method : data.payment_method ,   // 付款方式

                                                               
                                                               // # 洗美備註
                                                               beautician_Note : data.beautician_note ,


                                                         }

                                   }) ;
                                   

    const props = {
                     register    : register ,
                     setValue    : setValue ,
                     watch       : watch ,

                     control     : control ,
                     errors      : errors ,
                     isValid     : isValid ,
                     isDirty     : isDirty ,

                     current     : service_Type ,

                     editType    : '編輯' ,       // 避免於編輯時，出現 '不能選擇 : 過去日期' 警告 ( Service_Info.tsx )

                     serviceData : data          // 該筆服務資料
                  } ;


                  
    // 更新函式
    const update_Data = useUpdate_Data() ;


    // 點選、回到上一個頁面
    const back_To_Prev_Page = ( source : string , customer_Id? : string , pet_Data? : any ) => {

       if( !source ) return false   

       if( source === 'Q_Code_List' )     dispatch( set_Side_Panel( true , <Nav_Qcode_List />      , {} ) ) ;                                                 // Qcode 列表      
       if( source === 'Appoint_Records' ) dispatch( set_Side_Panel( true , <Appointment_Records /> , {} ) ) ;                                                 // 預約紀錄 
       if( source === 'Customer_Service_Records' ) dispatch( set_Side_Panel( true , <Customer_Consumption_Records customer_Id = { customer_Id } /> , {} ) ) ; // 客戶消費歷史
       if( source === 'Pet_Consumption_Records' ) dispatch( set_Side_Panel( true , <Pet_Consumption_Records pet_Data = { pet_Data } /> , {} ) ) ;             // 寵物服務紀錄

    } ;

    
    // 提交表單
    const onSubmit : SubmitHandler< IService > = submit_Data => {

       // 到店狀態
       const shopStatus = submit_Data?.appointment_Status as Shop_Status ;  

       // 更新 _ 實際離店 
       execute_Update_ServiceOrder_LeaveTime( shopStatus , get_H_M() )( data ) ;

    
       // 欲更改欄位       
       let updateObj : any = null ;  
       
       if( service_Type === '基礎' ) updateObj = colCovert_Basic_UPDATE( submit_Data ) ;
       if( service_Type === '洗澡' ) updateObj = colCovert_Bath_UPDATE( submit_Data ) ;
       if( service_Type === '美容' ) updateObj = colCovert_Beauty_UPDATE( submit_Data ) ;

       // 關掉 左側：服務加價面板
       dispatch( set_Side_Extra_Fee( false , null ) ) ;

       // 目前該單據：到店狀態
       const shop_Status = data?.shop_status ;  

       // 防禦性驗證，無 "到店狀態"
       if( !shop_Status ){
          alert( "此服務單 ' 到店狀態 ' 有誤，無法進行修改，請洽系統管理員" ) 
          return false
       }


       // 更新資料 
       update_Data( service_Url , service_Id , updateObj , '/index' , `${ service_Type }單` ) ; 


    
    } ;


    // 設定 _ 目前登入者資訊
    useEffect( () => {

        // Cookie : 目前登入者資訊
        const userInfo = cookie.load( 'userInfo' ) ;
        set_Current_User( { ...current_User , account : userInfo['account'] , name : userInfo['employee_name'] } ) ;

    } , [] ) ;


    // # 依照目前服務類型 ( service_Type，例如：基礎、洗澡、美容... )，判斷 _ 是否顯示
    const is_Obj = useMatch_Obj( service_Type ) ;


    // 設定 _ 欄位 amount_Paid ( React Hook Form 無法設定 )
    useEffect( () => {

       setTimeout( ()=>  setValue( "amount_Paid" , data.amount_paid  )  , 1000 )  
        
    } , [] ) ;


    // 篩選出 _ 未被刪除的加價單
    const extraFee_Not_Deleted = data?.extra_fee?.filter( ( x : any ) => x?.is_delete === 0 ) ;

    

    return <ReachHookFormContext.Provider value = { props } >

             <form onSubmit = { handleSubmit( onSubmit ) } >
        
                { /* 資料表 id */ }   
                <Data_Table_Id id = { service_Id } />


                { /*  標題  */ }
                <b className = { "m_Bottom_30 " + color } >

                    <i className = { icon } ></i> &nbsp;&nbsp;

                    { service_Type } &nbsp;

                    { ( service_Type === "基礎" || service_Type === "洗澡" || service_Type === "美容" || service_Type === "安親" ) &&  
                        <b className="tag is-white is-rounded f_11"> Q{ Q_code } </b> 
                    }
                
                    &nbsp;

                    { pet?.name ? <> { pet.name } ( { pet.species } ) &nbsp; &nbsp; </> : <p className="fRed"> 寵物已刪除 </p> }

                    { pet.sex   && <> <b className="tag is-white is-rounded f_12"> { pet.sex }    </b> &nbsp; &nbsp; </> }
                    { pet.age   && <> <b className="tag is-white is-rounded f_12"> { pet.age } 歲 </b> &nbsp; &nbsp; </> }
                    { pet.color && <> <b className="tag is-white is-rounded f_12"> { pet.color }  </b>               </> } 

                    { /* 加價單 */ }
                    { extraFee_Not_Deleted?.length > 0 &&

                        <b className = "tag is-medium is-rounded pointer" 
                           style     = {{ 'background' : "rgba(80,80,220,.9)" , "color" : "white" }}
                           onClick   = { () => dispatch( set_Modal( true , <Side_Extra_Fee_List /> , { data : data , modal_Style : { width : "110%" , left : "-5%" , top : "30px" } } )) } >

                           <i className = "fas fa-file-medical f_14" ></i> &nbsp; 加價單 &nbsp;( { extraFee_Not_Deleted?.length }  )

                        </b> 
                        
                     }    

                </b> 
                
                { /*  回上一頁  */ }
                { source_Page && <To_Previous_Page action = { () => back_To_Prev_Page( source_Page , data?.customer?.id , data?.pet ) } />  }

                { /* 提交：轉異常 ＆ 銷單 */ }
                <Submit_Error current_User_Name = { current_User['name'] } data = { data } /> 
    
                
                { /* 顯示提示 ( 異常案件、銷單 ） */ }
                <Is_Info_Sign is_error        = { data['is_error'] } 
                              is_delete       = { data['is_delete'] } 
                              error_submitter = { data['error_submitter'] } 
                              error_cause     = { data['error_cause'] } />

                <hr/>

                { /* 服務單基本資訊 : 服務性質、到店日期、處理碼 ... */ }
                { <Service_Info { ...props } /> }


                { /* 自備物品、主人交代、櫃台備註  */ }
                <Customer_Note { ...props } />

                { /* 基礎單項目 */ }
                <Basic_Form { ...props } /> 

                { /* 洗澡單項目 */ }
                { ( service_Type === "洗澡" || service_Type === "美容" ) && <Bath_Form { ...props } /> }

                { /* 加價 _ 項目 */ }
                { ( service_Type === "洗澡" || service_Type === "美容" ) && <Extra_Item { ...props } /> }

                { /* 加價 _ 美容 */ }
                { service_Type === "洗澡" && <Extra_Beauty { ...props } /> }

                { /* 美容單項目 */ }
                { service_Type === "美容" && <Beauty_Form  { ...props } /> }

                { /* 住宿項目 */ }
                { service_Type === "住宿" && <Lodge_Form   { ...props } /> }

                { /* 安親項目 */ }
                {
                ( service_Type === "安親" || service_Type === "一般安親" || service_Type === "住宿_提早抵達" || service_Type === "住宿_延後帶走" ) &&
                    <Care_Form { ...props } />
                }

                { /*  所有服務 : 自行調整費用金額  */ }
                { is_Obj.is_Show_Self_Adjust_Amount && <Self_Adjust_Amount { ...props } /> }


                { /* 接送費 */ }
                { is_Obj.is_Show_Pickup_Fee && <Pickup_Fee { ...props } /> }

                { /* 櫃台人員評分 */ }
                <div className="columns is-multiline is-mobile relative m_Left_5" >

                    <div className="column is-12-desktop" >

                        <i className="far fa-star f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 櫃台人員評分 ( 客戶 ) : </b>
                        { data['admin_star'] === '0' ?
                            <b className="f_14 fRed" > 拒 接 </b> :
                            <b className="fDred f_14"> { data['admin_star'] } </b>
                        }

                    </div>

                </div>

                
                { /*  美容師處理結果 ()  */ }
                { ( service_Type === "安親" || service_Type === "住宿"  ) || 
                    <Beautician_Process  data = { data } register = { register } />
                }

                <hr/> <br/>

                { /* 費用結算 */ }
                { ( service_Type === "基礎" || service_Type === "洗澡" || service_Type === "美容" || service_Type === "住宿" || service_Type === "安親" ) && 

                    <ServiceSummaryFeeProvider> 
                        <Summary_Fee  /> 
                    </ServiceSummaryFeeProvider>
                
                }
                            
                { /* 提交按鈕 */ }
                <Update_Submit_Button  name = "提交表單" isValid = { true } />

             </form>

           </ReachHookFormContext.Provider>

} ;

export default Update_Service



