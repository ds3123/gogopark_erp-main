/* eslint-disable react/jsx-pascal-case */
import Apply_Plan_Title from "./common/Apply_Plan_Title" ;
import Apply_Plan_Options from "./common/Apply_Plan_Options" ;


// @ 使用 _ 方案 ( 預設 : 包月洗澡、包月美容 / 自訂 )
const Create_Use_Plans = () => {
  
  
  return <div className = "column is-8-desktop" >

             { /* 標題 : 客戶、寵物、此次價格 */ }
             <Apply_Plan_Title /> 

             { /* 方案 _ 點選使用 / 紀錄標籤  */ }
             <Apply_Plan_Options />

          </div>
             
} ;

export default Create_Use_Plans  