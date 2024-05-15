import useServiceType from "hooks/layout/useServiceType";





// # 方案類型( "預設" / "自訂" )
const Plan_Type = ( { data } : { data : any } ) => {


    // 方案類型
    const plan_Type  = data['plan_type'] ;     
    const _plan_Type = ( plan_Type === "包月洗澡" || plan_Type === "包月美容" ) ? plan_Type : null;
  
    // 方案類型欄位 : 顏色、Icon
    const { color , icon }  = useServiceType( _plan_Type, false , 'medium' ); 
  
    return <>
  
                 { /* 預設方案 */ } 
                 { ( plan_Type === '包月洗澡' || plan_Type === '包月美容' ) &&
                 
                     <b className = { color } >
                         <i className = { icon } ></i> &nbsp;  [ 預設 :  { data['id'] } ]  { plan_Type }
                     </b>
                 
                 }
  
                 { /* 自訂方案 */ } 
                 { ( plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ) &&
                 
                     <b className="tag is-medium is-warning is-light"  >
                         <i className="fas fa-ruler"></i> &nbsp; [ 自訂 : { data['id'] } ]  { plan_Type }
                     </b>
                 
                 }
    
           </>  
  
  } ;

export default Plan_Type
       
  