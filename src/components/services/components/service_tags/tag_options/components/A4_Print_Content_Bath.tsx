/* eslint-disable react/jsx-pascal-case */
import A4_Print_Content_Common from "./A4_Print_Content_Common";


  // 核取方塊
  const check = ( str : string ) => <span key = { str } className = "m_Right_10" > 
                                      <i className = "far fa-square"></i> { str } 
                                    </span> ;


  const head = [ "貴賓嘴" , "耳朵" ] ;
  const foot = [ "貴賓腳" , "尾巴" ] ;
  const ear  = [ "屁股至大腿內側飾毛" ] ;


// # A4 列印內容 : 洗澡單
const  A4_Print_Content_Bath : React.FC< { data : any } > = ( { data } ) => {


  return <A4_Print_Content_Common type = "洗澡單" data = { data } >

            <>
               <div className = "column is-2 border f_bold h-v-center" > { check( "加修剪" ) } </div>
               <div className = "column is-7 border td_Left" style = {{ lineHeight : "22px" }} > 

                 <p> <b> 頭 : </b> _______________________ &nbsp; { head?.map( ( x ) => check( x ) ) } </p> 
                 <p> <b> 腳 : </b> _______________________ &nbsp; { foot?.map( ( x ) => check( x ) ) } </p> 
                 <p> <b> 耳 : </b> _______________________ &nbsp; { ear?.map( ( x ) => check( x ) ) }  </p> 
           
               </div>
               <div className = "column is-1 border" > </div>
               <div className = "column is-1 border" > </div>
               <div className = "column is-1 border" > </div>
            </>
             
         </A4_Print_Content_Common>

} ;

export default A4_Print_Content_Bath   