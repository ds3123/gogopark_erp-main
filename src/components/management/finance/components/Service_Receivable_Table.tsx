/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import Extra_Fee_Info from './sub_components/Extra_Fee_Info';
import { sort_ObjAttr } from 'fp/tool';
import { set_Modal } from "store/actions/action_Global_Layout" ;
import { useCallback , useState , useEffect } from "react";
import { get_Sum } from "utils/number/number";
import { switch_Service_Id } from "utils/data/switch" ;


type Table = {

  data : any[] ;

}


type Total = {

   pickup_fee     : number ;
   amount_payable : number ;
   amount_paid    : number ;

} ;




// @ 表單 : 應收款 ( 洗澡、美容 )
const Service_Receivable_Table = ( { data } : Table ) => {

    const dispatch = useDispatch() ;

    // 小計費用
    const [ total , set_Total ] = useState< Total >({
                                                      pickup_fee     : 0 , // 接送費
                                                      amount_payable : 0 , // 應收金額
                                                      amount_paid    : 0   // 實收金額
                                                    }) ;
  
    // 點選 _ 服務單
    const click_Service = ( service : any ) => dispatch( set_Side_Panel( 
                                                                         true ,
                                                                         <Update_Service /> , 
                                                                         { service_Type : service['service_type'] , preLoadData : service } 
                                                                       ) ) ;

    // 依照 q_code 排序
    const sort_Data = sort_ObjAttr( 'q_code' , 'asc' )( data ) ;


    // 加總 _ 小計金額
    const cal_Total = useCallback( () => {

            // 取得金額
            const pickup  = data.map( x => x?.pickup_fee === undefined ? 0 : x?.pickup_fee ) ; 
            const payable = data.map( x => x?.amount_payable === undefined ? x?.amount_paid : x?.amount_payable ) ; 
            const paid    = data.map( x => x?.amount_paid ) ; 

            // 加總金額
            const pickup_Total  = get_Sum( pickup ) ;
            const payable_Total = get_Sum( payable ) ;
            const paid_Total    = get_Sum( paid ) ;

            set_Total({ ...total , pickup_fee     : pickup_Total ,
                                   amount_payable : payable_Total ,
                                   amount_paid    : paid_Total
                        }) ;
      
    } , [ data ] ) ;


    // 加總、設定 _ 小計金額
    useEffect( () => {
      
       cal_Total() ;
       
    } , [ data ] ) ;           


   return  <table className = "table is-fullwidth is-hoverable m_Bottom_100" >

                <thead>
                    <tr>
                      <th> 項 目    </th>
                      <th> 寵物資訊 / 加價內容  </th> 
                      <th> 付款日期 </th>
                      <th> 接送費 </th>
                      <th> 金 額    <span className="f_10 fDblue"> ( 應 收 ) </span> </th>
                      <th> 應收帳款  <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                      <th> 備 註    </th>
                    </tr>
                </thead>
                
                <tbody>

                    { 
                      
                      sort_Data.map( ( x : any , y : number ) => {

                            const extra_Fee_Id = x?.extra_fee_id ; // 後續新增 _ 加價單 id 

                            // 1. 後續新增 _ 加價單
                            if( extra_Fee_Id ){

                                // 目前所點選服務單 id
                                const service_Id   = x?.service_id ;
                                const service_Type = x?.service_type as '基礎' | '洗澡' | '美容' ;
                            
                                return <tr key = { y }> 

                                          <td className = "td_Left" > 
                                            
                                             <b className = { `tag is-medium pointer fDblue` } 
                                                onClick   = { () => dispatch( set_Modal( true ,
                                                                                         <Extra_Fee_Info data = { x } /> , 
                                                                                         { data : null , modal_Style : { width : "100%" , left : "0%" , top : "8%" } } )) }> 

                                                <i className = "fas fa-plus-circle"></i>&nbsp;加價單&nbsp;
                                                <span className = "f_9" > ( id : { extra_Fee_Id } ) </span>&nbsp;&rarr;&nbsp; 
                                                { service_Type }單&nbsp;<span className = "f_9" > ( id : { service_Id } ) </span>
                     
                                             </b>

                                          </td>   
                                          <td className = "td_Left" > { x?.pet_name } ( { x?.pet_species } ) </td>      
                                          <td> { ( x?.payment_date ).slice( 5 , 10 ) } </td>
                                          <td> 0 </td>                                 
                                          <td> { x?.amount_paid } </td>                                  
                                          <td> { x?.amount_paid } </td>    
                                          <td></td>                                  
                                
                                       </tr>

                            } 
                          
                            // # 2. 一般洗美服務                         
                            return <tr key = { y }>

                                      { /* 項目 */ }
                                      <td className = "td_Left" >

                                         <b className = "tag is-medium pointer" onClick = { () => click_Service( x ) } >


                                          { ( x?.payment_method !== '方案' && ( x?.extra_service || x?.extra_beauty ) ) &&
                                             <>
                                                 <i className = "fas fa-plus-circle fDblue"></i> &nbsp;
                                             </> 
                                          
                                          } 


                                           { /* for 方案加價  */ }
                                           {  x?.payment_method === '方案' && 

                                             <>
                                                <b className = "fDblue m_Right_10" > 
                                                   <i className = "fas fa-plus-circle"></i> 方案加價 &rarr;&nbsp; 
                                                   { x?.service_type }單 <span className = "f_9" > ( id : { switch_Service_Id( x ) } ) </span>
                                                </b> 
                                             </>
                                            
                                            } 

                                           { /* 方案 ( 加價 ) 不顯示 */ }
                                           { x?.payment_method === '方案' || 
                                           
                                             <>
                                             
                                                { x['payment_type'] } &nbsp;

                                                <span className = "f_9" >
                                                    { x['service_status'] === '預約_今天' || x['service_status'] === '預約_未來' ? 
                                                     `( 預約 / id ${ switch_Service_Id( x ) } )` : `( 現場 / id ${ switch_Service_Id( x ) }  ) ` } 
                                                </span>

                                                &nbsp; <b className = "tag is-white is-rounded" > Q{ x['q_code'] } </b>

                                             </> 
                                             
                                           } 
                                          
                                         </b>

                                      </td>
    
                                      { /* 寵物訊息 */ }
                                      <td className = "td_Left" > 

                                         { 
                                            x?.pet?.name ?  
                                              <span> { x?.pet?.name } ( { x?.pet?.species } )  </span>  : 
                                              <span className="fRed"> 該寵物已刪除               </span>  
                                         }

                                      </td>

                                      <td> { ( x?.payment_date ).slice( 5 , 10 ) } </td>

                                      <td> { x?.pickup_fee }       </td>
                                      
                                      { /* 金額 ( 應收 ) */ }
                                      <td> { x['amount_payable'] }  </td>
                                    
                                      { /* 應收帳款 ( 實收 ) */ }
                                      <td> { x['amount_paid'] }     </td>
                                      
                                      { /* 付款方式 */ }
                                      <td className = "td_Left" > { x['admin_service_note'] }  </td>

                                   </tr>

                      }) 
                        
                    }
   
                    { /* 小計列 */ }
                    { sort_Data.length > 0 &&

                        <tr style = {{ background : "rgba(230,230,230,.4)" }}>
                              <td colSpan = { 3 } className = "fBold" > 小 計 </td>
                              <td className = "fDblue" > { total.pickup_fee } </td>
                              <td className = "fRed" >   { total.amount_payable } </td>
                              <td className = "fRed" >   { total.amount_paid } </td>
                              <td>  </td>
                        </tr>

                    }

                </tbody>

           </table>

} ;


export default Service_Receivable_Table
       
