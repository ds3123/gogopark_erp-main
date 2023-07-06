/* eslint-disable react/jsx-pascal-case */
import { useEffect , useState } from "react" ;
import { useDispatch , useSelector } from "react-redux" ;
import { useLocation } from "react-router" ;
import { Link , useHistory } from "react-router-dom" ;
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Select_Account from "components/index/components/Select_Account" ;

// Cookie
import cookie from 'react-cookies' ;   
import { get_Today } from 'utils/time/date' ;
import Create_Data_Container from "containers/Create_Data_Container" ;
import Nav_Qcode_List from "components/services/Nav_Qcode_List" ;
import { Toast } from 'templates/note/Toast';


// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { get_Nav_Options } from "store/actions/action_Global_Layout" ;
import { useFetch_Services_By_ServiceDate_Polling_Today } from "hooks/react-query/service/useFetchServices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;

import { useEffect_Shop_Alert_Total_Num } from "components/management/hooks/useEffect_Management" ;


// # 導覽列 _ 選項
const Nav_Options = () => {


    const history  = useHistory() ;
    const dispatch = useDispatch() ;
    let location   = useLocation() ;  // 取得 : 路徑資訊




    // * 取得 _ 特定帳號、今日 : 服務、客戶、寵物 ( 輪詢 : 每隔 2 秒更新 )
   
    // 目前登入者，所屬店家 id
    const shop_Id            = useAccount_Shop_Id() ;
    const { data : pet_Arr } = useFetch_Services_By_ServiceDate_Polling_Today( shop_Id ) ;


    // 導覽列選項  
    const nav_Options = useSelector( ( state : any ) => state.Layout.Nav_Options ) ;


    // 使用者類別 ( Ex. 櫃台、美容 .... )
    const [ account , set_Account ] = useState({
                                                 employee_Type : '' , // 帳號類型( Ex.管理帳號、測試帳號、工作人員 )
                                                 position_Type : ''   // 職位類別( Ex.櫃台、美容、接送 )
                                               }) ;


    // 安親、住宿今日案件數                                                
    const [ care_Lodge_Num , set_Care_Lodge_Num ] = useState( 0 ) ;

                  
    // 資料管理( 第二層 )顯示待處理數量 ( for 管理區 )
    const dataManagement_Note_Num      = useEffect_Shop_Alert_Total_Num( shop_Id ) ;       


       
    // 點選 _ 登出鈕
    const click_SignOut = () => {

        // 刪除 cookie
        cookie.remove( 'userInfo' , { path : '/' } ) ;
        cookie.remove( 'after_Created_Redirect' , { path : '/' } ) ;

        Toast( "登出成功" ) ;

        // 轉址
        history.push('/');

    } ;

    
    // 顯示 _ Q code 面板
    const show_Qcode = () => dispatch( set_Side_Panel( true , <Nav_Qcode_List /> , { preLoadData : null } ) );


    // 顯示 _ 新增資料面板
    const add_Data = () => {

       
        // 回復、隱藏 : 新增表單區塊 ( Ex. 寵物、整體服務 )
        // dispatch( set_Is_Show_Sections( false ) ) ;   
   
        // 開啟 _ 右側新增面板 
        dispatch( set_Side_Panel( true , <Create_Data_Container /> , { create_Data : '客戶' , preLoadData : null } ) ) ;

        // 開啟 _ 除錯面板
        // dispatch( set_Debug_Info( true ) ) ;

    } 


    // 點選 _ 選擇帳號 ( 依照：縣市、行政區、編號 )    
    const click_Select_Account = ( data : any ) => {

       dispatch( set_Modal( true , <Select_Account /> , {  data : data , modal_Style : { width : "64%" , height:"350px" , left : "22%" , top : "0px" } } )) ;

    } ;



    // 設定 _ 使用者類別
    useEffect( () : any => {

        const _cookie = cookie.load( 'userInfo' ) ;

        if( _cookie  ){

            set_Account( { ...account , employee_Type : _cookie['employee_type'] , position_Type : _cookie['position_type'] , } )
        
            // 取得登入者資訊，設定相對應的導覽列選項 
            dispatch( get_Nav_Options( { employee_Type : _cookie['employee_type'] , position_Type : _cookie['position_type']  } ) ) ;

        
            // "美容"、"計時美容"，前往 :【 美容頁面 ( ~ /beautician ) 】
            if( _cookie['position_type'] === '美容' || _cookie['position_type'] === '計時美容' ) history.push('/beautician') ;

        }


        // add_Data() ;
        // show_Qcode() ;

    } , [] ) ;


    // 設定 _ 安親、住宿今日案件數
    useEffect( () : any => { 
    
        // 篩選、設定 _ 服務類型為 : 安親、住宿 
        const data = pet_Arr.filter( ( x : any ) => {

            return x['service_status'] === '當日安親' || x['service_status'] === '預約安親' || x['service_status'] === '當日住宿' || x['service_status'] === '預約住宿' 

        }) ;

        set_Care_Lodge_Num( data.length ) ;


    } , [ pet_Arr ] ) ;



   return  <div id="navbarExampleTransparentExample" className="is-hidden-mobile">


  

               <div className="navbar-start relative" style={{ top:"34%" , left:"30px" }} >

                   {

                     /* 業務功能頁面 */
                     nav_Options.map( ( option : any , index : number ) => {

                        const optionStyle = option.url === location.pathname ? { boxShadow : "1px 1px 5px 1px rgba(0,0,0,.6)" , borderRadius : "3px" } : {} ;

                        return <span className="relative" key = { index }>

                                 <Link to = { option.url }>
                                
                                   <span style = { optionStyle } className = { "tag is-medium is-rounded relative pointer "+option.color } >

                                         { /*  紅點顯示 ( 內有新增、待處理資料 ) */ }
                                         { 
                                            ( option.title === '住 宿' && care_Lodge_Num > 0 ) && 
                                                <b className="redDot"> { care_Lodge_Num } </b>  
                                         }  

{ 
                                         ( option.title === '管理區' && dataManagement_Note_Num > 0 ) && 
                                                <b className="redDot"> { dataManagement_Note_Num }  </b>  
                                         }  

                                         <i className = { option.icon }></i> &nbsp; { option.title }  

                                   </span> &nbsp; &nbsp;

                                 </Link>

                               </span>

                     })

                   }

                   {/* 功能按鈕 */}
                   {  ( account['employee_Type'] === '管理帳號' ||
                        account['employee_Type'] === '測試帳號' ||
                        account['position_Type'] === '櫃台' ||
                        account['position_Type'] === '計時櫃台' )  &&

                        <>

                            <span className="pointer tag is-medium is-rounded" onClick={ () => show_Qcode() } style={{ background : "rgb(150,0,0)" , color : "white" }}>
                                    <i className="fab fa-quora"></i> &nbsp; ( { get_Today().slice(4,8) } )
                                </span> &nbsp; &nbsp;

                            <span className="pointer tag is-medium is-black is-rounded"  onClick={ () => add_Data() }> <i className="fas fa-plus"></i> &nbsp; 新增資料  </span>

                            &nbsp; &nbsp; &nbsp;
                            
                        </>

                    }

                    { /*  登出鈕  */ }
                    <b className="tag is-medium is-rounded pointer relative" style={{ right : '-30px' }} onClick={ click_SignOut }>
                        <i className="fas fa-sign-out-alt"></i>
                    </b>


                    { /* 切換帳號 再確認 _ 是否刪除 2023.01.17 */ }
                    {/* <b className="tag is-medium is-rounded pointer relative" style={{ right : '-120px' }} onClick={ click_Select_Account } >
                        <i className="fas fa-server"></i>     
                    </b>       */}


               </div>

           </div>

} ;

export default Nav_Options  ;

