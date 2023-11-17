/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import { FC } from "react" ;
import Service_Detail_Button from "templates/button/Service_Detail_Button" ;
import Service_Sign from "components/index/components/Service_Sign" ; 
import { useFetch_Shop_Used_Records_By_PlanId } from "hooks/react-query/plan/useFetchPlans" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { get_UsePlan_ServiceAmount } from "fp/plans/read/get_Plan" ;
import { get_Pet_Plan_Adjust_Price } from "fp/management/finance/plan/get_Plan_Services";




type Row = {

    data : any ;

}


// 清單列 : 洗澡、美容 _ 扣預收款
const Deduct_Advance_Receipt_Table_Row : FC< Row > = ( { data  } ) => {



   // 下載圖示
   const downloadIcon = <button className = "button is-loading is-white relative" style = {{ top : "-5px" }} ></button> ; 

  
   const shopId = useAccount_Shop_Id() ;

   // 相關資料
   const plan_UseRecord = data?.plan ;                   // 方案 _ 使用紀錄
   const plan_Id        = plan_UseRecord?.plan_id ;      // 方案 id
   const plan_Type      = plan_UseRecord?.plan_type ;    // 方案類型 / 名稱 ( Ex. 包月洗澡 / 包月美容 )
   const service_Type   = plan_UseRecord?.service_type ; // 服務類型 ( Ex. 洗澡 / 美容 )

   const pet                   = data?.pet ;            // 寵物

   // 依照方案類型，取得 _ 該寵物 : 方案調整價格
   const pet_plan_adjust_price = get_Pet_Plan_Adjust_Price( pet , plan_Type ) ;


   // 取得 _ 此次使用紀錄，所屬方案內的 : 所有使用紀錄 ( 為了取得使用紀錄 _ 所屬方案：價格 )  
   const all_Plan_UseRecords  = useFetch_Shop_Used_Records_By_PlanId( shopId , plan_Id ) ;

   // 用傳入的使用紀錄 id ,篩選以上所查詢的所有使用紀錄
   const planRecord_With_Plan = all_Plan_UseRecords.filter( ( x : any ) => x?.id === plan_UseRecord?.id )[ 0 ] ;
   
   // 該使用紀錄的方案資料
   const plan_Data            = planRecord_With_Plan?.plan ;

   // 方案相關價格
   const plan_Basic_Price     = plan_Data?.plan_basic_price ;  // 基本價格
   const plan_Paid_Amount     = plan_Data?.amount_paid ;       // 實收金額
   const plan_Adjust_Price    = plan_Data?.plan_adjust_price ; // 調製金額
   const plan_Pickup_Fee      = plan_Data?.pickup_fee ;        // 接送費  
  
   // const plan_Total_Amount = plan_Paid_Amount + plan_Adjust_Price + plan_Pickup_Fee ; // 總計金額


   // 每次使用方案 ( 績效 ) 金額
   const per_Service_Amount   = get_UsePlan_ServiceAmount( plan_Paid_Amount , plan_Type , service_Type ) ;

  
  return <tr>

                <td className = "relative td_Left" > 

                    { /* 服務相關標示 : 異常、銷單、是否付費、申請退費 */ } 
                    <Service_Sign { ...data } />

                    { /* 服務檢視按鈕  */ } 
                    <Service_Detail_Button data = { data }  />
                    
                </td>

                <td className = "td_Left" > { pet?.name } 
                       <span className = "f_10" > ( { pet?.species } /  id : { pet?.pet_id } ) </span>  
                </td>

                <td> { data?.service_date.slice( 5 , 10 ) } </td>

                <td className = "td_Left" > 
                    { plan_Type } <span className = "f_9" > ( { plan_Id } ) </span>           
                </td>

                <td> { plan_Basic_Price ? plan_Basic_Price : downloadIcon } </td>

                <td> 
                      <span className = { `${ (pet_plan_adjust_price && pet_plan_adjust_price !== plan_Basic_Price ) ? 'fDred' : '' }` } > 
                         { pet_plan_adjust_price ? pet_plan_adjust_price : '未調整' } 
                      </span> 
                </td>
                
                <td> 
                    <span className = { `${ plan_Adjust_Price === 0 ? '' : 'fDred' }` } >  
                       { plan_Adjust_Price === 0 ? '未調整' : plan_Adjust_Price } 
                    </span>
                </td>

                {/* <td> { plan_Pickup_Fee  }  </td> */}

                <td> { plan_Paid_Amount ? plan_Paid_Amount : downloadIcon }  </td>

                { /* <td> { plan_Total_Amount }  </td> */ }

                <td className = "fDblue" > { per_Service_Amount ? per_Service_Amount : downloadIcon } </td>

         </tr>

} ;

export default Deduct_Advance_Receipt_Table_Row  