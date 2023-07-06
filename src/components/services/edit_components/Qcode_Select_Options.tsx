/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect_Filter_Available_Qcodes , 
         useEffect_Change_Qcode_Select } from "../hooks/useEffect_Qcode_Select_Options" ;


/*

   # 表單提交時，Q 碼下拉選單值，改由 Redux 傳送 ~
      * 原先為欄位 shop_Q_Code，透過 React Hook Form 傳遞 。但因一開始載入，"讀不到值"，遂改為 Redux 傳遞至 Create_Data_Container

*/


const way = {  fontSize : "11pt" , top : "-3px" , fontWeight : "bold" , color : "rgb(150,0,0)"  } as const ;



// 到店處理碼 ( Q ) 下拉欄位
const Qcode_Select_Options = () => {


    // 當天 / 目前 _ 可供使用 Q 碼
    const available_Qcode = useEffect_Filter_Available_Qcodes( ) ;
    
    // Qcode 下拉 _變動處理
    const handle_Change   = useEffect_Change_Qcode_Select( available_Qcode ) ;



    return  <div className="tag is-large is-white">

                <span> 到店處理碼 ( Q ) : </span> &nbsp;
                <div className="select is-small" >

                   <select  style = { way }  onChange = { e => handle_Change( e.target.value ) } >
                       {
                         available_Qcode.length > 0 &&
                            available_Qcode.map( ( x , y ) => <option key = { y } value = { x } > { x } </option> )
                       }
                   </select>

                </div>

             </div>

} ;

export default Qcode_Select_Options