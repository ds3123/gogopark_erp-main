/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import { useEffect_Plan_Used_Status } from "components/plan/hooks/useEffect_Plan_Used_Column" ;

import { useFetch_Shop_Used_Records_By_PlanId } from "hooks/react-query/plan/useFetchPlans" ;
import { useAccount_Shop_Id } from 'hooks/data/useAccount';


type Payment = {

   data : any ;

}


// # 方案付款
const Pay_Plan : FC< Payment > = ( { data } ) => {


    const shop_Id     = useAccount_Shop_Id();

    // 方案
    const plan        = data?.plan ;

    // 方案名稱
    const plan_Name   = plan?.plan_type ;
    

    // 方案額度
    const plan_Quota  = plan_Name === "包月洗澡" ? `4 次洗澡` :
                        plan_Name === "包月美容" ? `3 次洗澡 / 1 次美容` :
                        plan_Name  ;



   // 方案 _ 使用紀錄
   const plan_UsedRecords   = useFetch_Shop_Used_Records_By_PlanId( shop_Id , plan?.plan_id ) ;

   // 該方案 "有效" 使用紀錄 ( 扣除 _ 被銷單 is_delete === 1， )
   const valid_Used_Records = plan_UsedRecords?.filter( ( x : any ) => x[ "is_delete" ] === 0 ) ;

   // 有效 : 洗澡單數 / 美容單數 
   const valid_Bath_Num     = valid_Used_Records?.filter( ( x : any ) => x[ "service_type" ] === "洗澡" ).length ; 
   const valid_Beauty_Num   = valid_Used_Records?.filter( ( x : any ) => x[ "service_type" ] === "美容" ).length ;  

   // 剩餘次數
   const month_Bath_BathLeft     = 4 - valid_Bath_Num ;
   const month_Beauty_BathLeft   = 3 - valid_Bath_Num ;
   const month_Beauty_BeautyLeft = 1 - valid_Beauty_Num ;


   // 剩餘次數（ 包月洗澡 ）
   const month_Bath_Left   = <>  { month_Bath_BathLeft === 0 ? '已使用完' : `${ month_Bath_BathLeft } 次洗澡 ` }  </>
   
   // 剩餘次數（ 包月美容 ）
   const month_Beauty_Left = <>  {
                                    ( month_Beauty_BathLeft === 0 && month_Beauty_BeautyLeft === 0 ) ? 
                                             '已使用完' : 
                                             `${  month_Beauty_BathLeft} 次洗澡 / ${ month_Beauty_BeautyLeft } 次美容`
                                             
                                  } </>
   

   return <div className = "relative" >

               <div className = "t_Left m_Bottom_5" > 

                  付款方式 : { data?.payment_method } 
                  {/* <span className = "f_10 relative" style = {{ left:"5px" , top:"5px" }} > { `( id : ${ plan?.plan_id } )` } </span> */}

               </div >

            

               <div className = "t_Left m_Bottom_5" > 
                   剩餘次數 : 
                          { plan_Name === "包月洗澡" && month_Bath_Left }
                          { plan_Name === "包月美容" && month_Beauty_Left }
               </div>

   

          </div>

} ;



// # 現金付款
const Pay_Cash : FC< Payment > = ( { data } ) => {

   return <>

            <div className = "t_Left m_Bottom_5" > 付款方式 : { data?.payment_method }  </div >

            <div className = "t_Left m_Bottom_5" > 
               實付金額 : { data?.amount_paid } 元
            </div>

         </>

} ;


// @ 付款方式：現金 / 方案 ( for 第四、五聯 )
const Service_Tag_Payment : FC< Payment > = ( { data } ) => {


    // 付款方式
    const payment_Method = data?.payment_method ;

   
    return <div className = "m_Top_20" >

               <div className = "t_Left" >  
                  <span className="tag is-large m_Right_10 is-white f_18 relative" style={{ left:"-13px" }} > 
                     <i className = "fas fa-file-invoice-dollar"></i>
                  </span>   
                  <span className = "f_14 relative" style = {{ top:"13px" , left:"-35px" }} > 支付明細 </span>    
               </div>

               <div className = "p_10 border"  >

                  { payment_Method === "現金" && <Pay_Cash data = { data } /> }

                  { payment_Method === "方案" && <Pay_Plan data = { data } /> }

               </div>

           </div>

} ;

export default Service_Tag_Payment
       