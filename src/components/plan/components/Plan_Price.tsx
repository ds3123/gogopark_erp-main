/* eslint-disable react-hooks/exhaustive-deps */
import { usePlan_Get_Plan_Price } from "hooks/data/usePlan" ;
import { useEffect_Plan_Price_By_Species } from "../hooks/useEffect_Plan_Type_Columns" ;





// # 方案價格 ( 含調整後 ) 
const Plan_Price : React.FC< { data : any } > = ( { data } ) => {


    // 該品種方案基本價格
    const plan_Basic_Price = useEffect_Plan_Price_By_Species( data ) ; 


    // 方案最終購買 ( 含個體調整後 ) 價格
    const plan_Pay_Price   = usePlan_Get_Plan_Price( data ) ;


  // -----------   

  if( plan_Basic_Price === plan_Pay_Price ) return <> { plan_Basic_Price } </>
  
  return <>
            <span> { plan_Basic_Price }  </span>
            <b className = "tag is-white is-rounded fRed"> 改價：{ plan_Pay_Price }  </b>
         </>

} ;

export default Plan_Price  