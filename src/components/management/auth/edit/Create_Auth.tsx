
import { Edit_Form_Type } from "utils/Interface_Type";
import Auth_From from "components/management/auth/edit/Auth_Form"



// @ 新增 _ 權限
const Create_Auth = ( { register , control  , setValue , errors , isDirty, isValid , current } : Edit_Form_Type ) => {

  
    const props = {
                    register : register ,
                    setValue : setValue ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : current ,
                    control  : control
                   } ;

    return <>

               { /* 權限資料 */ }
               <label className="label"> <i className="fas fa-layer-group"></i> &nbsp; 權限資料 </label> <br/>
 
               <Auth_From  { ...props } />  

           </>

} ;


export default Create_Auth
       