
import { FC } from 'react' ;
import { switch_Service_Id } from "utils/data/switch" ;


type Date = {

    data : any ;

}


// @ 服務日期、Ｑ碼、類型、id
const Service_Tag_ServiceDate : FC< Date > = ( { data } ) => {

    // 服務類型
    const service_Type = data?.service_type ;

    // 服務單 id
    const service_Id   = switch_Service_Id( data ) ;

    
    return <>

              <div className = "t_Left m_Bottom_20" > 
                 日期 : { data?.service_date } / <b className = "f_16 m_Left_10 m_Right_10 relative" style = {{ top : "-5px" }} > Q{ data?.q_code } </b>/ { service_Type } : { service_Id }  
              </div>
    
           </>

} ;

export default Service_Tag_ServiceDate
       