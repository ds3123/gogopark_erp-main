/* eslint-disable react/jsx-pascal-case */
import { FC } from 'react' ;
import Deduct_Advance_Receipt_Table_Row from "./sub_components/Deduct_Advance_Receipt_Table_Row" ; 



type Table = {

   data : any[] 

}


// @ 表單 : 扣 _ 預收款 ( 洗澡、美容 )
const Deduct_Advance_Receipt_Table : FC< Table >= ( { data } ) => {

    
   return <table className = "table is-fullwidth is-hoverable m_Bottom_100 relative" style = {{ width:"110%" , left : "-5%" }} >

                <thead>

                    <tr>
                        <th> 項 目   </th>
                        <th> 寵物資訊 </th> 
                        <th> 到店日期 </th>
                        <th> 付款方式 </th>
                        <th> 方案基本價格 </th>
                        <th> 寵物調整價格 </th>
                        <th className = "fGray" > 個體調整金額 </th>
                        {/* <th className = "fGray" > 接送費用 </th> */}
                        <th> 實收金額 </th>
                        <th> <span className = "fDblue" > 此次方案使用金額 </span> </th>
                    </tr>
                    
                </thead>

                <tbody>

                  { data.map( ( x : any , y : any ) =>
                         <Deduct_Advance_Receipt_Table_Row key = { y } data = { x } /> ) }

                </tbody>

            </table>
                  
} ;

export default Deduct_Advance_Receipt_Table
       