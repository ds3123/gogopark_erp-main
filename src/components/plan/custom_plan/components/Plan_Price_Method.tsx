import { useState , useEffect , useContext} from "react" ;


import { ModalContext } from "templates/panel/Modal" ;

import useCreate_Custom_Plan_Context from "../contexts/createCustomPlanContext" ;



type price_Method = {

    setValue     : any ;
    register     : any ;
    isValid      : boolean ;

    edit_Type    : string ;

}

// @ 個別消費計價方式 : 平均計算 & 自行計算
const Plan_Price_Method = ( { setValue , register , isValid , edit_Type } : price_Method ) => {

   
    // # 目前新增自訂方案，所設定 :
    const {                                
            current_Custom_Bath_Num ,        // 洗澡次數     
            current_Custom_Beauty_Num ,      // 洗澡次數
            current_Custom_DefaultPrice ,    // 預設價格
            set_Current_Custom_Price_Method  // 設定 _ 計價方式
          } = useCreate_Custom_Plan_Context();    


    // 取得 Moal 傳遞過來的資料 ( for 【 編輯 】 )
    const value            = useContext( ModalContext ) as any ;                                        // 取得 context 值
    const species_Data     = value.data ;                                                               // 寵物資料 
   // const custom_Plan_Name = species_Data ? species_Data['current_Custom_Plan']['plan_Name'] : '' ;   // 自訂方案名稱 
   


    // 計價方式
    const [ price_Method , set_price_Method ] = useState< "平均計算" | "自行計算" >( "平均計算" )

    // 點選 _ 計價方式
    const click_Price_Method = ( method : "平均計算" | "自行計算" ) => {

        set_price_Method( method ) ; 
        set_Current_Custom_Price_Method( method )  ;

    } 


    // 設回 : 預設值 ( for【 新增 】 )
    useEffect( () => { 

        if( edit_Type === "新增" ) set_Current_Custom_Price_Method( "平均計算" )  ;
        
    } , [] ) ;


    




    return  <div className="relative" style={{top:"-20px"}}>

                          
                <label className="label relative" style={{ fontSize : "1.3em" }} >
            
                    <i className = "fas fa-calculator"></i> &nbsp; 個別消費 _ 計價方式 : &nbsp;   

                    { edit_Type === "新增" && 

                        <>  
                            <b className = { `tag is-medium is-warning ${ price_Method === '平均計算' ? '' : 'is-light' } pointer m_Right_15` } 
                            onClick   = { () => click_Price_Method( "平均計算" ) } > 平均計算 ( 總次數 : { current_Custom_Bath_Num + current_Custom_Beauty_Num } ) 
                            </b>  

                            {/* 
                                 有錯誤，再檢查 2022.12.09
                                <b className = { `tag is-medium is-warning ${ price_Method === '自行計算' ? '' : 'is-light' } pointer`}             
                                onClick   = { () => click_Price_Method( "自行計算" ) } > 自行計算 ( 總次數 : { current_Custom_Bath_Num + current_Custom_Beauty_Num } )  
                                </b>   
                            
                            */}
                        </>

                    } 

                    { edit_Type === "編輯" && 

                    <>  
                       { 
                          price_Method === "平均計算" &&
                            <b className = { `tag is-medium is-warning ${ price_Method === '平均計算' ? '' : 'is-light' } pointer m_Right_15` } > 平均計算 ( 總次數 : { current_Custom_Bath_Num + current_Custom_Beauty_Num } ) </b>  
                       }

                       { 
                          price_Method === "自行計算" &&                  
                           <b className = { `tag is-medium is-warning ${ price_Method === '自行計算' ? '' : 'is-light' } pointer`} > 自行計算 ( 總次數 : { current_Custom_Bath_Num + current_Custom_Beauty_Num } ) </b>  

                      } 
                    </>

} 
                    

                </label> 

                <div className="columns is-multiline is-mobile relative"> 
                
                    { price_Method === "平均計算" &&

                        <div className="column is-12-desktop relative"> 
                            <span className="tag is-medium is-white f_14 m_Left_30"> 
                                每次消費金額 : &nbsp;<b className="fRed"> ${ Math.round( current_Custom_DefaultPrice / ( current_Custom_Bath_Num + current_Custom_Beauty_Num ) ) } </b>  
                            </span>  
                        </div>
                        
                    }  

                    { /* price_Method === "自行計算" 已經刪除 2023.01.07 */ }
                
            
                </div>

               

            </div>   

} ;

export default Plan_Price_Method
       

