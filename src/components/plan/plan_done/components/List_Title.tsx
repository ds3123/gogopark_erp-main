
import { FC } from 'react' ;

// 標題欄位
const column = ( title : string ) => 
    <div className = "column is-3 has-text-centered f_13 f_bold" > { title } </div>


const List_Title : FC = () => 
       <>
         <hr/>  
         <div className = "columns is-multiline m_Top_50" > 
           { column( "方案類型" ) }
           { column( "寵物名字 ( 品種 / 序號 )" ) }
           { column( "客戶姓名 ( 手機 / 身分證字號 )" ) }
           { column( "方案使用紀錄" ) }
         </div>    
       </>   ;

export default List_Title
       