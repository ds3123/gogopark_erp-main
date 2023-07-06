/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-lone-blocks */
import { useEffect , useState } from "react"
import { useSelector } from "react-redux"
import Date_Picker from "templates/form/Date_Picker"
import usePagination from "hooks/layout/usePagination"

// React Hook Form
import { useForm } from "react-hook-form" ; 
import { IService } from "utils/Interface_Type" ;
import Usage_Note from "templates/note/Usage_Note" ; 
import { sort_Data_By_UpdatedDate } from 'utils/data/sort_data' ;
import { useRead_Services_GoneHome_UnPaid_By_Date } from "hooks/ajax_crud/useAjax_Read" ;
import { usePet_Apply_Reject , usePet_Is_Rejected } from 'hooks/data/usePet' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;

import { useFetch_Shop_Services_With_Delete_Error_On_ServiceDate } from "hooks/react-query/service/useFetchServices" ;
import { useFetch_ExtraFees_By_PaymentDate } from "hooks/react-query/service/useFetchServices"
import { useEffect_Service_Error } from "../hooks/useEffect_Service_Error"  ;


const note_Str = `此區塊列舉 :「轉異常」、「銷單」、「刪除加價單」、「已回家( 房 ) 情況下，應收金額與實收金額不符合」資料` ;


// @ 服務異常
const Service_Error = () => {
 

    // 登入者所屬店家 id
    const shop_Id      = useAccount_Shop_Id() ;

    // 報表日期
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;
    
    // React Hook Form
    const { control }  = useForm<IService>({ mode : "all" }) ;


    // ---------------------


    // 取得 _ 特定服務日期，[ 銷單 ] 與 [ 轉異常 ] 服務資料
    const services_Delete_Error = useFetch_Shop_Services_With_Delete_Error_On_ServiceDate( shop_Id , service_Date ) ;

    // 取得 _ 已回家( 房 ) 情況下，應付金額 與 實付金額 不符合   
    const is_GoHome_UnPaid      = useRead_Services_GoneHome_UnPaid_By_Date( shop_Id , service_Date ) ;

    // 取得 _ 特定日期，所有加價單
    const date_Extra_Fee        = useFetch_ExtraFees_By_PaymentDate( shop_Id , service_Date ) ; 


    // # 以下 2 種情況未納入，再確認 2023.01.10

    // 取得資料 _ 寵物：申請拒接中
    const pet_Is_Apply_Reject   = usePet_Apply_Reject() ;

    // 取得資料 _ 寵物：拒接
    const pet_Is_Rejected       = usePet_Is_Rejected() ;


    // 所有異常資料 _ 4 種類型 :「 轉異常 」、「 銷單 」、「 已回家( 房 ) 情況下，應收金額與實收金額不符合 」、「 被刪除的加價單 」
    const error_Data = useEffect_Service_Error( services_Delete_Error , is_GoHome_UnPaid , date_Extra_Fee ) ;





    

    
    return <>
                <b className="tag is-large is-danger is-light m_Bottom_20"> <i className="fas fa-exclamation"></i> &nbsp; 服務異常 </b>

	            { /* 說明 */ }  
                <div className="m_Left_15 m_Bottom_50"> <Usage_Note  note = { note_Str } />  </div>    

                <div className="columns is-multiline is-mobile relative m_Bottom_50">

                    { /* 異常日期 */ }
                    <div className="column is-3-desktop">
                        <b className="f_14"> 查詢日期 </b>
                        <Date_Picker control={ control }  name="service_Date" default_Date={ new Date() } />
                    </div>

                </div>

                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                          <th> 服務類別 </th>
                          <th> 異常說明 </th>
                          <th> 主人姓名 </th>
                          <th> 主人手機 </th>
                          <th> 寵物資訊 </th>
                          <th> 經手人   </th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            error_Data.map( ( x : any , y : number ) => {

                                   let note = '' ;

                                   const is_Paid_Error = x['amount_payable'] !== x['amount_paid'] ;

                                   // * 異常原因
                                   if( x['is_error'] === 1 ) note = x['error_cause'] ;  // 一般異常
                                   if( x['is_error'] !== 1 ) note = '銷 單' ;

                                   if( is_Paid_Error && x['amount_paid'] === 0 ) note = '尚未付款' ;   
                                   if( is_Paid_Error && x['amount_paid'] > 0 )   note = '僅付部分金額' ; 
                                   if( x['amount_paid'] > x['amount_payable'] )  note = '實付金額，超過應付金額' ; 


                                   // 被刪除 : 加價單
                                   const extra_fee_id = x?.extra_fee_id ;

                                   const admin_User = x['admin_user'] === '測試員' ? '店長' : x['admin_user'] ;

                                   // 主人姓名
                                   const cus_Name   = !extra_fee_id ? x?.customer?.name : x?.cus_name ;  
                                    
                                   // 主人手機
                                   const cus_Mobile = !extra_fee_id ? x?.customer?.mobile_phone : x?.cus_mobile ;  

                                 

                                return <tr key={y}>
                                        
                                       

                                         { /* 服務類別 */ }
                                         <td className="td_Left"> 
                                            { x['service_type'] }  
                                            { !extra_fee_id ?  <span> ( Q{ x['q_code'] } ) </span> : <span> ( id : { x?.service_id } )  </span> }
                                         </td>

                                         { /* 異常說明 */ }
                                         <td className="td_Left"> 
                                             <b className="fDred"> { !extra_fee_id ? note : `刪除 _ 加價單 ( id : ${ extra_fee_id } )`  } </b>           
                                         </td>

                                         { /* 主人姓名 */ }
                                         <td> { cus_Name }  </td>

                                         { /* 主人手機 */ }
                                         <td> { cus_Mobile } </td>

                                        { /* 寵物資訊 */ }
                                         <td className="td_Left">

                                            { !extra_fee_id ?  
                                               <span> 
                                                  { x['pet'] ? x['pet']['name'] : ''  }&nbsp;( { x['pet'] ? x['pet']['species'] : ''  } )
                                               </span>
                                                :
                                                <span>
                                                  { x?.pet_name } ( { x?.pet_species } )
                                                </span> 
                                             }

                                         </td>

                                         { /* 經手人 */ }
                                         <td> 
                                            { ( x['error_submitter'] === '測試員'  ) ? '店長' : admin_User } 
                                         </td>
                                      
                                       </tr>

                            })
                        }

                    </tbody>

                </table>

               

           </>

} ;

export default Service_Error