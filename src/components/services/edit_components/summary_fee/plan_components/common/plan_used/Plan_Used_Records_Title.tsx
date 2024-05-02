/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
import { useEffect  } from 'react' ;
import { usePlan_Bath_Beauty_Num } from 'hooks/data/usePlan'
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useEffect_Set_Plan_Basic_Price } from 'components/plan/hooks/useEffect_Plan_Type_Columns';
import { useDispatch } from 'react-redux';
import { set_Current_Pet } from "store/actions/action_Pet" ;




type Plan_Used_Records_Title = {

    plan_Type            : string ;
    applied_Species_Name : string ;
    data                 : any ;

} 


// * 方案 ( 調整後 ) 基本價格
const useEffect_Plan_Basic_Price = ( plan_Type : string , data : any ) : number => {

   const dispatch = useDispatch() ;

   // 目前登入者，所屬店家 id
   const shop_Id              = useAccount_Shop_Id() ;
   
   // 所選擇方案 : 基本價格 ( 未加上自訂金額、接送費 )
   const current_Baisc_Price  = useEffect_Set_Plan_Basic_Price( shop_Id , plan_Type) ;  


   useEffect( () => {
     
      // 設定 _ 目前所點選的寵物 ( 以讓 useEffect_Set_Plan_Basic_Price 取得該寵物基本價格 )
      if( data && data?.pet ) dispatch( set_Current_Pet( data?.pet ) ) ; 
   
   } , [ data ] ) ;

   return current_Baisc_Price ;

} ;



// @ 標題 : 方案使用紀錄
const Plan_Used_Records_Title = ( { plan_Type , applied_Species_Name , data } : Plan_Used_Records_Title ) => {


   // 所選擇方案 : 基本價格 ( 未加上自訂金額、接送費 )
   const plan_Basic_Price  = useEffect_Plan_Basic_Price( plan_Type , data ) ;  


   // 標題樣式
   const title_Style       = plan_Type === "包月洗澡" ? "is-success" : plan_Type === "包月美容" ? "is-danger" : "is-warning" ;


   // 洗澡次數、美容次數
   const service_Num       = usePlan_Bath_Beauty_Num( data ) ; 



   return   <>

                <b className={ `tag is-medium m_Bottom_30 is-rounded is-large is-light m_Top_20 ${ title_Style }` } >

                  { plan_Type === '包月洗澡' ? <i className="fas fa-bath"></i> : <i className="fas fa-cut"></i> } &nbsp;

                  [ { ( plan_Type === '包月洗澡' || plan_Type === '包月美容' ) ? '預設' : '自訂' } : { data['id'] } ] &nbsp;  

                  { plan_Type }  ( { applied_Species_Name } ) 

                </b>  


                <div className="columns is-multiline is-mobile relative m_Left_5" >

                   <div className="column is-4-desktop"> 
                           
                     <b className="tag is-white is-medium">
                        洗澡 : <b className="fBlue"> &nbsp; { service_Num['bath'] ? service_Num['bath'] : 0 }  &nbsp;</b> 次 &nbsp;&nbsp;  
                        美容 : <b className="fBlue"> &nbsp; { service_Num['beauty'] ? service_Num['beauty'] : 0 } &nbsp;</b> 次  
                     </b>

                   </div>

                   <div className="column is-8-desktop">

                     <b className="tag is-white is-medium"> 

                        基本價格 : &nbsp; <span className="fBlue m_Right_10">    ${ data ? data['plan_basic_price'] : 0 } </span> &nbsp; &nbsp;
                        個體調整金額 : &nbsp; <span className="fBlue m_Right_10"> ${ data ? data['plan_adjust_price'] : 0 } </span> &nbsp; &nbsp;
                        接送費   : &nbsp; <span className="fBlue m_Right_30">    ${ data ? data['pickup_fee'] : 0 }        </span> &nbsp;
                        小 計    : &nbsp; <span className="fRed">                ${ data ? data['plan_fee_total'] : 0 }    </span> 

                     </b>

                   </div>

                 </div>    
   
   
   
            </>
             



} ;


export default Plan_Used_Records_Title
       