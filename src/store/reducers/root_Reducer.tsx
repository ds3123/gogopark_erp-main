
import { combineReducers } from "redux" ;
import reducer_Global_Layout  from "store/reducers/reducer_Global_Layout"
import reducer_Global_Setting  from "store/reducers/reducer_Global_Setting"

import reducer_Basic from "store/reducers/reducer_Basic";

import reducer_Extra_Service_Fee from "store/reducers/reducer_Extra_Service_Fee";
import reducer_Error from "store/reducers/reducer_Error";
import reducer_Info from "store/reducers/reducer_Info"
import reducer_Customer from "store/reducers/reducer_Customer";
import reducer_Pet from "store/reducers/reducer_Pet";
import reducer_Beautician from "store/reducers/reducer_Beautician";
import reducer_Index from "store/reducers/reducer_Index";
import reducer_Service from "store/reducers/reducer_Service";
import reducer_Lodge from "store/reducers/reducer_Lodge";
import reducer_Other from "store/reducers/reducer_Other";

import reducer_Plan from "store/reducers/reducer_Plan";
import reducer_Care from "store/reducers/reducer_Care";
import reducer_Management from "store/reducers/reducer_Management";
import reducer_Form_Validator from "store/reducers/reducer_Form_Validator";
import reducer_Test from "store/reducers/reducer_Test";
import reducer_Cache from "store/reducers/reducer_Cache";
import reducer_Price from "store/reducers/reducer_Price";
import reducer_Finance from "store/reducers/reducer_Finance";
import reducer_Log from "store/reducers/reducer_Log" ;
import reducer_Search from "store/reducers/reducer_Search" ;
import reducer_Summary from "./reducer_Summary";


// 測試練習
import { reducer_Success } from "components/test/udemy/reducers/reducer_Success"
import { reducer_GuessWord } from "components/test/udemy/reducers/reducer_GuessWord";


const all_Reducer = combineReducers({

                         // @ 整體、全局 _ 版面狀態
                         "Layout"     : reducer_Global_Layout ,

                         // @ 整體、全局 _ 設定
                         "Setting"    : reducer_Global_Setting ,

                         // @ 首頁
                         "Index"      : reducer_Index ,

                         // @ 服務單資料
                         "Basic"      : reducer_Basic ,            // 基礎單
                         
                         "Service"    : reducer_Service ,           // 洗美頁資料

                         "Info"       : reducer_Info ,              // 基本資料 ( 服務性質、處理碼、到店日期 ... )

                         "Extra_Fee"  : reducer_Extra_Service_Fee , // 服務額外費用( Ex. 接送費 )
                  
                         // @ 服務異常
                         "Error"      : reducer_Error ,               


                         // @ 美容師專區
                         "Beautician" : reducer_Beautician ,

                         // @ 客戶
                         "Customer"   : reducer_Customer ,

                         // @ 寵物
                         "Pet"        : reducer_Pet ,

                         // @ 安親
                         "Care"       : reducer_Care ,

                         // @ 住宿
                         "Lodge"      : reducer_Lodge ,
                         
                         // @ 其他(收支)
                         "Other"      : reducer_Other ,

                         // @ 方案
                         "Plan"       : reducer_Plan ,

                         // @ 管理區
                         "Management" : reducer_Management ,

                         // @ 管理區 > 綜合報表
                         "Finance"    : reducer_Finance , 


                         // @ 表單 ( 自訂驗證 )
                         "Form"       : reducer_Form_Validator ,


                         // @ 快取
                         "Cache"      : reducer_Cache ,  

                         // @ 價格
                         "Price"      : reducer_Price ,


                         // @ 使用者 Log 紀錄
                         "Log"        : reducer_Log , 

                         // ＠ 搜尋 
                         "Search"     : reducer_Search ,

                         // @ 服務單明細
                         "Summary"    : reducer_Summary ,

                         // @ 測試練習 ( 2022.03.06 ) 
                         "Test"       : reducer_Test ,

                         "Success"    : reducer_Success , 
                         "GuessWord"  : reducer_GuessWord ,

                     }) ;


// 將所有 state ， 重設為 : 預設值 （ https://www.digitalocean.com/community/tutorials/redux-reset-state-redux ）
const root_Reducer = ( state : any , action : any ) => {

 
      if( action.type === 'RESET_APP') { // 重設 Action

         const { Layout } = state ;      
         
         state = { Layout } ;            // 將所有 state 重設為預設值時， 排除 _ Layout 相關 state 

      }

      return all_Reducer( state , action ) ;

} 

export default root_Reducer ;



