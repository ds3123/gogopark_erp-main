import { useState } from "react" ;


type Search = {
   get_Search_Text : ( text : string ) => void ;  // 取得 _ 搜尋框輸入文字
   refetch? : any ;
}


const bt_2 = { background:"black" , color:"white" , borderRadius : "10px" , marginLeft : "10px" }



// @ 搜尋框
const SearchBar = ( { get_Search_Text , refetch } : Search ) => {

   const [ text , set_Text ] = useState( "" ) ;


   // 輸入資料變化
   const handleChange = ( e : any ) => {

      const value = e.target.value ;

      set_Text( value ) ;

      get_Search_Text( value ) ;  // 回傳父元件，所輸入文字

   } ;


   // 點選 _ 搜尋按鈕
   const click_Search = () => {
   
      if( text ){ 
         
         refetch() ; // 取得資料
      
      }else{

         alert( "請輸入搜尋關鍵字" ) ;

      }

   } ;



   return <div className="field has-addons">


            <span className="control"> 
              <button className="button hover" onClick = { () => window.location.reload() } > <i className="fas fa-sync-alt"></i> </button> 
            </span>

            <span className="control is-expanded">

                <input type        = "text"
                       className   = "input"
                       placeholder = "請輸入搜尋關鍵字 ..."
                       value       = { text }
                       onChange    = { e => handleChange(e) } />

            </span>

            <span className="control"> 
              <button className="button" style={ bt_2 } onClick={ click_Search }> <i className="fas fa-search"></i> </button> 
            </span>

          </div>

};

export default SearchBar;