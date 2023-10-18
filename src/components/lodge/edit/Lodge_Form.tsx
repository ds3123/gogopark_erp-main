/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { FC , useEffect , useState } from "react"
import { Edit_Form_Type , ILodge_Data  } from "utils/Interface_Type";
import moment from "moment";
import { get_Date_Cal , get_Interval_Dates , get_Interval_Dates_Without_LastDate , get_InUse_Days , get_Today } from "utils/time/date";
import { set_Current_Lodge_Price_Sum } from 'store/actions/action_Lodge'
import { useDispatch , useSelector } from "react-redux";
import { get_RandomInt } from "../../../utils/number/number";
import { set_Current_Lodge_Type , set_Current_Lodge_Number , set_Lodge_Reservation_Data } from "store/actions/action_Lodge"
import { set_Lodge_Check_In_Date , set_Lodge_Check_Out_Date } from "store/actions/action_Lodge"
import Lodge_Form_Title from "./components/Lodge_Form_Title";
import Lodge_Form_Info from "./components/Lodge_Form_Info";
import Lodge_Form_Period from "./components/Lodge_Form_Period" ;
import { get_Lodge_Interval_Prices_Total } from "fp/lodges/read/get_Lodge" ;
import { lodge_PricePlan_1 , lodge_PricePlan_2 } from "components/lodge/lodge_config";
import { set_Current_Lodge_Plan } from "store/actions/action_Lodge" ;
import Lodge_Care_Fee from "./components/service_fee/Lodge_Care_Fee";
import { useEffect_Shop_Lodge_Holidays } from "../hooks/useEffect_Lodge_Holidays" ;
import Lodge_Service from "./Lodge_Service";
import Lodge_Pet from "./Lodge_Pet" ;
import Lodge_Care from "./Lodge_Care";




// NOTE :
//    1. 月份需要加 1，才是目前月份
//    2. ' 顯示 ' 日期範圍 : 開始日期( startDate ) ~ 結束日期( endDate ) 前 1天
const appointments : ILodge_Data[] = [

    {
        title       : 'A01 ( 大房 ) - 招財 ( 秋田犬 )' ,
        startDate   : new Date(2022 ,1 , 1 ) ,
        endDate     : new Date(2022 ,1 , 3 ) ,
        lodgeType   : '大房' ,
        lodgeNumber : 'A01'
    } ,

    {
        title       : 'A02 ( 大房 ) - DDD ( 獒犬 )' ,
        startDate   : new Date(2022 ,1 , 5 ) ,
        endDate     : new Date(2022 ,1 , 6 ) ,
        lodgeType   : '大房' ,
        lodgeNumber : 'A02'
    } ,

] ;


interface ILodge extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}



{ /* @ 住宿表單欄位  */}
const Lodge_Form : FC< ILodge > = ( { register  , control  , watch , setValue , errors , current , editType , serviceData } ) => {


    const dispatch = useDispatch() 
    
    // 取得 _ 特定店家，所有熱門時段日期
    const nationalHolidays = useEffect_Shop_Lodge_Holidays() ;


    
    // # 目前欄位所選擇 :
    const lodgeType      = useSelector( ( state : any ) => state.Lodge.current_Lodge_Type ) ;   // 房型 ( 下拉 )
    const lodgeNumber    = useSelector( ( state : any ) => state.Lodge.current_Lodge_Number ) ; // 房號 ( 下拉 ) 
    const check_In_Date  = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ;  // 住房日期
    const check_Out_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_Out_Date ) ; // 退房日期

    // 目前選擇住宿 : 價格方案 ( 可退款 / 不可退款 )
    const current_Lodge_Plan = useSelector( ( state : any ) => state.Lodge.current_Lodge_Price_Plan ) ; 


    // 該房間，是否在選定的時間內，已被使用
    const [ is_Room_InUse , set_Is_Room_InUse ] = useState( false ) ;


    // 採用 _ 方案類型：不退款 / 退款                                                     
    const lodge_PlanType = current_Lodge_Plan === "不退款" ? lodge_PricePlan_1 : lodge_PricePlan_2 ;  


    // 點選 _ 使用方案類型
    const click_LodgeType = ( type : LodgePlan ) => dispatch( set_Current_Lodge_Plan( type ) ) ;


    // 檢查 _ 該房間，是否在選定的時間內，已被使用
    const check_Is_Room_InUse = ( lodgeNumber : string , checkIn_Date : string , checkOut_Date : string  , lodgeData : ILodge_Data[] ) => {

        let bool = false ;

        // 所選擇時間區段，所包含日期
        // 須先減 1 天 ( 再檢查 get_Interval_Dates 2021.06.28 )
        const _lodgeCheckIn_Date  = moment( get_Date_Cal( checkIn_Date , -1 ) ).format('YYYY-MM-DD') ;
        const _lodgeCheckOut_Date = moment( get_Date_Cal( checkOut_Date , -1 ) ).format('YYYY-MM-DD') ;
        const selected_Days       = get_Interval_Dates( _lodgeCheckIn_Date , _lodgeCheckOut_Date ) ;


        // 所選擇房號，已有被使用紀錄
        lodgeData.forEach( x => {

            if( x['lodgeNumber'] === lodgeNumber ){

                // 該房號使用期間，所包含天數
                const days_InUse = get_InUse_Days( x['startDate'] , x['endDate'] ) ;

                // 篩選 : 已使用天數
                const days_Selected_InUse = selected_Days.filter( ( x : any ) => ( days_InUse.indexOf( x ) !== -1 ) ) ;

                // 所選擇時間區段內，有已使用過的紀錄
                if( days_Selected_InUse.length > 0 ) bool = true ;

            }

        });

        return bool ;

    } ;


    // 取得 : 目前住宿資料
    useEffect( () => {

       dispatch( set_Lodge_Reservation_Data( appointments ) ) ;

    } , [ appointments ] ) ;

    // 檢查 : 某房號，在某時間區段下，是否已被使用
    useEffect( () => {

        set_Is_Room_InUse( check_Is_Room_InUse( lodgeNumber , check_In_Date , check_Out_Date , appointments ) ) ;

    } , [ lodgeNumber , check_In_Date , check_Out_Date , appointments ] ) ;


    // 設定 _ 隨機住宿合約編號 ( '新增'時，才設定 )
    useEffect( () => {

        if( current ){

          const randomId = `L_${ get_Today() }_${ get_RandomInt( 1000 ) }` ;
          setValue( "lodge_Serial" , randomId ) ;    // 設定 input 欄位值

        }

    } , [] ) ;


    // 【 新增時 】 設定 _ 目前住宿 : 總計金額
    useEffect( () => {
      
        if( lodgeType && !editType ){


          // 起、迄日期之間，所有日期   
          const intervalDays             = get_Interval_Dates( check_In_Date , check_Out_Date ) ;

          // 去除最後一個日期 ( 計算住幾 "晚" )
          const intervalDays_No_LastDate = get_Interval_Dates_Without_LastDate( intervalDays ) ;  

          // 計算 _ 總計金額
          const lodge_Price_Sum = get_Lodge_Interval_Prices_Total( intervalDays_No_LastDate , nationalHolidays , lodgeType , lodge_PlanType  ) ;
         
          dispatch( set_Current_Lodge_Price_Sum( lodge_Price_Sum ) ) ;                                

        } 

    } , [ check_In_Date , check_Out_Date , lodgeType , lodge_PlanType ] ) ;



    // 設回 _ 預設值
    useEffect( () => { 
    
      const today = moment( new Date() ).format( 'YYYY-MM-DD' ) ; // 今日      

      dispatch( set_Lodge_Reservation_Data( [] ) ) ;            // 已經住宿資料 ( 再確認 2022.01.04 )
      dispatch( set_Current_Lodge_Type( '' ) ) ;                // 房型
      dispatch( set_Current_Lodge_Number( '' ) ) ;              // 房號
      dispatch( set_Lodge_Check_In_Date( today ) ) ;            // 住房日期  
      dispatch( set_Lodge_Check_Out_Date( today ) ) ;           // 退房日期

    } , [] ) ;


    { /* 元件屬性 ( for <Lodge_Form_Info /> ) */ }
    const info_Props = {
        editType    : editType ,
        errors      : errors ,
        register    : register ,
        serviceData : serviceData ,
    }

    { /* 元件屬性 ( for <Lodge_Form_Period /> ) */ }
    const period_Props = {

        editType    : editType ,

        register    : register ,
        control     : control ,
        setValue    : setValue ,
        watch       : watch ,

        serviceData : serviceData ,
    }


   return <>

            { /* 住 ( R ) : { check_In_Date }  /  退( R ) : { check_Out_Date } */ }

            { /* 標題列  */ }
            <Lodge_Form_Title editType = { editType } /> 

            { /* 點選 _ 價格方案 */ }  
             <div className = "columns is-multiline is-mobile m_Bottom_30" >
                  
                <div className = "column is-10-desktop relative" > 

                   <b className = "m_Right_10 f_13" > 價格方案 : </b> 

                   { /* 新增 */ } 
                   { !editType && <>

                                     <span onClick = { () => click_LodgeType( "不退款" ) } className = { `tag is-medium is-danger pointer ${ current_Lodge_Plan !== "不退款" ? 'is-light' : '' } is-rounded m_Right_20` } > 
                                     
                                       不退款 

                                     </span>

                                     <span onClick = { () => click_LodgeType( "可退款" ) } className = { `tag is-medium is-danger pointer ${ current_Lodge_Plan !== "可退款" ? 'is-light' : '' } is-rounded` } >
                                        
                                       可退款 
                                        
                                     </span>
                                
                                  </> }
                     
                    { /* 編輯 */ }
                    { ( editType ) && <span className = " tag is-danger is-large is-rounded" > 
                     
                            { serviceData?.lodge_plan ? serviceData?.lodge_plan : '無' }

                            <span className = "tag is-white m_Left_10 m_Right_10 fRed f_12 is-rounded" > { serviceData?.lodge_price }  </span> 元
                            
                       </span>  }
                   
                </div>

             </div>     
            

            { /* 合約編號、房 型、房 號  */ }
            <Lodge_Form_Info { ...info_Props } /> <br/>

            { /* 住房/退房 : 日期、時間  */ }
            <Lodge_Form_Period { ...period_Props } />

            { /* 已被使用提示 */ }
            { is_Room_InUse  &&

               <div className = 'has-text-centered' >
                  <br/> <b className = "tag is-medium is-danger" > <i className="fas fa-exclamation"></i> &nbsp; 所選擇房間，在目前時段下，已被使用 ( 詳細資訊，請點選 : 查詢 ) </b> <br/>
               </div>

            }

             { /* 同住寵物 */ }
             <Lodge_Pet editType = { editType } register = { register } setValue = { setValue } serviceData = { serviceData } />
            
             <div className = "columns is-multiline is-mobile m_Bottom_50 m_Top_20" >

                {/* 安親費用 */}
                <Lodge_Care editType = { editType } register = { register } setValue = { setValue } carePrice = { serviceData?.care_price } />
                    
                { /* 住宿期間：洗澡、美容、自訂費用 */ }
                <Lodge_Service  { ...period_Props } /> 

             </div>

            <hr/><br/>

          </>

} ;

export default Lodge_Form ;