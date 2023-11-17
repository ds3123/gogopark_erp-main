import { useEffect , useState } from "react" ;
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { delete_Other_Item } from "store/actions/action_Other"




type Table = {

    data : any[] ;
   
 }


// @ 表單 _ 其他收支表 : 支出  
const Other_Cash_Expenditure_Table = ( { data } : any  ) => {

    const dispatch = useDispatch();
    const history  = useHistory();


    // 點選 _ 刪除
    const click_Delete = ( id : string , history : any ) => dispatch( delete_Other_Item( id , history )  )


   return  <table className="table is-fullwidth is-hoverable m_Bottom_100">

                <thead>
                    <tr>
                        <th> 類 別 </th>
                        <th> 項 目 </th>
                        <th> 金 額 </th> 
                        <th> 時 間 </th>
                        <th> 刪 除 </th>
                        
                    </tr>
                </thead>

                <tbody>

                     { 
                        
                        data.map( ( x : any , y : number )=> {

                            return <tr key = { y } >
                                      <td> { x['type'] } </td>   
                                      <td className="td_Left"> { x['item'] } </td>   
                                      <td> { x['amount'] } </td>   
                                      <td> { x['created_at'].slice(0,16) } </td> 
                                      <td> 
                                           <b className = "delete" 
                                              onClick   = { ()=> { if( window.confirm("確認要刪除此筆收支資料 ?")  ) click_Delete( x['id'] , history )  } } >
                                           </b> 
                                      </td>  
                                   </tr>

                        }) 
                            
                    }

                </tbody>

           </table>

} ;


export default Other_Cash_Expenditure_Table
       
