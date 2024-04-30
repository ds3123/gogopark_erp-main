/* eslint-disable react/jsx-pascal-case */


import A4_Print_Content_Common from "./A4_Print_Content_Common";


  // 核取方塊
  const check = ( str : string ) => <span key = { str } className = "m_Right_10" > 
                                      <i className = "far fa-square"></i> { str } 
                                    </span> ;

 
  // 大美容
  const beauty_Body_1 = [ "小電剪剃光" , "1.5mm" , "2mm" ] ;
  const beauty_Body_2 = [ "3mm" , "6.4mm" ] ;
  const beauty_Body_3 = [ "9.6mm" , "13mm" ] ;

  const beauty_Head_1   = [ "留頭" , "修圓" , "嘴邊修短" , "貴賓嘴"  ] ;
  const beauty_Head_2   = [  "雪納瑞頭" , "比熊頭" ] ;
  const beauty_Ear_1    = [ "不剪" , "稍修" , "剪短至耳緣" , "剪短一半" ] ;
  const beauty_Ear_2    = [ "耳罩" , "三角耳"  ] ;
  const beauty_Tail   = [ "留整條" , "留一小節" , "留尾球" , "剃光"  ] ;
  const beauty_Foot_1 = [ "靴子" , "腳球" , "貴賓腳" , "腳跟全身一樣長" ] ;
  const beauty_Foot_2 = [ "腳柱" , "頭.尾.腳.身體全光都不留" , "手剪" ] ;


// # A4 列印內容 : 美容單
const A4_Print_Content_Beauty = () => {


  return  <A4_Print_Content_Common type = "美容單" >

            <>
              <div className = "column is-2 border f_bold h-v-center" > 大美容 </div>
              <div className = "column is-7 border td_Left" style = {{ lineHeight : "22px" }} > 

                <p> <b> 身體 : </b>  ( 短 ) &nbsp; { beauty_Body_1?.map( ( x ) => check( x ) ) } </p> 
                <p className = "m_Left_50"> ( 中 ) &nbsp; { beauty_Body_2?.map( ( x ) => check( x ) ) } </p> 
                <p className = "m_Left_50"> ( 長 ) &nbsp; { beauty_Body_3?.map( ( x ) => check( x ) ) } </p> 
                      
                <p> <b> 頭臉 : </b>{ beauty_Head_1?.map( ( x ) => check( x ) ) } </p> 
                <p className = "m_Left_50"> { beauty_Head_2?.map( ( x ) => check( x ) ) } </p> 
                
                <p> <b> 耳朵 : </b> { beauty_Ear_1?.map( ( x ) => check( x ) ) }  </p>
                <p className = "m_Left_50"> { beauty_Ear_2?.map( ( x ) => check( x ) ) } </p> 

                <p> <b> 尾巴 : </b> { beauty_Tail?.map( ( x ) => check( x ) ) }  </p>

                <p> <b> 腳 : </b> <span className = "m_Left_15"> { beauty_Foot_1?.map( ( x ) => check( x ) ) } </span> </p>
                <p className = "m_Left_45"> { beauty_Foot_2?.map( ( x ) => check( x ) ) } </p> 
              
              </div>
              <div className = "column is-1 border" > </div>
              <div className = "column is-1 border" > </div>
              <div className = "column is-1 border" > </div>
            </>

          </A4_Print_Content_Common>

} ;

export default A4_Print_Content_Beauty  