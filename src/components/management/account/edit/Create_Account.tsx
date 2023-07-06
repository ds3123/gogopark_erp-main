
import { Edit_Form_Type } from "utils/Interface_Type";
import Account_Form from "./Account_Form";


const Create_Account = ( { register , control  , setValue , errors , isDirty, isValid , current } : Edit_Form_Type ) => {


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

              <label className="label"> <i className="fas fa-server"></i> &nbsp; 帳號資料 </label> <br/>

              <Account_Form  { ...props } />   
    
           </>                  
     
} ;


export default Create_Account
       