/* eslint-disable react-hooks/exhaustive-deps */


import { FC , useEffect } from 'react' ;
import { useEffect_Custom_Fee } from "../../../hooks/useEffect_ServiceTag" ;
import { Service } from '../../Lodge_Service' ;
import { before , after } from 'utils/aop/aop_form' ;
import { validate_Custom } from '../../functions/validate' ;



type Item = {
              title  : string ,
              amount : string
            } ;



type Custom = {

   itemArr          : any[] ;
   click_AddItem    : ( item : any ) => void ;
   click_DeleteItem : ( index : number ) => void

}



// 追加 _ 自訂費用
const Lodge_Custom_Fee : FC< Custom > = ( { itemArr , click_AddItem , click_DeleteItem  } ) => {


    // 自訂費用項目
    const { item , change_Title , change_Amount , set_Item } = useEffect_Custom_Fee();


    // 為新增函式，添加 _ 驗證函式 ( AOP )
    click_AddItem = before( click_AddItem , validate_Custom( item.title , item.amount ) ) ;

    // 為新增函式，添加 _ 事後清除欄位 ( AOP )
    click_AddItem = after( click_AddItem , () => set_Item( { title  : ""  , amount : "" } ) ) ;


    return <div className = "columns is-multiline is-mobile m_Top_10 m_Bottom_20 m_Left_10" >

                <>

                    <div className = "column is-4-desktop relative" >

                        <p> <span className="fRed"> * </span> 項目名稱 </p>
                        <div className="control has-icons-left" >
                           <span className="icon is-small is-left"> <i className="fas fa-list"></i> </span>
                           <input id = 'custom_fee_name' type = "text" className = "input" value = { item.title } onChange = { e => change_Title( e.target.value ) }  />
                        </div>

                    </div>

                    <div className = "column is-2-desktop relative" >

                        <p> <span className="fRed"> * </span>  項目金額 </p>
                        <div className="control has-icons-left" style={{ width : "150px" }}>
                           <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                           <input type = "number" className = "input" value = { item.amount }  onChange = { e => change_Amount( e.target.value ) } />
                        </div>   

                    </div>

                    <div className = "column is-2-desktop" >

                        <b className = "tag is-large hover relative" style = {{ top : "20px" }} onClick = { () => click_AddItem( item ) } > 
                            <span className = "f_12" > <i className = "fas fa-plus-circle"></i>&nbsp;新增項目 </span> 
                        </b>

                    </div>
                
                </>

                { 

                  itemArr.map( ( item : Item , index : number ) => {

                     return <div key = { index } className = "column is-offset-1 is-10-desktop relative" >

                               <b className = "delete relative m_Right_15" style = {{ top : "5px" }} onClick = { () => click_DeleteItem( index ) } ></b>
                               <b className = "tag is-medium is-white fBlue"> { item.title  }    </b> _ 
                               <b className = "tag is-medium is-white fDred"> { item.amount } 元 </b>

                            </div>

                  } ) 

                }

            </div> 


} ;


export default Lodge_Custom_Fee
       