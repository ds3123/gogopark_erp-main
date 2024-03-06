/* eslint-disable react/jsx-pascal-case */
import { FC } from 'react' ;
import Records_Row_Title from './Records_Row_Title';


type Row = {
    data    : any ;
    content : React.ReactNode
}



// # 洗澡 / 美容 : 紀錄列
const Note_Records_Row : FC< Row > = ( { data , content } ) => {


  return <div className = "m_Bottom_40 p_20 relative">
      
            { /* 紀錄標題 */ }
            <Records_Row_Title data = { data } />

            { /* 紀錄內容 */ }
            <div className = "columns" style = {{ minHeight : "100px" }} >

                { content }

            </div>

            <hr className = "m_Top_50" />

         </div> 
         
} ;

export default Note_Records_Row  