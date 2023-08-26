/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { FC } from "react" ;
import { get_Interval_Dates , get_Week_Day } from "utils/time/date" ;
import { useSelector } from "react-redux" ;



import { 

        get_Lodge_RegularDays ,
        get_Lodge_Holidays ,
        get_Lodge_NationalHolidays ,
        get_Lodge_RoomType_Prices ,
        get_Lodge_Non_NationalHolidays ,

       } from "fp/lodges/read/get_Lodge" ;

import { national_Holidays , lodge_PricePlan_1  , lodge_PricePlan_2 } from "components/lodge/lodge_config" ;




// 房型價格
export interface ILodge_Price{
    room_Type        : string ; // 房型
    ordinary_Day     : number ; // 平日
    ordinary_Holiday : number ; // 假日
    national_Holiday : number ; // 國定假日
}




// 各種房型 ( 大、中、小 房 / 籠 )，於不同時段( 平日、假日、國定假日 ) : 價格
export const lodge_Price : ILodge_Price[] = [

    { room_Type : '大房' , ordinary_Day : 800 , ordinary_Holiday : 900 , national_Holiday : 1000 } ,
    { room_Type : '中房' , ordinary_Day : 640 , ordinary_Holiday : 720 , national_Holiday : 800 } ,
    { room_Type : '小房' , ordinary_Day : 560 , ordinary_Holiday : 630 , national_Holiday : 700 } ,

    { room_Type : '大籠' , ordinary_Day : 480 , ordinary_Holiday : 540 , national_Holiday : 600 } ,
    { room_Type : '中籠' , ordinary_Day : 400 , ordinary_Holiday : 450 , national_Holiday : 500 } ,
    { room_Type : '小籠' , ordinary_Day : 320 , ordinary_Holiday : 360 , national_Holiday : 400 } ,

] ;







{ /* @ 住宿價格計算 */ }
const Lodge_Price : FC = ( ) => {


    // 房型 / 住、退房日期
    const room_Type      = useSelector( ( state : any ) => state.Lodge.current_Lodge_Type ) ;   // 房型
    const check_In_Date  = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ;  // 住房日期
    const check_Out_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_Out_Date ) ; // 退房日期

    // 目前選擇住宿 : 價格方案 ( 可退款 / 不可退款 )
    const current_Lodge_Plan = useSelector( ( state : any ) => state.Lodge.current_Lodge_Price_Plan ) ; 

    
    // 採用 _ 方案類型：不退款 / 退款                                                     
    const lodge_PlanType = current_Lodge_Plan === "不退款" ? lodge_PricePlan_1 : lodge_PricePlan_2 ;  
    
    
    // 取得 _ 特定方案、房型下，價格組合
    const roomType_Plan_Prices            = get_Lodge_RoomType_Prices( room_Type , lodge_PlanType ) ;


    // 取得 _ 各類型價格
    const current_RegularDays_Price       = roomType_Plan_Prices.regularDay_Price ;  // 平日
    const current_Holidays_Price          = roomType_Plan_Prices.holiday_Price ;     // 假日
    const current_NationalHolidays_Price  = roomType_Plan_Prices.ordinary_Price ;    // 國定假日 ( 原價 ) 

        
    // 取得 _ 起、迄日期之間 : 所有日期                                                     
    const intervalDays         = get_Interval_Dates( check_In_Date , check_Out_Date ) ;  
    
    // 國定假日以外 ( 平日 + 假日 -> 排除 _ 國定假日 ) 的所有日期
    const non_NationalHolidays = get_Lodge_Non_NationalHolidays( intervalDays , national_Holidays ) ;
    

    // 取得 _ 平日、假日、國定假日
    const regularDays      = get_Lodge_RegularDays( non_NationalHolidays ) ;                          // 平日
    const holidays         = get_Lodge_Holidays( non_NationalHolidays ) ;                             // 假日
    const nationalHolidays = get_Lodge_NationalHolidays( intervalDays , national_Holidays ) ; // 國定假日

    // 取得 _ 各類型日期：數量
    const regularDays_Num      = regularDays.length ;
    const holidays_Num         = holidays.length ;
    const nationalHolidays_Num = nationalHolidays.length ;
    

    // 取得 _ 各類型價格 : 小計
    const current_RegularDays_Price_Total      = current_RegularDays_Price * regularDays_Num ;           // 平日            
    const current_Holidays_Price_Total         = current_Holidays_Price * holidays_Num ;                 // 假日 
    const current_NationalHolidays_Price_Total = current_NationalHolidays_Price * nationalHolidays_Num ; // 國定假日



    return  <div className = "m_Top_20" >

                { /* 房型定價列 */ }
                { room_Type &&

                    <>
                        <b className = "tag is-large is-rounded relative" style = {{ left:"-20px" , background : "rgba(150,200,150,.2)" }} > &nbsp; &nbsp;

                            <>  
                                房型  &nbsp; <b className = "fDblue" > { room_Type } </b> &nbsp; :
                                <b className = "f_14" > &nbsp;&nbsp;
                                    平日 :     <b> { current_RegularDays_Price }      </b> <span className = "f_11"> ( 元 / 日 ) </span>、
                                    假日 :     <b> { current_Holidays_Price }         </b> <span className = "f_11"> ( 元 / 日 ) </span> 、
                                    原價 :  <b> { current_NationalHolidays_Price } </b> <span className = "f_11"> ( 元 / 日 ) </span>
                                </b>   &nbsp; &nbsp;
                            </>

                        </b> <br/><br/>
                    </>

                }

                <br/>

                { /* 平 日 */ }
                { regularDays.length > 0 &&

                    <>
                    
                        <b className = "m_Bottom_15" >
                            <span className = "f_14 fDRed" > 平 日 </span> &nbsp;
                            <span className = "f_11 fGray" >( 一 ~ 四 ) </span> &nbsp; &nbsp;
                        </b>

                        { room_Type &&

                            <span style={{float:"right"}}>
                                平日 _ 共 <b className = "fDblue" > { regularDays_Num } </b> 天 ，
                                小計 : <b className = "fRed" > { current_RegularDays_Price_Total }</b> 元
                            </span>

                        }

                        <br/>

                        { regularDays.map( ( x , y ) => <span key = { y } > <b className = "tag is-medium m_Bottom_10 m_Right_10"> { x } ( { get_Week_Day(x) } ) </b> &nbsp; </span> ) }

                        <br/><br/>

                    </>

                }

                { /* 假 日 */ }
                { holidays.length > 0 &&

                    <>

                        <b className="m_Bottom_15">
                            <span className = "f_14 fDRed" > 假 日 </span> &nbsp;
                            <span className = "f_11 fGray" > ( 五 ~ 日 ) </span> &nbsp; &nbsp;
                        </b>

                        { room_Type &&
                            <span style = {{ float: "right" }} >
                                假日 _ 共 <b className = "fDblue" > { holidays_Num } </b> 天 ，
                                小計 : <b className = "fRed" > { current_Holidays_Price_Total } </b> 元
                            </span>
                        }

                        <br/>
                        
                        { holidays.map( ( x , y ) => <span key = { y } > <b className = "tag is-medium m_Bottom_10 m_Right_10" > { x } ( { get_Week_Day( x ) } ) </b> &nbsp; </span> ) }

                        <br/><br/>

                    </>

                }

                { /* 原價 */ }
                { nationalHolidays.length > 0 &&

                    <>

                        <b className = "m_Bottom_15">
                            <span className = "f_14 fDRed" > 原價 </span> &nbsp; &nbsp;
                        </b>

                        { room_Type &&
                            <span style={{float: "right"}}>
                               原價 _ 共 <b className = "fDblue"> { nationalHolidays_Num } </b> 天 ，
                                小計 : <b className = "fRed" >{ current_NationalHolidays_Price_Total }</b> 元
                            </span>
                        }

                        <br/>

                        { nationalHolidays.map( ( x , y ) => <span key = { y } > <b className = "tag is-medium m_Bottom_10 m_Right_10"> { x } ( { get_Week_Day( x ) } ) </b> &nbsp; </span> )}

                        <br/><br/>

                    </>

                }

                { room_Type &&

                    <b className="tag is-medium is-warning is-rounded" style={{float: "right"}}>

                        &nbsp; 住宿日期共 &nbsp; <b className = "fDblue">
                                                  <span className = "tag is-white is-rounded f_10">
                                                     { regularDays_Num + holidays_Num + nationalHolidays_Num }
                                                  </span>
                                               </b> &nbsp; 天，

                        金額共計 &nbsp; <b className = "fRed" >
                                         <b className = "tag is-white is-rounded fRed">
                                            <span className = "f_12" > { current_RegularDays_Price_Total + current_Holidays_Price_Total + current_NationalHolidays_Price_Total } </span>
                                         </b>
                                       </b> &nbsp; 元 &nbsp;

                    </b>

                }

            </div>

} ;

export default Lodge_Price