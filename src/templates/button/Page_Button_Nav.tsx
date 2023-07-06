/* eslint-disable react/jsx-pascal-case */

import Page_Button from "./Page_Button"



type pages_Nav = {

      pages_Sum      : number ; // 總計頁數
      current_Page   : number ; // 目前頁數    
      setPage        : any ;    // 設定頁數
      isPreviousData : boolean ;
    
    }



// # 生成 _ 頁碼按鈕序列
const create_PageButton_Nav = ( page_Sum : number , current_Page : number )  => {

      // 依頁數總和，生成相應數字陣列
      const pagesArray = Array( page_Sum ).fill( null ).map( ( _ , index ) => index + 1 )
  
      // 依照目前頁數，利用函式，生成不同篩選條件
      let range : any ;
      if( current_Page <= 6 ) range = ( x : number ) => x <= 10
      if( current_Page > 6 )  range = ( x : number ) => x <= current_Page+4 && x >= current_Page-5 
  
      if( !range ) range = ( x : number ) => x <= 10 ;
  
      const filterArray = pagesArray.filter( x => range( x ) )
  
      return filterArray
  
  }
  


// @ 資料分頁按鈕序列 
const Page_Button_Nav = ( { pages_Sum , current_Page , setPage , isPreviousData } : pages_Nav ) => {


   const pagesArray  = create_PageButton_Nav( pages_Sum , current_Page ) ;
   

   return <div className='m_Top_50 m_Bottom_50 has-text-centered'>

            <button className="button is-medium" style={{ margin:"5px" }} onClick = { () => setPage( 1 ) }               disabled = { isPreviousData || current_Page === 1 }> 第一頁 </button>
            <button className="button is-medium" style={{ margin:"5px" }} onClick = { () => setPage( current_Page - 1) } disabled = { current_Page <= 1 }> 上一頁 </button>

            { pagesArray.map( pg => <Page_Button key = { pg } page = { pg } current_Page = { current_Page } setPage = { setPage } isPreviousData = { isPreviousData } /> )  }

            <button className="button is-medium" style={{ margin:"5px" }} onClick = { () => setPage( current_Page + 1) }        disabled = { current_Page >= pages_Sum }> 下一頁 </button>
            <button className="button is-medium" style={{ margin:"5px" }} onClick = { () => setPage( pages_Sum ) } disabled = { isPreviousData|| current_Page === pages_Sum } > 最後一頁 </button>

          </div>


} ;


export default Page_Button_Nav
       