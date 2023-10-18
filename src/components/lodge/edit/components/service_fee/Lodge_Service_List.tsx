/* eslint-disable new-parens */
/* eslint-disable react/jsx-pascal-case */

import { FC , useState } from 'react' ;
import moment from "moment" ;
import Lodge_BathBeauty_List from './Lodge_BathBeauty_List' ;
import DatePicker from "react-datepicker"
import { before , after } from 'utils/aop/aop_form' ;
import { validate_BathBeauty } from '../../functions/validate';

type List = {

  currentTag       : "洗澡" | "美容" ;
  itemArr          : any[] ;

  click_AddItem    : ( item : any ) => void ;
  click_DeleteItem : ( index : number ) => void

}



// 新增項目清單
const Lodge_Service_List : FC< List > = ({ currentTag , itemArr , click_AddItem , click_DeleteItem }) => {

        
    // 付款方式
    const [ method , set_Method ] = useState< "現金" | "方案" | "贈送" >( "現金" ) ; 

    // 付款金額
    const [ amount , set_Amount ] = useState< string >( "" ) ;

    // 日期
    const [ date , set_Date ] = useState< Date | null >( null ) ;

    // 備註
    const [ note , set_Note ] = useState< string >( "" ) ;


    // 為新增函式，添加 _ 驗證函式 ( AOP )
    click_AddItem = before( click_AddItem , validate_BathBeauty( method , amount ) ) ;


    // 為新增函式，添加 _ 事後清除欄位 ( AOP )
    click_AddItem = after( click_AddItem , () => { set_Amount( '' ) ; set_Date( null )  ; set_Note( '' )  } ) ;

    
    // 日期變動
    const handle_ServiceDate = ( date : any ) => set_Date( date ) ;


  return <div className = "columns is-multiline is-mobile m_Top_10 m_Bottom_20 m_Left_10"  >

            { /* 付款方式 */ }
            <div className = "column is-2-desktop" >

                <p> 支付方式 </p>
                <div className="select" >
                    <select onChange = { e => set_Method( e.target.value as "現金" | "方案" | "贈送" ) } >
                        <option value = "現金" > 現金 </option>
                        <option value = "方案" > 方案 </option> 
                        <option value = "贈送" > 贈送 </option> 
                    </select>
                </div>

            </div>

            { /* 項目金額 */ }

            { method !== '贈送' &&
                
                <div className = "column is-2-desktop" >

                    <p>  { method === '現金' && <span className="fRed"> * </span> } 項目金額 </p>

                    <div className="control has-icons-left" style={{ width : "150px" }}>
                        <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                        <input type = "number" className = "input" value = { amount } min = "0" onChange = { e => set_Amount( e.target.value ) } />
                    </div>
                    
                </div>

            }

            { /* 日期 */ }
            <div className = "column is-2-desktop relative" > 
                
                    使用日期 
                    <div className="control has-icons-left" style={{ width : "150px" }}>

                        <span className="icon is-small is-left"> <i className="far fa-calendar-alt"></i> </span>

                        <DatePicker className = "input"
                                    onChange  = { date => { handle_ServiceDate( date ) ; } }
                                    selected  = { date } />

                    </div>
                
            </div>

            { /* 備註 */ }
            <div className = "column is-4-desktop" > 
            
                <p> 使用備註 </p>
                <div className="control has-icons-left" >
                     <span className="icon is-small is-left"> <i className="fas fa-pen"></i> </span>
                     <input type = "text" className = "input" value = { note } onChange = { e => set_Note( e.target.value ) }  />
                </div>
                 
            </div>

            { /* 新增按鈕 */ }
            <div className = "column is-1-desktop" >

                <b className = "tag is-large hover relative" style = {{ left : "0px" ,  top : "20px" }} 
                     onClick = { () => click_AddItem( { method : method , item : currentTag , amount : amount , date : moment( date ).format( 'YYYY-MM-DD' ) , note : note }  ) } > 
                    
                    <span className = "f_12" > <i className = "fas fa-plus-circle"></i>&nbsp;新增項目 </span> 

                </b>

            </div>

            { /* 服務列表 */ }
            { itemArr.map( ( item : any , index : number ) => <Lodge_BathBeauty_List key = { index } index = { index } item = { item } click_DeleteItem = { click_DeleteItem } /> ) }
             
         </div>
} ;

export default Lodge_Service_List  