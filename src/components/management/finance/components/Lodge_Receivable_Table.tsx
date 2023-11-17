/* eslint-disable react-hooks/exhaustive-deps */

import { FC , useState , useCallback , useEffect } from 'react' ;
import { get_Sum } from 'utils/number/number';

type Table = {

  data : any[] ;

}


type Total = {

    pickup_fee     : number ;
    bath_fee       : number ;
    beauty_fee     : number ;
    amount_payable : number ;
    amount_paid    : number ;
 
 } ;


// @  表單 : 應收款 ( 住宿、安親 )
const Lodge_Receivable_Table : FC< Table > = ( { data } ) => {


    // 小計費用
    const [ total , set_Total ] = useState< Total >({
                                                       pickup_fee     : 0 , // 接送費
                                                       bath_fee       : 0 , // 洗澡費
                                                       beauty_fee     : 0 , // 美容費
                                                       amount_payable : 0 , // 應收金額
                                                       amount_paid    : 0   // 實收金額
                                                    }) ;

    // 加總 _ 小計金額
    const cal_Total = useCallback( () => {

            
            // 取得金額
            const pickup  = data.map( x => x?.pickup_fee  ) ; 
            const bath    = data.map( x => x?.lodge_bath_price  ) ; 
            const beauty  = data.map( x => x?.lodge_beauty_price  ) ; 
            const payable = data.map( x => x?.amount_payable ) ; 
            const paid    = data.map( x => x?.amount_paid ) ; 

            // 加總金額
            const pickup_Total  = get_Sum( pickup ) ;
            const bath_Total    = get_Sum( bath ) ; 
            const beauty_Total  = get_Sum( beauty ) ; 
            const payable_Total = get_Sum( payable ) ;
            const paid_Total    = get_Sum( paid ) ;

            set_Total({ ...total , pickup_fee     : pickup_Total ,
                                   bath_fee       : bath_Total ,
                                   beauty_fee     : beauty_Total ,
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
                        <th> 寵物資訊 </th>
                        <th> 付款日期 </th>
                        <th> 洗澡費   </th>
                        <th> 美容費   </th>
                        <th> 接送費   </th>
                        <th> 金 額    <span className="f_10 fDblue"> ( 應 收 ) </span> </th>
                        <th> 應收帳款 <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                        <th> 備 註    </th>
                    </tr>

                </thead>

                <tbody>

                   { 
                      
                      data.map( ( x : any , y : number )=> {

                            return <tr key = { y }>

                                       <td> { x?.service_status }  </td> 
                                       <td className = "td_Left" > { x['pet']['name'] } ( { x['pet']['species'] } )</td> 
                                       <td> { ( x?.payment_date ).slice( 5 , 10 ) }               </td>
                                       <td> { x?.lodge_bath_price   ? x?.lodge_bath_price   : 0 } </td>
                                       <td> { x?.lodge_beauty_price ? x?.lodge_beauty_price : 0 } </td>
                                       <td> { x?.pickup_fee }         </td>
                                       <td> { x?.amount_payable }     </td> 
                                       <td> { x?.amount_paid }        </td> 
                                       <td className = "td_Left" > { x?.admin_service_note } </td> 
                                       
                                   </tr>

                      }) 
                        
                   }

                   { /* 小計列 */ }
                   {
                      data.length > 0 && 

                        <tr style = {{ background : "rgba(230,230,230,.4)" }}>

                           <td colSpan = { 3 } className = "fBold" > 小 計 </td> 
                           <td className = "fDblue" > { total.bath_fee }       </td> 
                           <td className = "fDblue" > { total.beauty_fee }     </td> 
                           <td className = "fDblue" > { total.pickup_fee }     </td> 
                           <td className = "fRed" >   { total.amount_payable } </td> 
                           <td className = "fRed" >   { total.amount_paid }    </td> 
                           <td>                                                </td> 

                        </tr>

                   }
                    
                </tbody>

            </table> 

} ;


export default Lodge_Receivable_Table
       