/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import { useState , useEffect } from 'react' ;
import { useSelector } from "react-redux" ;
import Left_Side_Panel from "templates/panel/Left_Side_Panel" ;
import moment from 'moment';
import { switch_Service_Id } from "utils/data/switch" ;
import { 
         useEffect_Side_Extra_Items_Fee ,
         useEffect_Side_Extra_Beauty_Fee ,
         useEffect_Side_Extra_Custom_Fee , 
         useEffect_Get_Extra_Items 
} from "./hooks/useEffect_Side_Extra_Fee" ;

import cookie from 'react-cookies' ;
import { get_Service_Type_Color } from 'utils/data/switch' ;

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form" ;
import { yupResolver } from "@hookform/resolvers/yup" ;
import Date_Picker from "templates/form/Date_Picker" ;
import { schema_Side_Extra_Fee } from "utils/validator/form_validator" ;
import { useEffect_Edit_Picked_Items } from "components/services/hooks/useEffect_Extra_Item" ;
import { useCreateExtraFee } from "hooks/react-query/service/useCreateExtraFee" ;
import { useAccount_Shop_Id } from 'hooks/data/useAccount';
import { I_Side_Extra_Fee } from 'utils/custom_types/form';


// @ 服務單建立後，加價面板
const Side_Extra_Fee = () => {


    // 所屬店家 id
    const shop_Id = useAccount_Shop_Id() ;

    // 今日
    const today   = moment( new Date() ).format( 'YYYY-MM-DD' ) ; 

    // 設定 _ 使用者類別
    const _cookie = cookie.load( 'userInfo' ) ;


    // 是否開啟 _ 加價面板詳細內容   
    const [ is_On , set_Is_On ] = useState( false ) ;
    

    // 是否開啟 _ 整個加價面板
    const is_Extra_Fee_Open = useSelector(( state : any ) => state.Layout.Side_Extra_Fee_Open ) ;


    // 目前所點選服務資料
    const current_Service = useSelector(( state : any ) => state.Layout.current_Service_Data ) ;
    const service_Type    = current_Service?.service_type ;
    const q_Code          = current_Service?.q_code ;

    // 目前所點選服務單 id
    const service_Id = switch_Service_Id( current_Service ) ;

    // 目前服務單 _ 客戶
    const customer   = current_Service?.customer ;


    // 目前服務單 _ 寵物
    const pet        = current_Service?.pet ;

     
    // React Hook Form
    const { register , handleSubmit , control , formState : { errors , isValid } } =
         useForm< I_Side_Extra_Fee >({
        
                                       mode     : "all" ,
                                       //resolver : yupResolver( schema_Side_Extra_Fee ) ,
                                    }) ;      



    // 加價項目欄位
    const { items_Prices_Total , services_Picked  , item_Fields , is_On : extra_Item_Is_On } = useEffect_Side_Extra_Items_Fee() ;

    // 加價美容欄位
    const { beauties_Prices_Total , beauty_Picked  , beauty_Fields , is_On : extra_Beauty_Is_On } = useEffect_Side_Extra_Beauty_Fee() ;
 

    // 自訂加價欄位
    const { custom_Item , custom_Price , custom_Fields , is_On : extra_Custom_Is_On } = useEffect_Side_Extra_Custom_Fee() ;


    // 取得 _ 所選擇 : 
    const picked_Items    = useEffect_Get_Extra_Items( services_Picked ) ;  // 加價項目名稱
    const picked_Beauties = useEffect_Get_Extra_Items( beauty_Picked ) ;    // 加價美容名稱


    // 新增 _ 加價單函式
    const create_Extra_Fee = useCreateExtraFee() ;

    // 櫃檯人員
    const admin_User  = ( _cookie && _cookie['employee_name'] ) ? _cookie['employee_name'] : '店長' ;

    // 總計金額
    const amount_Paid = items_Prices_Total + beauties_Prices_Total + ( custom_Price ? custom_Price : 0 ) ;


    // 提交處理 : 新增加價單
    const onSubmit : SubmitHandler< I_Side_Extra_Fee > = ( data : I_Side_Extra_Fee ) => {
    
    
         // 付款日期
         const payment_Date = moment( data.payment_Date ).format( 'YYYY-MM-DD' ) ;  

         const obj = {

                        "account_id"         : shop_Id ,
                        "service_id"         : service_Id ,     
                        "service_type"       : service_Type ,   
                        
                        "cus_name"           : customer?.name ,
                        "cus_id"             : customer?.id ,
                        "cus_mobile"         : customer?.mobile_phone ,
                        
                        "pet_name"           : pet?.name ,
                        "pet_serial"         : pet?.serial ,
                        "pet_species"        : pet?.species ,

                        "extra_item"         : picked_Items.join( ',' ) ,     
                        "extra_item_price"   : items_Prices_Total ,
                        "extra_beauty"       : picked_Beauties.join( ',' ) ,
                        "extra_beauty_price" : beauties_Prices_Total , 
                        "extra_custom"       : custom_Item ,
                        "extra_custom_price" : custom_Price ? custom_Price : 0 ,

                        "amount_paid"        : amount_Paid ,
                        "admin_user"         : admin_User ,
                        "payment_date"       : payment_Date ,

                     } ;

         create_Extra_Fee( obj ) ;

    } ; 



    // 回復原始狀態
    useEffect( () => {
        
      // return () => set_Is_On( false )       
 
    } , [ is_Extra_Fee_Open ] ) ;


    // 服務顏色
    const type_Color = get_Service_Type_Color( service_Type ) ;




   return <>

             { is_Extra_Fee_Open &&

                <Left_Side_Panel>

                  <form onSubmit = { handleSubmit( onSubmit ) }>

                     <div className = { `tag is-large w-full pointer ${ is_On ? 'is-link is-light' : 'is-white' }` } 
                           onClick   = { () => set_Is_On( !is_On ) } > 
                     
                        <i className = "fas fa-plus-circle"></i> &nbsp; 加價 &rarr;
                     
                        <span className = { `tag is-medium is-light ${ type_Color } m_Left_10 is-rounded` } > 
                        
                           { service_Type }單 ( Q{ q_Code } ) ： { service_Id }
                        
                        </span>
                     
                     </div>

                     { is_On &&

                        <div className="m_Top_30">

                              <p>  客戶 : <b> { customer?.name }                 </b> </p>
                              <p>  寵物 : <b> { pet?.name } ( { pet?.species } ) </b> </p>

                              <hr/>
                           
                              { /* 加價項目 */ }
                              { item_Fields }

                              { /* 加價美容 */ }
                              { beauty_Fields }

                              { /* 自訂加價 */ } 
                              { custom_Fields }  

                              <hr/>

                              <p className="m_Bottom_20">
                                 櫃檯人員 : <b className="fDblue"> { admin_User } </b>
                              </p>

                              <p className="m_Bottom_20">
                                 建檔日期 : <b className="fDblue"> { today } </b>
                              </p>  

                              <div className="m_Bottom_20">

                                 收款日期 :  
                                 
                                 <span className = "m_Left_5 relative" style = {{ display:'inline-block' , top:'-7px' }}>

                                    <Date_Picker control = { control } 
                                                 name    = 'payment_Date' 
                                                 default_Date = { new Date() } />


                                 </span>
                                 

                              </div> 

                              <p className="m_Bottom_40">
                                 
                                 金額共計 : &nbsp; 
                                 <b className="fRed"> { amount_Paid } </b>&nbsp; 元
                                 
                              </p>    


                              { /* 提交 */ }

                              { amount_Paid > 0 && 

                                 <button disabled = { false } type = "submit" className = "button m_Top_30 m_Bottom_30 is-primary is-medium w-full" >
                                       確認加價
                                 </button>

                              }


                        </div>

                     } 

                  </form>

                </Left_Side_Panel>   
             
             }
   
          </>
   
} ;

export default Side_Extra_Fee
       


