/* eslint-disable react/jsx-pascal-case */

import { useEffect } from "react" ;
import { string_Short } from "utils/string/edit_string"
import {useDispatch, useSelector} from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { useRating_Sign }  from "hooks/layout/useRating";
import { Service_Type } from "utils/Interface_Type"
import Update_Service from "components/services/edit/Update_Service";
import { click_Show_Edit_Customer } from "store/actions/action_Customer";
import Service_Sign from "components/index/components/Service_Sign" ;
import { usePet_Update_Panel } from "hooks/data/usePet" ;


interface IService {
    data : any
}



const Service_Rows = ( { data } : IService ) => {

    const dispatch = useDispatch() ;

    // 首頁詳細模式 ( 展開所有統計資料 )
    const is_Detail_Mode = useSelector( ( state : any ) => state.Index.is_Detail_Mode ) ;

    const rating_1       = useRating_Sign( 5  , 5 ) ;
    const rating_2       = useRating_Sign( 1  , 10 ) ;

    const customer       = data['customer'] ;
    const pet            = data['pet'] ;


    // 基礎、洗澡、美容 [ basic、bath、beauty ]
    const service_Type   = data['service_type'] ;
    const q_Code         = data['q_code'] ;

    // 客戶 [ customer ]
    const cus_Name       = customer ? customer['name'] : '' ;

    // 寵物 [ pet ]
    const pet_Name       = pet ? pet['name'] : '' ;
    const pet_Species    = pet ? pet['species'] : '' ;

    let style            = '' ;
    if( service_Type === '基礎' ) style = 'is-warning' ;
    if( service_Type === '洗澡' ) style = 'is-success' ;
    if( service_Type === '美容' ) style = 'is-danger' ;

    
    // 點選 _ Qcode
    const click_Qcode    = () => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : service_Type , preLoadData : data  } as { service_Type : Service_Type  } ) ) ;

    // 點選 _ 客戶
    const click_Customer = ( cus_Id : string ) => dispatch( click_Show_Edit_Customer( cus_Id , customer ) ) ;
      
    // 點選 _ 寵物
    const click_Pet         = usePet_Update_Panel()


    useEffect( () => {

      // click_Qcode() ;

    } , [] ) ;

    // ------------------------------------------------------------------------------------------------------

    let tagStyle = 'tag '+style+' is-medium is-light is-rounded pointer f_11 relative m_Right_15' ;
    const rating = { top:"-3px" , left : "-5px" , fontSize:"9pt" } as const ;
    

    return <div className="title is-6 relative" style={{ marginBottom : "20px" }} >

               { /* 服務相關標示 ( 異常、銷單、是否付費 )  */ }
               <Service_Sign is_error = { data['is_error'] } is_delete = { data['is_delete'] } amount_paid = { data['amount_paid'] } amount_payable = { data['amount_payable'] }   />

               <span className={ tagStyle } onClick={ click_Qcode } > Q{ q_Code }
               
                 { /* 預約標示 */ }
                 <b className="absolute f_9" style={{ top:"-6px" , left:"0px" }}> 
                    { data['service_status'] === '已到店' ? '' : '預' } 
                 </b>
               
               </span> 

               <span className="relative tag is-medium pointer f_11 m_Right_15" onClick={ () => click_Pet( pet ) } >

                 { is_Detail_Mode && <span className="absolute" style={ rating }>  { rating_1 } </span> }
                 { string_Short( pet_Name ) } ( { string_Short( pet_Species ) } )

               </span>

               <span className="relative tag is-medium pointer f_11"  onClick={ () => click_Customer( customer.id ) } >

                   { is_Detail_Mode &&  <span className="absolute" style={ rating }> { rating_2 } </span> }
                   { string_Short( cus_Name ) }

               </span>

           </div> ;

} ;

export default Service_Rows ;