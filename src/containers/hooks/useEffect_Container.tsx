import { fetch_Employee_With_Account_By_EmployeeId } from "utils/api/api_Employee" ;        
import { Toast } from 'templates/note/Toast';
import { string_Short } from "utils/string/edit_string" ;
import { useFetch_Employees } from "hooks/react-query/employee/useFetchEmployees" ;
import cookie from 'react-cookies';


// 取得 _ 所有 ( 各家店 ) 管理帳號 ( employee_type 為 "管理帳號" )
export const useEffect_Fetch_Admin_Employees = () => {

    // 所有員工資料
    const shop_Employees  = useFetch_Employees() ;

    // 篩選出 _ 管理帳號
    const admin_Employees = shop_Employees.filter( x => x[ "employee_type" ] === "管理帳號" ) ;

    return admin_Employees

} ;


// 元件 : 切換 ( 管理帳號員工 ) 下拉選單
export const useEffect_User_Account_Select_Component = () => {


       // 目前 Cookie
       const _cookie         = cookie.load( 'userInfo' ) ;  
       const current_User_Id = _cookie?.id  ;              // 使用者 id
       const employee_Type   = _cookie?.employee_type ;    // 員工內容 ( Ex. 管理帳號、測試帳號、工作人員 )


       // 取得 _ 所有 ( 各家店 ) : 管理帳號 ( employee_type 為 "管理帳號" )
       const admin_Employees = useEffect_Fetch_Admin_Employees() ;

                                    
       // 切換函式
       const change_Account = async( e_Id : string ) => {
       
            // 取得 _ 管理帳號員工資料  
            const admin_Employee = await fetch_Employee_With_Account_By_EmployeeId( e_Id ) ;

            // 設定 _ Cookie
            cookie.remove( 'userInfo' , { path : '/' } ) ;
            cookie.save( 'userInfo' , admin_Employee , { path : '/'  } ) ;

            Toast( "帳號切換成功" ) ;

            window.location.reload() ;

       
       } ;



      // 切換帳號下拉元件 
      const Account_Select = () => <div className="control has-icons-left m_Bottom_70">
  
                                      <>

                                          <div className="select">

                                                <select value = { current_User_Id } onChange={ e => change_Account( e.target.value ) } >

                                                      {
                                                            admin_Employees.map( ( x , y ) => {

                                                                                                const shop = x?.shop_account ; // 店家資訊
                                                                                                
                                                                                                return <option value = { x?.id } key = { y } >

                                                                                                            { shop?.account_id } _ &nbsp; 
                                                                                                            { string_Short( shop?.shop_name , 8 ) } &nbsp; 
                                                                                                            ( { shop?.district } : { shop?.zipcode } - { shop?.shop_num } )

                                                                                                      </option> 
                                                                  
                                                                                                } )
                                                      }

                                                </select>

                                          </div>

                                          <div className="icon is-small is-left"> <i className="fas fa-store-alt"></i> </div>
                                          
                                      </>

                                    </div>



      return Account_Select


} ;

