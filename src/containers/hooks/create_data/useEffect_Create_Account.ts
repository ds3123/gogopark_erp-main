
import { columns_Covert_Account } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Account } from "hooks/react-query/account/useCreateAccount" ;
import { useCreate_Employee } from "hooks/react-query/employee/useCreateEmployee" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import cookie from 'react-cookies';
import { useHistory } from "react-router-dom" ;





// @ 新增 _ 帳號
export const useEffect_Create_Account = () => { 


    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    // # 新增函式
    const create_Account_Fun  = useCreate_Account() ;  // 帳號     
    const create_Employee_Fun = useCreate_Employee() ; // 員工
   


    // # 執行 _ 新增函式
    const create_Account = ( data : any ) => {

        // 轉換為資料表欄位
        const obj_Account = columns_Covert_Account( data ) ;

        
        // 新增 _ 帳號
        create_Account_Fun( obj_Account , {

                                            // 新增帳號成功後，再利用回傳的 account_id，新增 < 員工 : 管理帳號 > ( for 切換帳號用 )
                                            onSuccess : ( res ) => {

                                                const account_Id = res.data ; // 新增帳號 id
                                                                                                                    
                                                // 新增 _ 員工 : 管理帳號  
                                                create_Employee_Fun({   
                                                    
                                                                      account_id    : account_Id ,                // 所屬商店 id
                                                                      employee_type : "管理帳號" ,                 // 員工帳號類型 
                                                                      account       : `m_${ account_Id }` ,       // 預設帳號
                                                                      password      : `m_${ account_Id }` ,       // 預設密碼
                                                                        
                                                                    }) ;

                                                // ----------

                                                // 新增成功通知
                                                Toast( "已新增 : 店家帳號" ) ;
                                            
                                                // 關掉右側面板
                                                dispatch( set_Side_Panel( false , null ,{} ) ) ;

                                                // 延遲 500 ms ，前往帳號管理 ( 避免以上新增員工，前往員工管理 )
                                                setTimeout( () => { 
                                                    
                                                    // 設定 cookie ( for 前往 : 帳號管理 / 5 秒後銷毀 )
                                                    cookie.save( 'after_Created_Redirect' , '帳號管理'  ,  { path : '/' , maxAge : 5 } ) ;

                                                    history.push("/wrongpath");   // 錯誤路徑
                                                    history.push("/management");  // 正確路徑

                                                } , 500 ) ;


                                            }

                                          } ) ;
     
    }
     
    return create_Account

}


