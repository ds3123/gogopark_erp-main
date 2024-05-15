/* eslint-disable react/jsx-pascal-case */

import Date_Picker from "templates/form/Date_Picker"
import { useForm } from "react-hook-form" 
import { IService } from "utils/Interface_Type" 
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { set_Finance_Query_Date_Type } from 'store/actions/action_Finance'
import { useEffect_Is_Fetching_Status } from "../hooks/useEffect_Handle_DataFetching"


type Nav = {
 
    serviceReveivable_Total : number ;  // 洗澡美容 : 應收款
    usePlan_Total           : number ;  // 洗澡美容 : 扣 _ 預收款
    advanceReceipt_Total    : number ;  // 洗澡美容 : 預收款
    lodgeCare_Total         : number ;  // 住宿安親 : 應收款
    income_Total            : number ;  // 其他 : 收入
    expenditure_Total       : number ;  // 其他 : 支出

}


type Date = '付款日期' | '到店日期' ;


// @ 上方導覽區域 ( 報表日期、總計 )
const Nav_Info = ( { 
                     serviceReveivable_Total , 
                     usePlan_Total , 
                     advanceReceipt_Total ,
                     lodgeCare_Total ,
                     income_Total ,
                     expenditure_Total
                    } : Nav ) => {


   // 下載圖示
   const downloadIcon = <button className = "button is-loading is-white relative" style = {{ top : "-5px" }} ></button> ; 


   const dispatch = useDispatch() ;

   // 各區塊資料取得狀態，是否已完成
   const { 
           is_Fetching_Service_Receivable_Done ,     // 洗澡美容：應收
           is_Fetching_Deduct_Advance_Receipt_Done , // 洗澡美容：扣 _ 預收款
           is_Fetching_Advance_Receipt_Done ,        // 洗澡美容：預收款
           is_Fetching_Lodge_Receivable_Done         // 住宿安親：應收款
          } = useEffect_Is_Fetching_Status() ;


   // 查詢日期類型 
   const [ date_Type , set_Date_Type ] = useState< Date >( '付款日期' ) ;  


   // 點選 _ 日期類型 
   const click_Date_Type = ( type : Date ) => {

      set_Date_Type( type ) ;
      dispatch( set_Finance_Query_Date_Type( type ) ) ;
   
   } 


   // React Hook Form
   const { control } = useForm< IService >({ mode : 'all' }) ;


   const plus  = <b className = "f_16 fDblue" > + </b>
   const minus = <b className = "f_16 fDred" >  - </b>

   const note_1 = () => <> 洗澡美容 : 應收款 { plus } 洗澡美容 : 預收款 { plus } 住宿安親 : 應收款 { plus } 其他收入 { minus } 其他支出 </>
   const note_2 = () => <> 洗澡美容 : 應收款 
                      <b className = "fDred" > ( { is_Fetching_Service_Receivable_Done ? serviceReveivable_Total : downloadIcon } ) </b> 
                       { plus } 洗澡美容 : 扣 _ 預收款  <b className = "fDred" > ( { is_Fetching_Deduct_Advance_Receipt_Done ? usePlan_Total : downloadIcon } ) </b> </>
  

   // < 現金相關 > 各區塊資料皆下載完畢
   const is_All_Downloaded = is_Fetching_Service_Receivable_Done &&  // 洗澡美容 : 應收款
                             is_Fetching_Advance_Receipt_Done &&     // 洗澡美容 : 預收款
                             is_Fetching_Lodge_Receivable_Done ;     // 住宿安親 : 應收款
   
   // 總計金額
   const total_Amount = serviceReveivable_Total + advanceReceipt_Total + lodgeCare_Total + income_Total - expenditure_Total ;

   return  <div className = "columns is-multiline is-mobile m_Bottom_100">

                <div className = "column is-5-desktop">

                    <div className = "tag is-large is-white">
                        
                        <b className = { `tag is-medium is-rounded f_14 pointer  ${ date_Type === '付款日期' ? 'is-black' : 'hover' }` }
                           onClick   = { () => click_Date_Type( '付款日期' ) } > 
                            付款日期 
                        </b>  
                        
                        &nbsp;&nbsp;

                        {/* 
                        
                            <b className = { `tag is-medium is-rounded f_14 pointer  ${ date_Type === '到店日期' ? 'is-black' : 'hover' }` }
                               onClick   = { () => click_Date_Type( '到店日期' ) } > 
                                到店日期 
                            </b> &nbsp;
                        
                        */}
                             
                        &nbsp;
                        
                        <Date_Picker control={ control } name = "service_Date" default_Date={ new Date() } />

                    </div>
                    
                </div>

                    <div className = "column is-7-desktop relative">

                        { /* 績效 */ }
                        <div className = "tag is-large is-white relative" >

                            <b className = "m_Right_10" > 
                                 洗美績效 <span className = "f_13" > 總計 </span> :&nbsp; 
                                 <span className = "fRed"> 
                                 
                                   { 

                                        ( is_Fetching_Service_Receivable_Done && is_Fetching_Deduct_Advance_Receipt_Done ) ?
                                            serviceReveivable_Total + usePlan_Total : downloadIcon
                                        
                                   }
                                    
                                 </span> 元 
                            </b>

                            <span className = "f_11" > { note_2() } </span> 

                        </div> 

                        { /* 現金 */ }
                        <div className = "tag is-large is-white relative" >
                            
                            <b className = "m_Right_10" > 
                                 現金金額 <span className = "f_13" > 總計 </span> : 
                                 <span className="fRed"> { is_All_Downloaded ? total_Amount : downloadIcon } </span> 元 
                            </b> 

                            <span className = "f_11" > { note_1() } </span>

                        </div> 
                        
                    </div>

           </div>



} ;

export default Nav_Info
       