
import { useState , useEffect , useContext } from "react" ;

import axios from "utils/axios";
import cookie from 'react-cookies'

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;





// @ 櫃台人員
const Admin_User = ( ) => {

    // Context
    const value = useContext( SidePanelContext ) ;                             // 取得 context 值  
    const data  = value.preLoadData ? value.preLoadData : value.data ;         // 預先取得資料
    const { register , setValue , editType } = useReact_Hook_Form_Context( ) ; // 取得 context 值 : React Hook Form 屬性   


    // 櫃檯人員
    const [ admin_Users , set_Admin_Users ] = useState( [] );


    // 設定 _ 櫃台人員 ( 正職、計時 )
    useEffect( () : any => {

        let is_Mounted = true ;

        axios.get( '/employees' ).then( res => {

            // 篩選出 : 職位類型( position_type ) 為 "櫃台"、"計時櫃台"
            if( is_Mounted && res.data.length > 0 ){

                // 設定所取得的櫃檯人員
                const adminArr = res.data.filter( ( x : any ) => x['position_type'] && ( x['position_type'] === '櫃台' || x['position_type'] === '計時櫃台' ) ) ;
                
                set_Admin_Users( adminArr ) ;

                // 利用 Cookie ，根據目前登入帳號，設定 _ 櫃台人員下拉選單 "預設值" ( 若沒有櫃台人員，Ex. 測試帳號 ，設定為"請選擇" )
                const current_User = cookie.load('userInfo') ;
                setValue( 'admin_User' , current_User['employee_name'] ? current_User['employee_name'] : '測試員' ) ;

            }

        }).catch( error => {

            console.error( error.response.data ) ; // 顯示詳細錯誤訊息
         
        }) ;

        return () => is_Mounted = false

    } , [] ) ;



    return <div className="column is-4-desktop">

                <span className="tag is-large is-white">

                    <b> 櫃台人員 : </b> &nbsp;

                    { /* for 新增  */ }
                    { editType !== '編輯' &&

                        <div className="control has-icons-left">

                            <div className="select is-small relative">

                                <select  { ...register("admin_User") }  style={ { fontSize: "13pt" , top: "-7px" , fontWeight: "bold" } } >
                                    <option value="測試員"> 測試員 </option>
                                    { admin_Users.map( ( x , y) => <option key={y} value={ x['employee_name'] }> { x['employee_name'] } </option> )  }
                                </select>

                            </div>

                            <div className="icon is-medium is-left"> <i className="fas fa-user"></i> </div>

                        </div>

                    }

                    { /* for 編輯  */ }
                    { editType !== '編輯' ||

                        <b className="absolute" style={{ left : "122px" , top:"16px" }} >
                            <b className="fDblue m_Left_5"> { data?.admin_user === '測試員' ? '店長' : data?.admin_user }  </b>
                        </b>

                    }

                </span>

             </div>



} ;

export default Admin_User
       