import { useState } from 'react' ;

import { Input } from "templates/form/Input" ;
import { Edit_Form_Type } from "utils/Interface_Type";

import Action_Scope from "./cols/Action_Scope"


interface IAuth extends Edit_Form_Type {

    editType? : string ;
    authData? : any ;

}





// @ 店家權限欄位
const Auth_Shop = ( { register  , errors , setValue , current , control , editType , authData } : IAuth ) => {




    // 檢視類型
    const [ auth_Shop_View_Type , set_Auth_Shop_View_Type ] = useState< '一般' | '私密' | '' >( '一般' ) ;


    // 編輯類型
    const [ auth_Shop_Edit_Type , set_Auth_Shop_Edit_Type ] = useState< string[] >( [] ) ; 


   

    // 點選 _ 個別店家 : 檢視資料類型
    const click_Shop_View = ( view_Type : '一般' | '私密' ) => set_Auth_Shop_View_Type( view_Type ) ;
    

    // 點選 _ 個別店家 : 作用範圍
    const click_Shop_Edit = ( edit_Type : string ) => {
    

        // 若點選已加入項目 -> 刪除
        if( auth_Shop_Edit_Type.indexOf( edit_Type ) != -1 ){

           const arr = [ ...auth_Shop_Edit_Type ] ;  

           arr.splice( auth_Shop_Edit_Type.indexOf( edit_Type ) , 1  ) // 刪除

           set_Auth_Shop_Edit_Type( arr )

           return false

        }


        set_Auth_Shop_Edit_Type( [ ...auth_Shop_Edit_Type , edit_Type  ] )


    } ;




    const bt = 'tag is-large m_Right_20 pointer' ;

   return <>

            <div className="columns is-multiline  is-mobile">

                <Input type="text" name="auth_Shop_Auth_Name" label="權限名稱" register={ register } error={ errors.account_Shop_Name } icon="fas fa-store" asterisk={true} columns="3" />

            </div>   

            <hr/>

            { /* 資料檢視 */ }
            <div className="columns is-multiline  is-mobile">


                <div className="column is-1-desktop"> <span className='required'> 資料檢視 </span>  </div>
             
                <div className="column is-1-desktop"> 
                   <b className={ `${ bt } ${ auth_Shop_View_Type === '一般' ? 'is-warning' : 'hover' }` } onClick = { () => click_Shop_View( '一般' ) } > 一 般 </b> 
                </div>

                <div className="column is-10-desktop">  <Action_Scope/> </div>

            </div>

            <div className="columns is-multiline  is-mobile">

                <div className="column is-offset-1 is-1-desktop"> 
                    <b className={ `${ bt } ${ auth_Shop_View_Type === '私密' ? 'is-warning' : 'hover' }` } onClick = { () => click_Shop_View( '私密' ) } > 私 密 </b>
                </div>

                <div className="column is-10-desktop">  <Action_Scope/> </div>

            </div>


            <hr/>

            { /* 資料編輯 */ }
            <div className="columns is-multiline  is-mobile m_Bottom_30">

                <div className="column is-1-desktop"> <span> 資料編輯 </span>  </div>

                <div className="column is-1-desktop"> 
                    <b className={ `${ bt } ${ auth_Shop_Edit_Type.includes( '新增' ) ? 'is-warning' : 'hover' }` } onClick = { () => click_Shop_Edit( '新增' ) } > 新 增 </b>
                </div>

                <div className="column is-10-desktop">  <Action_Scope/> </div>

                <div className="column is-offset-1 is-1-desktop"> 
                    <b className={ `${ bt } ${ auth_Shop_Edit_Type.includes( '修改' ) ? 'is-warning' : 'hover' }` } onClick = { () => click_Shop_Edit( '修改' ) } > 修 改 </b>
                </div>

                <div className="column is-10-desktop">  <Action_Scope/> </div>

                <div className="column is-offset-1 is-1-desktop"> 
                    <b className={ `${ bt } ${ auth_Shop_Edit_Type.includes( '刪除' ) ? 'is-warning' : 'hover' }` } onClick = { () => click_Shop_Edit( '刪除' ) } > 刪 除 </b> 
                </div>

                <div className="column is-10-desktop">  <Action_Scope/> </div>

            </div>

           




          </>

} ;

export default Auth_Shop
       