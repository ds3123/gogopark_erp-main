/* eslint-disable react/jsx-pascal-case */
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { useDispatch } from "react-redux" ;
import usePet_Button from "hooks/layout/usePet_Button" ;
import Update_Customer from "components/customers/edit/Update_Customer" ;
import Plan_Type from "./components/Plan_Type" ;
import Plan_Used_Column from "./components/Plan_Used_Column" ;
import Plan_Start_End from "./components/Plan_Start_End" ;
import Plan_Used_ExtraItem_Sign from "components/services/edit_components/summary_fee/plan_components/common/plan_used/Plan_Used_ExtraItem_Sign" ;
import { usePlan_Get_Plan_Price } from "hooks/data/usePlan" ;
import { useDelete_Plan } from "hooks/react-query/plan/useDeletePlan" ;



const left = { textAlign : "left" } as const ;
const sign = { position : "absolute" , top:"24px" , left:"-52px" } as const ;



const Plans_Rows = ( props : any ) => {


    const { data } = props ;
    const dispatch = useDispatch() ;


    // 方案 "小計" 價格 
    const plan_Fee  = usePlan_Get_Plan_Price( data ) ;

    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton = usePet_Button([ data['pet'] ]) ;

    // 客戶資料
    const customer  = data['customer'] ? data['customer'] : {} ;
    

    try{
        customer.customer_relation = [ data.customer_relative ] ;
    }catch(e){
        console.log( '客戶關係人發生錯誤' )
    }


    // 刪除 _ 方案 Mutation
    const delete_Plan         = useDelete_Plan() ;


    // 點選 _ 客戶資訊 
    const click_Customer_Name = () => dispatch( set_Side_Panel( true , <Update_Customer /> , { preLoadData : customer } ) ) ;
 
    
    // 點選 _ 刪除資料
    const click_Delete_Button = ( id : string , plan_Used : [] ) => {

        // 方案已有使用紀錄 --> 無法刪除
        // if( plan_Used.length > 0 ){
        //     alert( "此方案已有使用紀錄，無法刪除．" ) ;
        //     return false ; 
        // }

        // 刪除方案
        delete_Plan( id ) ;

    }



    return  <tr className="m_Top_20"  data-testid="plan-list-row">
        
               <td className="relative t_Left" style={{ height:"90px" }}>

                   { /* 方案類型  */ }        
                   <Plan_Type data = { data } />

                   { /* 已使用方案服務中，有使用 "加價項目" */ } 
                   <div style = { sign } > <Plan_Used_ExtraItem_Sign plan = { data } /> </div>

               </td>

               { /* 客戶 */ }
               <td className = "td_Left">

                   { customer['name'] ?

                     <b className="tag is-medium pointer" onClick = { click_Customer_Name } >
                         { customer['name'] } ( { customer['mobile_phone'] } )
                     </b> :

                     <b className="tag is-medium fRed pointer" onClick = { () => alert( '查無此方案相對應客戶' ) }> 已刪除 </b>

                   }

               </td>
            
               { /* 寵物 */ }
               <td className="td_Left"> 
                    
                  {  
                     data?.pet?.serial ? 
                          petButton : <b className="tag is-medium fRed pointer" onClick = { () => alert( '查無此方案相對應寵物' ) }> 已刪除 </b> 
                  }

               </td>
               <td style={{ width:"100px" }}> { plan_Fee } </td>
               <td> { data?.created_at?.slice(5,10) }   </td>
               <td> { data?.payment_date?.slice(5,10) } </td>

               { /* 開始日期、結束日期  */ }
               <Plan_Start_End data = { data } />

               <td className="relative" style={ left }>

                   { /* 方案使用情形 */ }  
                   <Plan_Used_Column data = { data } />
            
               </td>

               <td> 
                    
                    <b className = "tag is-medium pointer" 
                       onClick   = { () => { if( window.confirm( '確認要刪除此筆資料' ) ) click_Delete_Button( data["id"] , data['plan_used_records'] ) } } >
                           
                           <i className="fas fa-trash-alt"></i>

                    </b>

               </td>     

               { /* <td> <i className="fas fa-download pointer"></i> </td> */ }

            </tr>

} ;



export default Plans_Rows