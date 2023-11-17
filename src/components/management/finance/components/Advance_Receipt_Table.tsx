/* eslint-disable react/jsx-pascal-case */

import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import Update_Plan from "components/plan/edit/Update_Plan" ;
import Update_Service from "components/services/edit/Update_Service" ;
import { get_Pet_Plan_Adjust_Price } from "fp/management/finance/plan/get_Plan_Services";




type Table = {

  data : any[] ;

}


// @ 表單 : 預收款 ( 方案 : 包月洗澡、包月美容 )
const Advance_Receipt_Table = ( { data } : Table ) => {
  

    const dispatch = useDispatch() ;

    
    // 點選 _ 方案
    const click_Plan_Type = ( plan : any ) => dispatch( set_Side_Panel( true , <Update_Plan /> , {  preLoadData : plan } ) ) ;


    // 點選 _ 服務單
    const click_Service = ( service : any ) => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : service['service_type'] ,  preLoadData : service } ) ) ;



    return <table className="table is-fullwidth is-hoverable m_Bottom_100">

              <thead>
                  <tr>
                    <th> 項 目    </th>
                    <th> 寵物資訊 </th>
                    <th> 付款日期 </th>
                    <th> 方案基本價格 </th>
                    <th> 寵物調整價格 </th>
                    <th> 實收金額 </th>
                    <th> 備 註    </th>
                  </tr>
              </thead>

              <tbody>

                  {

                    data.map( ( x : any , y : number ) => {

                        const plan_type        = x?.plan_type ;       // 方案類型 ( 包月洗澡 / 包月美容 )
                        const plan_basic_price = x?.plan_basic_price  // 方案基本價格
                        const pet              = x?.pet ;             // 寵物資料


                        // 依照方案類型，取得 _ 該寵物 : 方案調整價格
                        const pet_plan_adjust_price = get_Pet_Plan_Adjust_Price( pet , plan_type ) ;

                        
                        return <tr key = { y } >

                                  <td className = "td_Left" > 

                                        { /* 方案  */ }
                                        { x['plan_type'] && 

                                            <b className = { `tag is-medium pointer is-light ${ plan_type === '包月洗澡' ? 'is-success' : 'is-danger' } ` } onClick={ () => click_Plan_Type( x ) } > 
                                               { x?.plan_type } &nbsp; <span className = "f_10" > ( { x?.id } ) </span>
                                            </b>  

                                        }   

                                        { /* 服務：基礎、洗澡、美容 ( 預付 ) */ } 
                                        { ( x['plan_type'] === undefined && !x['start_date'] ) &&

                                            <b className="tag is-medium pointer" onClick = { () => click_Service( x ) } >     

                                                { x['payment_type'] }  &nbsp;
                                                
                                                <span className="f_9"> { x['service_status'] === '預約_今天' || x['service_status'] === '預約_未來' ? '( 預約 )' : '( 現場 )' } </span>
                                              
                                                &nbsp; <b className="tag is-white is-rounded"> Q{ x['q_code'] } </b>

                                            </b>

                                        }   

                                        { /* 服務：安親、住宿 ( 預付 ) */ } 
                                        { ( x['plan_type'] === undefined && x['start_date'] ) &&

                                            <>  &nbsp;  { x['service_status'] }  </>

                                        }   

                                  </td>

                                  <td className = "td_Left" > { x['pet'] ? x['pet']['name'] : '' } ( { x['pet'] ? x['pet']['species'] : '' } )  </td>

                                  <td> { x['payment_date']?.slice(5,10) } </td>
           
                                  <td> { plan_basic_price }               </td>

                                  <td> 
                                     
                                      <span className = { `${ ( pet_plan_adjust_price && pet_plan_adjust_price !== plan_basic_price ) ? 'fDred' : '' }` } > 

                                          { ( plan_type && pet_plan_adjust_price ) ? pet_plan_adjust_price : '未調整' } 

                                      </span> 
                                
                                  </td>

                                  { /* 應收帳款 ( 實收 ) */ }
                                  <td> { x['amount_paid'] }  </td>
                                
                                  <td className="td_Left"> { x['admin_service_note'] } </td>
                              
                              </tr>

                    }) 
                  
                  }

              </tbody>

          </table>


} ;


export default Advance_Receipt_Table
       