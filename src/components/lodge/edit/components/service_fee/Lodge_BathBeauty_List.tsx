
import { FC } from 'react' ;


type List = {

   index            : number ;
   item             : any ;
   click_DeleteItem : ( index : number ) => void ;

}


// 洗澡、美容：新增列表
const Lodge_BathBeauty_List : FC< List > = ( { index , item , click_DeleteItem } ) => {


    return <div className = "column is-offset-1 is-10-desktop relative" >

                { item.method === "現金" && 
                    <>
                        <b className = "delete relative m_Right_15" style = {{ top : "5px" }} onClick = { () => { click_DeleteItem( index ) } } ></b>
                        <b className = "tag is-medium is-white fBlue"> { item.item } ( { item.method } ) </b> _ 
                        <b className = "tag is-medium is-white fDred"> { item.amount } 元 </b>
                        { ( item.date !== 'Invalid date' ) && <span className = "m_Left_15" > 日期 : <b> { item.date } </b></span> } 
                        { item.note && <span className = "m_Left_15" > 備註 : <b> { item.note } </b></span> }
                    </>
                }

                { item.method === "方案" && 
                    <>
                        <b className = "delete relative m_Right_15" style = {{ top : "5px" }} onClick = { () => click_DeleteItem( index ) } ></b>
                        <b className = "tag is-medium is-white fBlue"> { item.item } ( { item.method }  ) </b> _ 
                        <b className = "tag is-medium is-white fDred">  1 次 </b>
                        { item.amount && <span className = "m_Left_15"  > 金額 : <b> { item.amount } </b> 元 </span> }
                        { ( item.date !== 'Invalid date' ) && <span className = "m_Left_15" > 日期 : <b> { item.date } </b></span> } 
                        { item.note && <span className = "m_Left_15" > 備註 : <b> { item.note } </b></span> }
                    </>
                }

                { item.method === "贈送" && 
                    <>
                        <b className = "delete relative m_Right_15" style = {{ top : "5px" }} onClick = { () => { click_DeleteItem( index ) } } ></b>
                        <b className = "tag is-medium is-white fBlue"> { item.item } ( { item.method } ) </b> _
                        <b className = "tag is-medium is-white fDred">  1 次 </b>
                        { ( item.date !== 'Invalid date' ) && <span className = "m_Left_15" > 日期 : <b> { item.date } </b></span> } 
                        { item.note && <span className = "m_Left_15" > 備註 : <b> { item.note } </b></span> }
                    </>
                }

            </div>

} ;

export default Lodge_BathBeauty_List
       