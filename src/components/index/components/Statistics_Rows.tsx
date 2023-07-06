/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import { useEffect , useState } from "react" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { useDispatch , useSelector} from "react-redux" ;
import Service_Error from "components/index/list/Service_Error" ;
import Appointment_Record from "components/index/list/Appointment_Record" ;
import moment from "moment" ;
import useShopStatus_Sum from "hooks/data/useShopStatus_Sum" ;
import Check_Lodge_Button from "components/lodge/components/Check_Lodge_Button" ;
import { useRead_Services_GoneHome_UnPaid_By_Date } from "hooks/ajax_crud/useAjax_Read" ;
import { useStatistic_Service_Num_Today } from "hooks/data/useStatistic" ;
import { useFetch_Services_By_ServiceDate_Polling_Today } from "hooks/react-query/service/useFetchServices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { 
          useFetch_Shop_Services_With_Delete_Error_On_ServiceDate 
        } from "hooks/react-query/service/useFetchServices" ;

import { useFetch_ExtraFees_By_PaymentDate } from "hooks/react-query/service/useFetchServices"

        
const lP    = { top:"200px" , right:"-11%" } ;
const sP    = { top:"80px"  , left:"-5%"   } ;
const slash = <span className="m_Right_20 f_18" style={{ color:"rgba(0,0,0,.2)" }}> / </span> ;

/* @ 今日預約、今日統計 */
const Statistics_Rows = () => {

    const dispatch       = useDispatch() ;
    const today          = moment( new Date() ).format( 'YYYY-MM-DD' ) ;                  // 今日
    const shop_Id        = useAccount_Shop_Id() ;                                         // 目前登入者，所屬商店 id    
    const is_Detail_Mode = useSelector( ( state : any ) => state.Index.is_Detail_Mode ) ; // 首頁詳細模式 ( 展開所有統計資料 )


    // 取得 _ 特定店家帳號、今日 : 服務、客戶、寵物 ( 輪詢 : 每隔 2 秒更新 )
    const { data : pet_Arr }       = useFetch_Services_By_ServiceDate_Polling_Today( shop_Id ) ;
    
   
    // 特定日期 ( 今日 ) : 異常 + 銷單
    const error_Delete_By_Date_Num = useFetch_Shop_Services_With_Delete_Error_On_ServiceDate( shop_Id , today ).length ;


    // 取得 _ 特定日期，所有加價單
    const date_Extra_Fee     = useFetch_ExtraFees_By_PaymentDate( shop_Id , today ) ; 
    const extra_Fee_Deleted  = date_Extra_Fee.filter( x => x?.is_delete === 1 ) ;    // 篩選出 _ 已經被刪除的加價單



    // 服務完成數 
    const [ completed_Num , set_Completed_Num ]     = useState( 0 ) ;

    // 服務完成率
    const [ ratio_Completed , set_Ratio_Completed ] = useState< any >() ;


    // 取得、篩選出 : 在 '已回家(房)' 情況下，'應付金額' 與 '實付金額' 不符合 ( 即 : 實付金額為 0，或僅付部分實付金額 ) --> for 加總 _ 服務異常   
    const is_GoHome_UnPaid = useRead_Services_GoneHome_UnPaid_By_Date( shop_Id  , today )


    // 取得 _ 已完成服務
    const sConmpleted = useShopStatus_Sum( "已回家( 房 )" , pet_Arr ) ;
    

    // 各類服務 ( 基礎、洗澡、美容 )，今日 _ 預約 / 現場 : 次數統計 
    const service_Num = useStatistic_Service_Num_Today( pet_Arr ) ;
    const { 
            a_basic , a_bath , a_beauty , // 預約
            s_basic , s_bath , s_beauty   // 現場 
          } =  service_Num ;


    // 顯示 _ 預約紀錄
    const click_Appointments_List = () => dispatch( set_Side_Panel( true , <Appointment_Record /> , {} ) ) ;

    // 顯示 _ 服務異常
    const click_Service_Error     = () => dispatch( set_Side_Panel( true , <Service_Error /> , {} ) ) ;


    // 設定 _ 完成數、完成率
    useEffect( () => { 

      const sCompleted_Num = sConmpleted['basic_Num'] + sConmpleted['bath_Num'] + sConmpleted['beauty_Num'] ;
      const rCompleted     = Math.round( ( sCompleted_Num / pet_Arr.length ) * 100 ) ;

      set_Completed_Num( sCompleted_Num ) ;
      set_Ratio_Completed( rCompleted ) ;
        
    } , [ pet_Arr ] ) ;


    return <>

               { /* 點選 _ 檢視住宿情形  */ }
               <b className="absolute" style={ lP }> <Check_Lodge_Button /> </b>

               <div className="columns is-mobile  is-multiline relative" style={ sP } >

                  { /* 今日預約 */ }
                  <div className="column is-12-desktop" >

                      <div className = "tags has-addons" >

                          <b className = "tag is-large is-primary" >
                              <i className = "fas fa-phone" ></i> &nbsp; 今日預約
                          </b>

                          <span className="tag is-large is-light">
                              
                              基礎 : &nbsp; <b className='fDred m_Right_20'> { a_basic }  </b>  
                               
                              { s_basic > 0 &&
                                <span className="m_Right_20 f_12">
                                    ( 現場 + <b className="fBlue"> { s_basic } </b> )
                                </span> 
                              }

                              { slash } 

                              洗澡 : &nbsp; <b className='fDred m_Right_20'> { a_bath }   </b> 

                              { s_bath > 0 &&
                                <span className="m_Right_20 f_12">
                                    ( 現場 + <b className="fBlue"> { s_bath } </b> )
                                </span> 
                              }

                              { slash } 

                              美容 : &nbsp; <b className='fDred m_Right_20'> { a_beauty } </b> 

                              { s_beauty > 0 &&
                                <span className="m_Right_20 f_12">
                                    ( 現場 + <b className="fBlue"> { s_beauty } </b> )
                                </span> 
                              }
                          
                          </span>

                          <span className="tag is-primary is-large is-light pointer" onClick={ click_Appointments_List } >
                              <i className="fas fa-list"></i> &nbsp; 預約紀錄 &nbsp;
                              <b className="tag is-medium is-white relative" style={{ top:"4px" }}>
                                 洗澡 + 美容 &nbsp; : &nbsp;
                                 <span className='fRed f_14'> { a_bath + a_beauty } </span>
                              </b>
                          </span>

                      </div>

                  </div>

                  { /* 今日統計 */ }
                  <div className="column is-12-desktop relative" style={{ zIndex:1  } as any}>

                      <div className="tags has-addons" >

                          <b className= "tag is-large is-link" >
                            
                              <i className="fas fa-calculator"></i> &nbsp; 
                              
                                今日統計 &nbsp;
                              
                               <b className="tag is-white relative f_12" style={{ borderRadius:"30px", top:"4px" }}>  
                                  預約 : { a_basic + a_bath + a_beauty } &nbsp;  
                                  現場 : { s_basic + s_bath + s_beauty } 
                               </b>
                            
                          </b>

                          <span className="tag is-large is-light">

                              <i className="fas fa-list-alt"></i> &nbsp; 基礎&nbsp;<b>完</b> &nbsp; :&nbsp;
                              <b className='fDred'> { sConmpleted['basic_Num'] } </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              <i className="fas fa-bath"></i> &nbsp; 洗澡&nbsp;<b>完</b> &nbsp; :&nbsp;
                              <b className='fDred'> { sConmpleted['bath_Num'] } </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              <i className="fas fa-cut"></i> &nbsp; 美容&nbsp;<b>完</b> &nbsp;: &nbsp;
                              <b className='fDred'> { sConmpleted['beauty_Num'] }  </b> &nbsp; &nbsp;

                              <b className="tag is-white f_13 relative" style={{borderRadius:"20px" , top:"4px"}}> 
                                <i className="fas fa-tasks"></i> &nbsp;  
                                完成率 : &nbsp; <span className="fRed"> { ratio_Completed ? ratio_Completed : 0 } % </span> &nbsp; 
                                <span className="f_10"> ( { completed_Num } / { pet_Arr.length } ) </span>
                              </b> 

                          </span>

                          <span className="tag is-large is-light is-danger pointer" onClick={ click_Service_Error } >
                              <i className="fas fa-exclamation"></i> &nbsp; 服務異常 : &nbsp;
                              <b>  { error_Delete_By_Date_Num + ( is_GoHome_UnPaid.length ) + ( extra_Fee_Deleted.length ) } </b>
                          </span>

                      </div>

                  </div>

               </div>

         </>

} ;

export default Statistics_Rows ;