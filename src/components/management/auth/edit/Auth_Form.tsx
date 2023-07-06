
import { useState } from 'react'
import { Edit_Form_Type } from "utils/Interface_Type";
import Auth_Shop from "./components/Auth_Shop"
import Auth_Member from "./components/Auth_Member"


interface IAuth extends Edit_Form_Type {

    editType? : string ;
    authData? : any ;

}



{ /* 權限表單欄位  */ }
const Auth_Form = ( { register  , errors , setValue , current , control , editType , authData } : IAuth ) => {


    const props = {
                    register : register ,
                    setValue : setValue ,
                    errors   : errors ,
                    current  : current ,
                    control  : control ,
                  } ;


        
    // 權限類別 
    const [ auth_Type , set_Auth_Type ] = useState< '個別店家' | '店家成員' | '請選擇' >( '請選擇' ) ;


    // 變動 _ 權限類別
    const change_Auth_Type = ( type : '個別店家' | '店家成員' | '請選擇' ) => set_Auth_Type( type ) ;



   return <>

                <div className="columns is-multiline  is-mobile">

                    <div className="column is-12-desktop required"> 

                        <p> 類 別 </p> 
                        <div className="select">

                            <select { ...register( "auth_Type" ) } onChange = { e => change_Auth_Type( e.target.value as '個別店家' | '店家成員' | '請選擇' ) }  >
                                <option value="請選擇">   請選擇  </option>
                                <option value="個別店家"> 個別店家 </option>
                                <option value="店家成員"> 店家成員 </option>
                            </select>

                        </div>

                    </div>

                
                </div>    


                { /* 個別店家 */ }
                {  auth_Type === '個別店家' &&  <Auth_Shop { ...props }/> }    
                        
                { /* 店家成員 */ }
                {  auth_Type === '店家成員' &&  <Auth_Member { ...props }/> }    



          </>

} ;

export default Auth_Form
       