/* eslint-disable react/jsx-pascal-case */
import { useContext , useEffect , useState } from "react" ;

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;
import { FeeDetail } from "components/services/edit_components/summary_fee/Fee_Detail"
import Plan_Plus_Payable from "../plan_components/Plan_Plus_Payable";
import useCreate_Service_Summay_Fee_Context from "components/services/edit_components/summary_fee/contexts/serviceSummaryFeeContext" ;


 
type Payable = {

  receivable : number ;
 
}



// @ 應收金額
const Amount_Payable = ( { receivable } : Payable ) => {


   // 取得 context 值 : React Hook Form 屬性   
   const { editType } = useReact_Hook_Form_Context() ;  

   // 應收金額
   const [ amount , set_Amount ] = useState( 0 ) ;


   // useContext 
   const value = useContext( SidePanelContext ) ;                     // 取得 context 值  
   const data  = value.preLoadData ? value.preLoadData : value.data ; // 預先取得資料


   // 付款方式
   const { current_Payment_Method } = useCreate_Service_Summay_Fee_Context() ;
   

   // 取得 _ 應收金額
   const get_Amount_Payable = ( data : any ) => {

      if( !data ) return 0 ;

      const pet          = data['pet'] ;
      const payment_Type = data['payment_type'] ;      // 付費類型( Ex. 單次洗澡、單次美容 ) 
      const plan_Type    = data['plan_type'] ;         // 方案類型( Ex. 包月洗澡、包月美容... )
 
      const self_Adjust  =  plan_Type ? data?.plan_adjust_price : data?.self_adjust_amount ;  // 自行調整 ( 方案服務與一般服務，"資料表欄位名稱" 不同 )

      const extra_Item   = data?.extra_service_fee ;   // 加價項目
      const extra_Beauty = data?.extra_beauty_fee ;    // 加價美容

      const pickup       = data?.pickup_fee ;          // 接送費


    
      // # 該寵物，有 "自訂價格"，且在 "新增" 狀況下，才優先顯示自訂價格  --------  :

      // 單次洗澡下
      if( payment_Type === '單次洗澡' && !editType && pet?.single_bath_price )   return pet?.single_bath_price + self_Adjust + extra_Item + extra_Beauty + pickup ;

      // 單次美容下
      if( payment_Type === '單次美容' && !editType && pet?.single_beauty_price ) return pet?.single_beauty_price + self_Adjust + extra_Item + pickup ;

      // 包月洗澡下
      if( plan_Type === '包月洗澡' && !editType && pet?.month_bath_price )       return pet?.month_bath_price + self_Adjust + pickup  ;
    
      // 包月美容下
      if( plan_Type === '包月美容' && !editType && pet?.month_beauty_price )     return pet?.month_beauty_price + self_Adjust + pickup ;


      // -----------

      return data.amount_payable  

   } ;


   // 設定 _ 應收金額
   useEffect( () => {

     set_Amount( get_Amount_Payable( data ) ) ;
  
   } , [ data ] ) ;

   
   return  <div className="column is-8-desktop" >

              
                { /* @ 新增資料 ( 現金 / 信用卡 / 第三方支付 )  */ }   
                { ( !editType && ( current_Payment_Method === '現金' || current_Payment_Method === '信用卡' || current_Payment_Method === '第三方支付' )  ) &&
                    <span className="tag is-large is-white">
                        <b> 應收金額 :&nbsp;<span className="fRed"> { receivable ? receivable : 0 } </span> 元 </b>
                    </span>
                }

                { /* @ 新增資料 ( 方案加價 )  */ }   
                { ( !editType && current_Payment_Method === '方案' ) &&  <Plan_Plus_Payable editType = { editType } />   }


                { /* ------------------------------------- */ }


                { /* @ 編輯資料 ( 現金 / 信用卡 / 第三方支付 )  */ }   
                { ( editType && ( data?.payment_method === '現金' || data?.payment_method === '信用卡' || data?.payment_method === '第三方支付' ) ) &&
                    <span className="tag is-large is-white">
                        <b> 應收金額 :&nbsp;<span className="fRed" > { amount }  </span> 元  </b>
                    </span>
                }

                { /* @ 編輯資料 ( 方案加價 )  */ }   
                { ( editType && data?.payment_method === '方案' ) && <Plan_Plus_Payable editType = { editType } data = { data } /> }


                { /* 消費明細 */ }
                <FeeDetail editType = { editType } paymentMethod = { current_Payment_Method } />   

           </div> 

} ;


export default Amount_Payable
       