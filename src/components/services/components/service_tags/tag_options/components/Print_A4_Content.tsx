

// 核取方塊
const check = ( str : string ) => <span key = { str } className = "m_Right_10" > 
                                    <i className = "far fa-square"></i> { str } 
                                  </span> ;


  // 主人交代
  const cus_Notes   = [ "給水" , "遛狗" , "老犬" , "心臟病" , "會兇狗" , "會咬繩" ] ;
  
  // 自備物品
  const cus_Objects = [ "項圈.胸背" , "牽繩" , "提籠.提袋" , "衣服" , "口罩" , "頭套" , "洗劑" , "耳藥" ] ;
 
  // 大美容
  const beauty_Body_1 = [ "小電剪剃光" , "1.5mm" , "2mm" ] ;
  const beauty_Body_2 = [ "3mm" , "6.4mm" ] ;
  const beauty_Body_3 = [ "9.6mm" , "13mm" ] ;

  const beauty_Head   = [ "留頭" , "修圓" , "嘴邊修短" , "貴賓嘴" , "雪納瑞頭" , "比熊頭" ] ;
  const beauty_Ear    = [ "不剪" , "稍修" , "剪短至耳緣" , "剪短一半" , "耳罩" , "三角耳"  ] ;
  const beauty_Tail   = [ "留整條" , "留一小節" , "留尾球" , "剃光"  ] ;
  const beauty_Foot_1 = [ "靴子" , "腳球" , "貴賓腳" , "腳跟全身一樣長" ] ;
  const beauty_Foot_2 = [ "腳柱" , "頭.尾.腳.身體全光都不留" , "手剪" ] ;

  // 梳廢毛
  const comb = [ "無" , "有" , "輕" , "中" , "重" ] ;

  // 洗澡
  const bath_1 = [ "第一道" , "伊斯特除蚤.皮膚" , "貓咪"  ] ;
  const bath_2_1 = [ "第一道" , "伊斯特除蚤.皮膚" , "抗癢" , "賦活" , "澎毛" ] ;
  const bath_2_2 = [ "淡雅 ( 中大狗 )" , "玫瑰" , "貓咪" , "潤絲" ] ;
  const bath_3_1 = [ "第一道" , "伊斯特除蚤.皮膚" , "抗癢" , "賦活" , "澎毛" ] ;
  const bath_3_2 = [ "淡雅 ( 中大狗 )" , "玫瑰" , "貓咪" , "潤絲" ] ;
  
  // 烘乾
  const dry = [ "進烘箱" , "手吹" ] ;

  // 基礎
  const basic_1 = [ "指甲剪不流血為主" , "不剪" , "剪1/2掉" , "賽指"  ] ;
  const basic_2 = [ "不清耳朵" , "中、大型狗要剃肚毛" ] ;
  
  // 小美容
  const basic_3 = [ "是" , "否" ] ;
  const basic_4 = [ "不噴香水" , "要綁頭花" ] ;

  // 等候情形
  const wait    = [ "進籠子" , "運動場" , "美容桌上等候" ] ;


  // 告知主人
  const info_1  = [ "輕" , "中" , "重" ] ;
  const info_2  = [ "輕" , "中" , "重" ] ;
  const info_3  = [ "擠肛門腺" , "掃水" , "碰頭" , "剪指甲" , "清耳朵" , "其他" ] ;
  const info_4  = [ "左" , "右" , "兩眼 _________" ] ;
  const info_5  = [ "左" , "右" , "兩耳" , "黃" , "咖啡" , "灰綠" , "建議看醫生" ] ;
  const info_6  = [ "皮屑" , "略紅" , "紅點" , "結痂" , "傷口 _________" , "建議看醫生" ] ;
  const info_7  = [ "壁蝨 ____ 隻" , "跳蚤" , "建議點藥" ] ;
  const info_8  = [ "此次受傷 _________________ ( 人員 ＿＿＿＿＿ )" ] ;
  



// # A4 列印內容
const A4_Print_Content = () => {

  return <div className = "columns is-multiline has-text-centered" >

            <div className = "column is-12 border" > 
               <p className = "f_18 f_bold" > 狗狗公園 快樂狗旅館 </p>
               <p className = "f_14 f_bold" > 洗澡美容紀錄表     </p>
            </div>

            <div className = "column is-8 td_Left border f_bold" > 寵物編號： </div>
            <div className = "column is-4 td_Left border f_bold" > 櫃檯人員：</div>

            <div className = "column is-2 border" > <b> 日期 / 號 </b> </div>
            <div className = "column is-2 border" > <b> 品種      </b> </div>
            <div className = "column is-2 border" > <b> 寵物名字  </b> </div>
            <div className = "column is-2 border" > <b> 主人電話  </b> </div>
            <div className = "column is-2 border td_Left" > <b> 到店 </b> </div>
            <div className = "column is-2 border" > <b> 住 . 接  </b> </div>

            <div className = "column is-2 border" > </div>
            <div className = "column is-2 border" > </div>
            <div className = "column is-2 border" > </div>
            <div className = "column is-2 border" > </div>
            <div className = "column is-2 border td_Left" > <b> 離店 </b> </div>
            <div className = "column is-2 border" > <b> 住 . 送 </b> </div>

            { /* 主人交代 */ }
            <div className = "column is-10 border td_Left" > 
                   
                      <p> <b> 主人交代 : </b>  </p> 
                      <p className = "m_Left_40"> { cus_Notes?.map( ( x ) => check( x ) ) }</p> 
                     
                      <br/>
                      <p> <b> 自備物品 : </b>  </p> 
                      <p className = "m_Left_40"> { cus_Objects?.map( ( x ) => check( x ) ) }</p> 

                      <br/>

                      <p className = "has-text-right" > 預計： ＿＿＿＿＿______＿ 來接 </p>
                  
            </div>
            <div className = "column is-2 border td_Left h-v-center" > 
              <div>
                <b> 通知情形 : </b>
                <p> { check( "已聯絡" ) } </p>
                <p> { check( "未接" ) }   </p>
              </div>
            </div>

            { /* 備註 */ }
            <div className = "column is-2 border f_bold h-v-center" style={{ height:"90px" }}> 備 註  </div>
            <div className = "column is-10 border td_Left" > </div>



            <div className = "column is-2 border f_bold h-v-center" > 流 程 </div>
            <div className = "column is-7 border f_bold h-v-center" > 內 容 </div>
            <div className = "column is-1 border f_bold h-v-center" > 人 員 </div>
            <div className = "column is-1 border f_bold h-v-center" > 時 間 </div>
            <div className = "column is-1 border f_bold relative" >  
                 <span className = "f_11" > 
                    易~難 <br/>
                     <span className = "f_10"> ( 1~5 ) </span>
                  </span>
            </div>

            { /* 大美容 */ }
            <div className = "column is-2 border f_bold h-v-center" > 大美容 </div>
            <div className = "column is-7 border td_Left" > 

               <p> <b> 身體 : </b>  </p> 
               <p className = "m_Left_40"> ( 短 ) &nbsp; { beauty_Body_1?.map( ( x ) => check( x ) ) } </p> 
               <p className = "m_Left_40"> ( 中 ) &nbsp; { beauty_Body_2?.map( ( x ) => check( x ) ) } </p> 
               <p className = "m_Left_40"> ( 長 ) &nbsp; { beauty_Body_3?.map( ( x ) => check( x ) ) } </p> 
                     
               <br/>

               <p> <b> 頭臉 : </b> </p>
               <p className = "m_Left_40"> { beauty_Head?.map( ( x ) => check( x ) ) } </p> 
               
               <br/>

               <p> <b> 耳朵 : </b> </p>
               <p className = "m_Left_40"> { beauty_Ear?.map( ( x ) => check( x ) ) } </p> 

               <br/>

               <p> <b> 尾巴 : </b> </p>
               <p className = "m_Left_40"> { beauty_Tail?.map( ( x ) => check( x ) ) } </p> 

               <br/>

               <p> <b> 腳 : </b> </p>
               <p className = "m_Left_40"> { beauty_Foot_1?.map( ( x ) => check( x ) ) } </p> 
               <p className = "m_Left_40"> { beauty_Foot_2?.map( ( x ) => check( x ) ) } </p> 
            
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
           
            { /* 梳廢毛 */ }
            <div className = "column is-2 border f_bold" > 梳廢毛 </div>
            <div className = "column is-7 border td_Left" > 
               { comb?.map( ( x ) => check( x ) ) } 
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 洗澡：第一道 */ }
            <div className = "column is-2 border f_bold h-v-center" > 洗澡：第一道 </div>
            <div className = "column is-7 border td_Left" > 
                <p> { bath_1?.map( ( x ) => check( x ) ) } </p>
                <p className = "m_Top_20"> { check( "自備：_______________________" ) }  </p>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 洗澡：第二道 */ }
            <div className = "column is-2 border f_bold h-v-center" > 洗澡：第二道 </div>
            <div className = "column is-7 border td_Left" > 
                <p> { bath_2_1?.map( ( x ) => check( x ) ) } </p>
                <p> { bath_2_2?.map( ( x ) => check( x ) ) } </p>
                <p className = "m_Top_20"> { check( "自備：_______________________" ) }  </p>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 浸泡 */ }
            <div className = "column is-2 border f_bold" > 浸 泡 </div>
            <div className = "column is-7 border td_Left" > 
                (  滴食鹽水 )
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>


            { /* 洗澡：第三道 */ }
            <div className = "column is-2 border f_bold h-v-center" > 
                 <p> 
                    洗澡：第三道 <br/>
                    <span className = "f_10" >  ( 必要時或重洗 )</span>
                 </p>
                 
            </div>
            <div className = "column is-7 border td_Left" > 
                <p> { bath_3_1?.map( ( x ) => check( x ) ) } </p>
                <p> { bath_3_2?.map( ( x ) => check( x ) ) } </p>
                <p className = "m_Top_20"> { check( "自備：_______________________" ) }  </p>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 浸泡 */ }
            <div className = "column is-2 border f_bold" > 浸 泡 </div>
            <div className = "column is-7 border td_Left" > 
                (  滴食鹽水 )
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 烘乾 */ }
            <div className = "column is-2 border f_bold" > 烘 乾 </div>
            <div className = "column is-7 border td_Left" > 
                { dry?.map( ( x ) => check( x ) ) }
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 基礎 */ }
            <div className = "column is-2 border f_bold h-v-center" > 基 礎 </div>
            <div className = "column is-7 border td_Left" > 
               <p> { basic_1?.map( ( x ) => check( x ) ) } </p>
               <p> { basic_2?.map( ( x ) => check( x ) ) } </p>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
         
            { /* 小美容修剪 */ }
            <div className = "column is-2 border f_bold h-v-center" > 小美容修剪 </div>
            <div className = "column is-7 border td_Left" > 
               <p> { basic_3?.map( ( x ) => check( x ) ) } </p>
               <p className = "m_Top_20" > { basic_4?.map( ( x ) => check( x ) ) } </p>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            
            { /* 等候情形 */ }
            <div className = "column is-2 border f_bold" > 等候情形 </div>
            <div className = "column is-7 border td_Left" > 
               <p> { wait?.map( ( x ) => check( x ) ) } </p>
            </div>
            <div className = "column is-3 border td_Left" > 
            
                <b> 檢查員簽名 </b>
            
            </div>
            
            { /* 告知主人 */ }
            <div className = "column is-2 border f_bold h-v-center" > 
                <p> 
                    告知主人 <br/>
                    { check( "都正常" ) } 
                </p>
            </div>
            <div className = "column is-10 border td_Left" > 
              
              <p> <b className = "m_Right_10"> 打結 </b> { info_1?.map( ( x ) => check( x ) ) } </p> 
              <p> <b className = "m_Right_10"> 廢毛 </b> { info_2?.map( ( x ) => check( x ) ) } </p> 
              <p> <b className = "m_Right_10"> 會兇 </b> { info_3?.map( ( x ) => check( x ) ) } </p> 
              <p> <b> 眼 </b>  <span className = "relative" style = {{ left : "26px" }} > { info_4?.map( ( x ) => check( x ) ) } </span> </p> 
              <p> <b> 耳 </b>  <span className = "relative" style = {{ left : "26px" }} > { info_5?.map( ( x ) => check( x ) ) } </span> </p> 
              <p> <b className = "m_Right_10"> 皮膚 </b> { info_6?.map( ( x ) => check( x ) ) } </p> 
              <p> <b className = "m_Right_10"> 體外 </b> { info_7?.map( ( x ) => check( x ) ) } </p> 
              <p className = "m_Top_20" > { info_8?.map( ( x ) => check( x ) ) } </p> 

            </div>
            
        
            { /* 客戶意見 */ }
            <div className = "column is-2 border f_bold h-v-center" > 客戶意見 </div>
            <div className = "column is-6 border td_Left" > 
               
            </div>
            <div className = "column is-2 border" > 
              
               <p style = {{ borderBottom : "1px solid black" }} > 第幾次 / 金額 </p>
               <br/>

            </div>
            <div className = "column is-2 border" > 
                <p style = {{ borderBottom : "1px solid black" }}> 入電腦 </p>
                <br/>
            </div>


         </div>

} ;

export default A4_Print_Content  