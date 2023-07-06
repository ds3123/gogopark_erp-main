import { useState } from 'react' ;

import { Input } from "templates/form/Input" ;
import { Edit_Form_Type } from "utils/Interface_Type";


interface IAuth extends Edit_Form_Type {

    editType? : string ;
    authData? : any ;

}



const Auth_Member = ( { register  , errors , setValue , current , control , editType , authData } : IAuth  ) => {



    return <>
    
           </>

} ;

export default Auth_Member 
       