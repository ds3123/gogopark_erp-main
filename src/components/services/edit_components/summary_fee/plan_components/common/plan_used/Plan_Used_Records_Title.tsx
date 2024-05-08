/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
import { FC } from 'react' ;
import { usePlan_Bath_Beauty_Num } from 'hooks/data/usePlan'
import { usePlan_Get_Plan_Price } from "hooks/data/usePlan" ;



type Plan_Used_Records_Title = {
    plan_Type            : string ;
    applied_Species_Name : string ;
    data                 : any ;
} 

type Info = {
   data : any ;
}



// 價格資訊
const Price_Info : FC< Info >= ( { data } ) => {

     // 所選擇方案 : 基本價格 ( 未加上自訂金額、接送費 )
     const plan_Basic_Price  = data['plan_basic_price'] ;  

     // 方案最終購買 ( 含個體調整後 ) 價格
     const plan_Pay_Price   = usePlan_Get_Plan_Price( data ) ;

   return <div className="column is-8-desktop">

            <b className="tag is-white is-medium"> 

               基本價格 : &nbsp; <span className="m_Right_10">    

                                  { plan_Basic_Price === plan_Pay_Price ? plan_Basic_Price :
                                      <> { plan_Basic_Price }  <span className = "fRed"> ( 改價：{ plan_Pay_Price } ) </span></>  } 元  

                               </span>
                           
                            &nbsp; &nbsp;
               個體調整金額 : &nbsp; <span className="m_Right_10"> { data['plan_adjust_price'] } 元 </span> &nbsp; &nbsp;
               接送費   : &nbsp; <span className="m_Right_30">    { data['pickup_fee'] } 元      </span> &nbsp;
               

           </b>

 </div>

} ;




// @ 標題 : 方案使用紀錄
const Plan_Used_Records_Title : FC< Plan_Used_Records_Title > = ( { plan_Type , applied_Species_Name , data } ) => {


   // 標題樣式
   const title_Style = plan_Type === "包月洗澡" ? "is-success" : plan_Type === "包月美容" ? "is-danger" : "is-warning" ;

   // 洗澡次數、美容次數
   const service_Num = usePlan_Bath_Beauty_Num( data ) ; 



   return   <>

                <b className={ `tag is-medium m_Bottom_30 is-rounded is-large is-light m_Top_20 ${ title_Style }` } >

                  { plan_Type === '包月洗澡' ? <i className="fas fa-bath"></i> : <i className="fas fa-cut"></i> } &nbsp;

                  [ { ( plan_Type === '包月洗澡' || plan_Type === '包月美容' ) ? '預設' : '自訂' } : { data['id'] } ] &nbsp;  

                  { plan_Type } ( { applied_Species_Name } ) 

                </b>  

                <div className = "columns is-multiline is-mobile relative m_Left_5" >

                   <div className = "column is-4-desktop"> 
                    
                     <b className = "tag is-white is-medium" >
                        洗澡 : <b className="fBlue"> &nbsp; { service_Num['bath']   ? service_Num['bath']   : 0 } &nbsp;</b> 次 &nbsp;&nbsp;  
                        美容 : <b className="fBlue"> &nbsp; { service_Num['beauty'] ? service_Num['beauty'] : 0 } &nbsp;</b> 次  
                     </b>

                   </div>

                    { /* 價格資訊 */ }
                    <Price_Info data = { data }/>

                 </div>    
   
            </>
             



} ;


export default Plan_Used_Records_Title
       