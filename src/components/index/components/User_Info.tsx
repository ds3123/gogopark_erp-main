/* eslint-disable @typescript-eslint/no-unused-vars */

import { string_Short } from "utils/string/edit_string" ;
import { useEffect_Is_Detail_Mode } from "components/index/hooks/useEffect_Index" ;
import { useEffect_Click_Shop_Quota ,
         useEffect_Click_Member_Quota ,
         useEffect_Fetch_User_Account
       } from "../hooks/useEffect_User_Info" ;  


const info = {
                width         : "430px" ,
                top           : "15px" ,
                right         : "-12%" ,
                padding       : "18px",
                paddingBottom : "5px" ,
                paddingTop    : "20px" ,
                boxShadow     : "0px 0px 4px 0px rgba(0,0,0,.1)" ,
                borderRadius  : "5px" ,
                zIndex        : 3
             } as any ;

const type = { top:"0px" , left:"275px" } ;  
const tag  = "tag hover is-rounded pointer absolute" ;


// @ 登入使用者帳號資訊
const User_Info = () => {


    // 使用者類別 ( Ex. 櫃台、美容 .... )
    const account            = useEffect_Fetch_User_Account() ; 

    // 點選 _ 店家點數
    const click_Shop_Quota   = useEffect_Click_Shop_Quota() ;
    
    // 點選 _ 成員點數、紀錄
    const click_Member_Quota = useEffect_Click_Member_Quota() ;

    
    // 首頁詳細模式 ( 展開所有統計資料 ) / 點選 _ 詳細模式
    const { is_Detail_Mode , click_Detail_Mode } = useEffect_Is_Detail_Mode() ;
    
    const title = string_Short( account['employee_Type'] === '測試帳號' ? '店長' : account['position_Type'] , 8 ) ;


    return <div className="absolute" style = { info } >

            
                { /* 使用者名稱 / 暱稱 */ }
                { ( account['employee_Name'] || account['account'] ) &&

                    <>  
                  
                        <div className="m_Bottom_25 relative"> 

                           店家 :
                           
                           <b className="fDred"> { string_Short( account['shop_Name'] , 13 ) } </b>&nbsp;( { account['shop_Zipcod'] }-{ account['shop_Num'] } ) &nbsp;
                          
                           { /* <b className={ tag } style={ type } onClick={ () => click_Shop_Quota( "data" ) } > 點數 ： 1000 </b> */ }
                          
                           { /* Trello 問題反應連結 */ }
                           <a href = "https://trello.com/invite/b/XJvSnjQ3/ATTIa5ac40d83dbcb96828b67ba9e4504370389D4AD6/問題反應" target = "_blank" rel="noreferrer" >
                            
                                <b className="tag is-medium is-link is-rounded m_Left_20 pointer absolute" style = {{ top:"0px" , right : "0px" }}> 
                                    <i className="fab fa-trello"></i> &nbsp; 問題反應 
                                </b>

                            </a>

                        </div>

                        <div className="m_Bottom_15 relative">
                        
                           成員 : 
                           
                           <b className="fGreen"> { string_Short( account['employee_Name'] ? account['employee_Name'] : account['account'] , 10 ) } </b>
                          
                           ( { title ? title : '最高管理帳號'  } ) &nbsp; 

                           {/* <b className={ tag } style={ type } onClick={ ()=> click_Member_Quota( "data" ) } > 點數 : 205 / 操作 ： 3 </b> */}

                        </div>
                    
                    </> 

                }

                { /* 切換 ： 設定 _ 詳細模式 */ }
                { /*     

                    <div className="f_18 pointer" style={{ float:"right", top:"-5px" }} onClick={ click_Detail_Mode }>
                        { is_Detail_Mode  && <i className="fas fa-toggle-on"></i>  }
                        { !is_Detail_Mode && <i className="fas fa-toggle-off"></i>  }
                    </div> 

                */}

           </div>

} ;


export default User_Info
        