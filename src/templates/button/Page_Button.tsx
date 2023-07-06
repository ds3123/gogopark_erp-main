
type PB = {
  page           : number ;  // 該按鈕頁碼
  current_Page   : number ;  // 目前所點選按鈕頁碼
  setPage        : any ;     // 設定頁碼
  isPreviousData : boolean
}


// ＠ 分頁按鈕 ( 資料列表下方 )
const Page_Button = ( { page , current_Page , setPage , isPreviousData } : PB ) => {


  // 按鈕樣式 
  let btStyle = ( page === current_Page ) ? 
                   { margin : "5px" , backgroundColor : "rgb( 40, 170, 210 )" , color : "white" } : 
                   { margin : "5px" } ;


  return <button className = "button is-medium" 
                  style    = { btStyle } 
                  onClick  = { () => setPage( page ) } > 
  
           { page } 

         </button>



}

        

export default Page_Button
       