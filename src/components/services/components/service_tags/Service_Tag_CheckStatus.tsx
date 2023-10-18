
import { FC } from 'react' ;
import { string_Format_Slash } from 'utils/string/edit_string' ; 


type Status = {
    data : any
}



// @ 今日美容情形 ( for 第 四、五 聯 )
const Service_Tag_CheckStatus : FC< Status > = ( { data } ) => {


   // 檢查勾選
   const chekc_Options = data?.beautician_report ? string_Format_Slash( data?.beautician_report ) : "" ;


   return <>
            <div className = "m_Top_10 m_Bottom_20">
                <p> * 檢查情況 : </p>
                <div className = "relative" style = {{left : "14px"}} >
                    { chekc_Options ? <b className = "f_12" > { chekc_Options } </b> : "未勾選"  } 
                </div>
            </div>
            
            <div className = "m_Bottom_10" >
                <p> * 美容師備註 : </p>
                <div className = "relative" style = {{left : "14px"}}>
                    { data?.beautician_note ? <b className = "f_12" > { data?.beautician_note } </b> : "未填寫"  }  
                </div>
            </div> 
         </>


} ;


export default Service_Tag_CheckStatus
       