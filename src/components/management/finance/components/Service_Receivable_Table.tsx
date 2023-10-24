/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import Extra_Fee_Info from './sub_components/Extra_Fee_Info';
import { sort_ObjAttr } from 'fp/tool';
import { set_Modal } from "store/actions/action_Global_Layout" ;


type Table = {

  data : any[] ;

}




// @ 表單 : 應收款 ( 洗澡、美容 )
const Service_Receivable_Table = ( { data } : Table ) => {

    const dispatch = useDispatch() ;

  
    // 點選 _ 服務單
    const click_Service = ( service : any ) => dispatch( set_Side_Panel( 
                                                                         true ,
                                                                         <Update_Service /> , 
                                                                         { service_Type : service['service_type'] , preLoadData : service } 
                                                                       ) ) ;


    
    // 依照 q_code 排序
    const _data = sort_ObjAttr( 'q_code' , 'asc' )( data ) ;
    


   return  <table className="table is-fullwidth is-hoverable m_Bottom_100" >

                <thead>

                    <tr>

                      <th> 項 目    </th>
                      <th> 寵物資訊 / 加價內容  </th> 
                      <th> 金 額    <span className="f_10 fDblue"> ( 應 收 ) </span> </th>
                      {/* <th> 折 扣    </th> */}
                      <th> 應收帳款  <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                      <th style={{ width:'210px' }}> 付款方式  </th>
                      <th> 備 註    </th>

                    </tr>

                </thead>

                <tbody>

                    { 
                      
                      _data.map( ( x : any , y : number ) => {

                            const extra_Fee_Id = x?.extra_fee_id ; // 加價單 id 
                            const is_Deleted   = x?.is_delete ;   // 加價單是否已經被刪除

                            // # 加價單
                            if( extra_Fee_Id ){

                                // 目前所點選服務單 id
                                const service_Id   = x?.service_id ;
                                const service_Type = x?.service_type as '基礎' | '洗澡' | '美容' ;

                                if( is_Deleted === 1 ) return false ;  //  排除 _ 已經被刪除的加價單

                                return <tr key = { y }> 

                                          <td className="td_Left"> 
                                            
                                             <b className = { `tag is-medium pointer` } 
                                                onClick   = { () => dispatch( set_Modal( true ,
                                                                                         <Extra_Fee_Info data = { x } /> , 
                                                                                         { data : null , modal_Style : { width : "100%" , left : "0%" , top : "8%" } } )) }> 

                                                <i className = "fas fa-plus-circle"></i>&nbsp;加價 ( { extra_Fee_Id } ) &rarr; &nbsp; 
                        
                                                { service_Type }單 ( { service_Id } )
                     
                                             </b>

                                          </td>   

                                          <td className="td_Left"> { x?.pet_name } ( { x?.pet_species } ) </td>                                  
                                          <td> { x?.amount_paid } </td>                                  
                                          <td> { x?.amount_paid } </td>                                  
                                          <td className="td_Left relative"> 
                                           
                                            &nbsp;現金 

                                            <span className="absolute f_9" style={{ top:'6px' , right:'-10px' }}>  
                                                付款日期 :&nbsp; 
                                                { x?.payment_date ? x.payment_date?.slice( 5 , 10 ) : <span className="fRed">未填寫</span> } 
                                            </span>  

                                          </td>                                  
                                          <td></td>                                  
                                
                                       </tr>

                            } 

                          
                            // # 一般洗美服務                         
                            return <tr key = { y }>

                                      { /* 項目 */ }
                                      <td className="td_Left">

                                         <b className="tag is-medium pointer" onClick = { () => click_Service( x ) } >

                                           { /* 標示：方案加價  */ }
                                           {  x?.payment_method === '方案' &&  <b className="fRed m_Right_10"> 方案加價 </b> }  

                                           { x['payment_type'] }  &nbsp;

                                           <span className="f_9"> { x['service_status'] === '預約_今天' || x['service_status'] === '預約_未來' ? '( 預約 )' : '( 現場 )' } </span>
                                         
                                           &nbsp; <b className="tag is-white is-rounded"> Q{ x['q_code'] } </b>
                                         </b>

                                      </td>
    
                                      { /* 寵物訊息 */ }
                                      <td className="td_Left"> 
                                         { 
                                            x?.pet?.name ?  
                                              <span> { x?.pet?.name } ( { x?.pet?.species } )  </span>  : 
                                              <span className="fRed"> 該寵物已刪除               </span>  
                                         }
                                      </td>
                                      
                                      { /* 金額 ( 應收 ) */ }
                                      <td style={{width:'130px'}}> { x['amount_payable'] }   </td>
                                    
                                     
                                      { /* 應收帳款 ( 實收 ) */ }
                                      <td style={{width:'160px'}}> { x['amount_paid'] } </td>
                                      
                                      { /* 付款方式 */ }
                                      <td className="td_Left relative"> 
                                      
                                        &nbsp;
                                        
                                        { /* 付款方式 */ }
                                        { x?.payment_method === '方案' ? '現金' : x['payment_method'] }   

                                          <span className="absolute f_9" style={{ top:'6px' , right:'-10px' }}>  
                                                付款日期 :&nbsp; 
                                                { x?.payment_date ? x.payment_date?.slice( 5 , 10 ) : <span className="fRed">未填寫</span> } 
                                          </span>  
                                    
                                          <span className="absolute f_9" style={{ top:'22px' , right:'-10px' }}> 到店日期 : { x?.service_date?.slice( 5 , 10 ) } </span>     
                                    
                                     </td>

                                     <td className="td_Left"> { x['admin_service_note'] }     </td>

                                   </tr>

                      }) 
                        
                    }

                </tbody>

           </table>

} ;


export default Service_Receivable_Table
       
