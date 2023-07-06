import Taiwan_Zip_Code from "templates/form/Taiwan_Zip_Code" ;
import { useState , useEffect } from "react" ;
import { useDispatch } from "react-redux" ;
import { get_AllAccounts_By_Zipcode } from "utils/api/api_Account" ;  
import cookie from 'react-cookies';
import { useHistory } from "react-router-dom";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import { Toast } from 'templates/note/Toast';
import { Zipcode_Info } from "utils/Interface_Type" ;

import { fetch_Employee_With_Account_By_EmployeeId } from "utils/api/api_Employee" ;


// @ 選擇 _ 店家、成員帳號
const Select_Account = () => {


    const history  = useHistory();
    const dispatch = useDispatch() ;


    // 郵遞區號
    const [ zipcode , set_Zipcode ] = useState( '' ) ;

    
    // 特定郵遞區號下，所有商店
    const [ zipcode_Shops , set_Zipcode_Shops ]   = useState( [] ) ;


    // 特定商店下，所有員工
    const [ shop_Employees , set_Shop_Employees ] = useState( [] ) ;


    // 所選擇特定商店員工的 id
    const [ selected_Employee_Id , set_Selected_Employee_Id ] = useState( "" ) ;


    // 取得、回傳 : 郵遞區號
    const get_ZipCode_Info = ( info : Zipcode_Info ) => set_Zipcode( info['zipcode'] ) ;


    // 處理 _ 郵遞區號變動
    const handle_ZipCdoe_Change = ( zipcode : string ) => set_Zipcode( zipcode ) ;


    // 處理 _ 商店變動
    const handle_Shop_Change = ( id : string ) => {
    
        if( id === "請選擇" ){

            set_Shop_Employees( [] ) ;
            return false ;

        } 

        const selected_Shop  = zipcode_Shops.filter( ( x : any ) => x[ 'account_id' ].toString() === id ) ;
        const shop_Employees = selected_Shop[0]['shop_employees']  ;  // 所選擇商店的所有員工

        set_Shop_Employees( shop_Employees ) ;

    } ;


    // 處理 _ 員工變動
    const handle_Employee_Change = ( id : string ) => {
        
        if( id === "請選擇" ) return false ;

        set_Selected_Employee_Id( id ) ;
  
    } ;


    // 點選 _ 提交鈕
    const click_Submit = async( employee_Id : string ) => {

        if( !employee_Id ){

            alert( "尚未選擇 : 特定商店員工" ) ;
            return false

        }
        
        if( employee_Id ){

            // 取得 _ 該員工資料

            const res = await fetch_Employee_With_Account_By_EmployeeId( employee_Id ) ;
            
            // 設定 _ Cookie
            cookie.save( 'userInfo' , res.data , { path : '/' } ) ;

            // 關閉 Modal 
            dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;

            // 轉換 url
            history.push( '/wrongpath' ) ;
            history.push( '/index' ) ;

            Toast( "切換帳號成功" ) ;
    
        }
    
    } ;

    
    useEffect( () => {
             
       // 清空 _ 商店成員選項 
       set_Shop_Employees( [] ) ; 

       // 取得 _ 所選擇郵遞區號下，所包含的商店帳號選項
       if( zipcode ){

           get_AllAccounts_By_Zipcode( zipcode ).then( res => {

                set_Zipcode_Shops( res.data ) ;
            
           })

       }
              
    } , [ zipcode ] ) ;


    const title = { top : "45px" , right : "20px" } ;

    return <>  

                 { /* 店 家 */ } 
                 <div className="columns is-multiline  is-mobile m_Bottom_30">

                    <div className="column is-2-desktop relative"> 
                        <b className="absolute" style={ title }> <span className="fas fa-store"></span>&nbsp; 店 家 </b>
                    </div>

                    { /* 縣市、行政區  */ }
                    <div className="column is-4-desktop relative"> 
                    
                       <Taiwan_Zip_Code get_ZipCode_Info = { get_ZipCode_Info } />

                    </div>

                    <div className="column is-2-desktop  relative">

                        郵遞區號
                       <input className="input" value={ zipcode } type="text" onChange = { e => handle_ZipCdoe_Change( e.target.value ) } />

                    </div>


                    <div className="column is-3-desktop  relative">

                        <p> 編號：店名 ( 品牌 ) </p> 
                        <div className="select">

                            <select onChange = { e => handle_Shop_Change( e.target.value ) }>

                              { zipcode_Shops.length === 0 &&  <option value="尚未新增帳號"> 尚未新增帳號 </option>  }
                              
                              { zipcode_Shops.length === 0 ||

                                    <>

                                        <option value="請選擇"> 請選擇 </option>

                                        { zipcode_Shops.map( ( x , y ) => {

                                            return <option key = { y } value={ x['account_id'] } > 
                                                        { x['shop_num'] } : { x['shop_name'] } 
                                                    </option>

                                        } ) }
                                        
                                    </>

                              }  

                            </select>

                        </div>
                        
                    </div>

                </div>  

                { /* 成 員 */ }  
                <div className="columns is-multiline is-mobile m_Bottom_30">

                    <div className="column is-2-desktop relative"> 
                        <b className="absolute" style={title}> <span className="fas fa-user"></span>&nbsp; 成 員 </b>
                    </div>

                    <div className="column is-10-desktop"> 

                        <p> 姓名 ( 職稱 ) </p> 
                        <div className="select">

                            <select onChange = { e => handle_Employee_Change( e.target.value ) }>


                               { shop_Employees.length === 0 &&  <option value="尚未新增員工" > 尚未新增員工  </option>  }  


                               { shop_Employees.length === 0 || 

                                    <>

                                            <option value="請選擇"> 請選擇 </option>

                                            { shop_Employees.map( ( x , y ) => {

                                                return <option key={ y } value= { x['id'] }> 
                                                             { x['employee_name'] ? x['employee_name'] : x['account'] }  
                                                             ( { x['position_type'] ?  x['position_type']  :  x['employee_type'] } ) 
                                                        </option>


                                            }) }  
                                    
                                    </>

                               }

                            </select>

                        </div>

                    </div>

                </div>  

                <b className="tag is-large is-success pointer w-full"  onClick = { () => click_Submit( selected_Employee_Id ) } >  
                      <span className="fas fa-check"></span> &nbsp; 確 認 選 擇 
                </b>
                
          </> 


} ;

export default Select_Account
       