/* eslint-disable react/jsx-pascal-case */

import { useEffect } from 'react' ;
import cookie from 'react-cookies' ;   

import useMulti_NavOptions from "hooks/layout/useMulti_NavOptions";

// 各頁面元件
import CashPerformance_Report from "components/management/finance/CashPerformance_Report" ;
import Species_Price_List from "components/management/price/Species_Price_List" ;
import Service_Price from "components/management/price/service_type/Service_Price" ;
import Basic_Price from "components/management/price/service_type/Basic_Price" ;
import Bath_Price from "components/management/price/service_type/Bath_Price" ;
import Beauty_Price from "components/management/price/service_type/Beauty_Price" ;
import Care_Price from "components/management/price/service_type/Care_Price" ;
import Lodge_Price from "components/management/price/service_type/Lodge_Price" ;
import Extra_Item_Price from "components/management/price/service_type/Extra_Item_Price" ;
import Extra_Beauty_Price from "components/management/price/service_type/Extra_Beauty_Price" ;
import Account_List from "components/management/account/Account_List" ;
import Employees_List from "components/management/employee/Employees_List" ;
import Auth_Member_List from "./auth/shop_member/Auth_Member_List" ;
import Auth_Shop_List from "./auth/single_shop/Auth_Shop_List" ;
import Species_List from "components/management/setting/species/Species_List" ;
import Holidays_List from "components/management/setting/holidays/Holidays_List" ;
import Archive_List from "components/management/data/archive/Archive_List" ;
import Error_List from "components/management/data/error/Error_List" ;
import Plan_Data_List from "./data/plan_data/Plan_Data_List" ;
import Plan_Expire_List from "./data/plan_expire/Plan_Expire_List" ;
import BathBeauty_List from "./data/bathbeauty_note/BathBeauty_List" ;

import Plans from "components/plan/Plans" ;
import Delete_Service_List from "components/management/data/delete/Delete_Service_List";
import Reject_Customer_List from "./data/reject_customer/Reject_Customer_List"
import Reject_Pet_List from "./data/reject_pet/Reject_Pet_List";
import Log_List from "components/management/log/Log_List";
import { useEffect_Management_After_Edit } from "hooks/data/useManagement" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;

import { 
         useEffect_Shop_Customer_Reject_Process_Num ,
         useEffect_Shop_Pet_Reject_Process_Num ,
         useEffect_Shop_Service_Error_Process_Num ,
         useEffect_Shop_Alert_Total_Num
       } from "./hooks/useEffect_Management" ;




/* @ 管理頁面  */
const Management = () => {


    const _cookie      = cookie.load( 'userInfo' ) ;
    const positionType = _cookie['position_type']  ;  // 職位類型


    // 取得 : 第 2、3 層選項相關資訊
    const { Second_Nav , Third_Nav , currentSecond , currentThird , click_Second , click_Third } = useMulti_NavOptions() ;

    // # 編輯 ( 新增、修改、刪除 ) 資料後，藉由 cookie，點選、重導向至相對應的區塊頁面
    useEffect_Management_After_Edit( click_Second , click_Third ) ;


    // 顯示 _ 頁面元件
    const show_PageComponent = ( title : string ) : JSX.Element | null => {

        switch( title ) {

            // # 財務管理
            case '現金績效'  : return <CashPerformance_Report/> ;
          
         
            // # 價格管理
            case '品種價格' : return <Species_Price_List/> ;
            // case '服務價格' : return <Service_Price/>  ;   // 所有服務價格

            case '基礎' : return <Basic_Price/>  ;
            case '洗澡' : return <Bath_Price/>   ;
            case '美容' : return <Beauty_Price/> ;
            case '安親' : return <Care_Price/>   ;
            case '住宿' : return <Lodge_Price/>  ;

            case '加價項目' : return <Extra_Item_Price/>  ;
            case '加價美容' : return <Extra_Beauty_Price/>  ;

            // # 帳號管理
            case '帳號管理' : return <Account_List /> ;

            // # 員工管理
            case '員工管理' : return <Employees_List /> ;

            // # 權限管理
            case '個別店家' : return <Auth_Shop_List /> ;
            case '店家成員' : return <Auth_Member_List /> ;

            // # 資料管理
            case '洗美備註' : return <BathBeauty_List /> ;
            case '拒接客戶' : return <Reject_Customer_List /> ;
            case '拒接寵物' : return <Reject_Pet_List /> ;
            case '服務異常' : return <Error_List /> ;
            case '銷單資料' : return <Delete_Service_List /> ;
            case '封存資料' : return <Archive_List /> ;

            case '方案資料' : return <Plan_Data_List /> ;

            // case '方案逾期' : return <Plan_Expire_List /> ;
            case '方案逾期' : return <Plans /> ;
          
            // # 系統設定
            case '寵物品種' : return <Species_List />  ;
            case '熱門時段' : return <Holidays_List />  ;

            // # 操作日誌
            case '操作日誌' : return <Log_List />  ;

            default : return null ;

        }

    } ;


    // 目前登入者所屬店家 id
    const shop_Id = useAccount_Shop_Id() ;

    // # 紅點顯示待處理數量
    const customer_Reject_Process_Num  = useEffect_Shop_Customer_Reject_Process_Num( shop_Id ) ; // 客戶 ( 拒接 "審核中" : 數量 )   
    const pet_Reject_Process_Num       = useEffect_Shop_Pet_Reject_Process_Num( shop_Id ) ;      // 寵物 ( 拒接 "審核中" : 數量 )    
    const service_Error_In_Process_Num = useEffect_Shop_Service_Error_Process_Num( shop_Id ) ;   // 服務 ( 異常 "未處理" : 數量 )   
  
    // 資料管理( 第二層 )顯示待處理數量
    const dataManagement_Note_Num      = useEffect_Shop_Alert_Total_Num( shop_Id ) ;      



    // 預設點選
    useEffect( () => {

       click_Second( "財務管理" ) ;
       
    } , [] ) ;


    return <>

             {  /* 第 2 層選項 */ }
             <div>

                 {
                    Second_Nav.map( ( item , index ) => {

                        /*

                           # 只有狗狗公園帳號 ( shop_Id === 1 )，才顯示 :
                                    
                             * [ 帳號管理 ] 標籤
                             * [ 系統設定 ] 標籤 ( 寵物品種 )
                                  
                        */ 
                       
                        if( shop_Id !== 1 && item.title === "帳號管理"  ) return false ;
                        if( shop_Id !== 1 && item.title === "系統設定"  ) return false ;


                        // 櫃檯人員，僅顯示 _ 管理區 > 現金績效 2023.11.27
                        if( positionType === '櫃台' || positionType === '計時櫃台' ) return ;
                        
                        
                        return <b key       = { index }
                                  className = { "relative pointer tag is-medium is-success m_Right_30 " + ( currentSecond === item.title ? "" : "is-light" )  }
                                  onClick   = { () => click_Second( item.title ) } >
                                  
                                  { /* 紅點顯示 */ }
                                  { 
                                     ( item.title === '資料管理' && dataManagement_Note_Num > 0 ) && 
                                         <b className='redDot'> { dataManagement_Note_Num } </b> 
                                  }
                               
                                  { /* Icon、標題 */ }
                                  <i className = { item.icon }></i> &nbsp; { item.title }
                               
                               </b>

                    })
                 }

             </div>

             { /* 第 3 層選項 */ }
             { currentThird &&

                <>

                     { 
                         Third_Nav.map( ( item , index ) => {

                            return <b key       = {index}
                                      className = { "relative pointer tag m_Top_30 m_Bottom_20 m_Right_30 is-medium " + ( currentThird === item ? "is-info" : "is-white" ) }
                                      onClick   = { () => click_Third( item ) } > 
                                     
                                      { /* 紅點顯示 */ }

                                      { 
                                        ( item === '拒接客戶' && customer_Reject_Process_Num > 0 ) && 
                                           <b className="redDot"> { customer_Reject_Process_Num } </b> 
                                      }

                                      { 
                                        ( item === '拒接寵物' && pet_Reject_Process_Num > 0 ) &&
                                           <b className="redDot"> { pet_Reject_Process_Num } </b> 
                                      }

                                      { 
                                        ( item === '服務異常' && service_Error_In_Process_Num > 0 ) && 
                                          <b className="redDot"> { service_Error_In_Process_Num } </b> 
                                      }
                                      
                                      { item　}

                                    </b>

                        })
                     }

                </>

             }

             <br/><hr/><br/>

             { /* 管理專區 _ 各分類頁面元件 */ }

             { /* 第二層 */ }
             { currentSecond && show_PageComponent( currentSecond ) }

             { /* 第三層 */ }
             { currentThird && show_PageComponent( currentThird ) }

           </>

} ;

export default Management ;
