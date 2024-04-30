

  // 核取方塊
  const check = ( str : string ) => <span key = { str } className = "m_Right_10" > 
                                      <i className = "far fa-square"></i> { str } 
                                    </span> ;

  const h_30 = { height : "30px" } ;
  const h_35 = { height : "35px" } ;
  const h_40 = { height : "40px" } ;
  const h_45 = { height : "45px" } ;
  const h_50 = { height : "50px" } ;
  const h_55 = { height : "55px" } ;
  const h_60 = { height : "60px" } ;

  // 主人交代
  const cus_Notes   = [ "給水" , "遛狗" , "老犬" , "心臟病" , "會兇狗" , "會咬繩" ] ;
  
  // 自備物品
  const cus_Objects = [ "項圈.胸背" , "牽繩" , "提籠.提袋" , "衣服" , "口罩" , "頭套" , "洗劑" , "耳藥" ] ;
 
 
  // 梳廢毛
  const comb = [ "無" , "有" , "輕" , "中" , "重" ] ;

  // 洗澡
  const bath_1 = [ "第一道" , "伊斯特除蚤.皮膚" , "貓咪"  ] ;
  const bath_2_1 = [ "第一道" , "伊斯特除蚤.皮膚" , "舒活" , "澎毛" ] ;
  const bath_2_2 = [ "淡雅 ( 中大狗 )" , "玫瑰" , "貓咪" , "潤絲" ] ;
  const bath_3_1 = [ "第一道" , "伊斯特除蚤.皮膚" , "舒活" , "澎毛" ] ;
  const bath_3_2 = [ "淡雅 ( 中大狗 )" , "玫瑰" , "貓咪" , "潤絲" ] ;
  
  // 烘乾
  const dry = [ "進烘箱" , "手吹" ] ;

  // 基礎
  const basic_1 = [ "指甲剪不流血為主" , "不剪" , "剪1/2掉" , "賽指" ] ;
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
  


  type A4_Common = {

    type     : "洗澡單" | "美容單" ;
    children : React.ReactNode 

  }



const A4_Print_Content_Common : React.FC< A4_Common > = ( { children , type } ) => {
    

  return <div className = "columns is-multiline has-text-centered" >

            <div className = "column is-4 border v-center" style = {h_35}> 
                <p className = "f_16 f_bold" > 狗狗公園 : { type === "洗澡單" ? "洗澡" : "美容" }紀錄表 </p>
            </div>

            <div className = "column is-4 border td_Left v-center" style = {h_35}> 
                <b className = "f_12" > 寵物編號： </b>
            </div>
            <div className = "column is-4 border td_Left v-center" style = {h_35}> 
                <b className = "f_12" > 櫃檯人員： </b>
            </div>

            <div className = "column is-2 border h-v-center" style = {h_35}> <b> 日 期 </b> </div>
            <div className = "column is-2 border h-v-center" style = {h_35}> <b> 品 種      </b> </div>
            <div className = "column is-2 border h-v-center" style = {h_35}> <b> 寵物名字  </b> </div>
            <div className = "column is-2 border h-v-center" style = {h_35}> <b> 主人電話  </b> </div>
            <div className = "column is-2 border td_Left v-center" style = {h_35}> <b> 到店 </b> </div>
            <div className = "column is-2 border h-v-center" style = {h_35}> <b> 住 . 接  </b> </div>

            <div className = "column is-2 border" style = {h_35}> </div>
            <div className = "column is-2 border" style = {h_35}> </div>
            <div className = "column is-2 border" style = {h_35}> </div>
            <div className = "column is-2 border" style = {h_35}> </div>
            <div className = "column is-2 border td_Left v-center" style = {h_35}> <b> 離店 </b> </div>
            <div className = "column is-2 border h-v-center" style = {h_35}> <b> 住 . 送 </b> </div>

            { /* 主人交代 */ }
            <div className = "column is-10 border td_Left" style = { h_50 } > 
                <div className = "relative" style = {{ top : "-10px" }}>
                    <p> <b> 主人交代 : </b> { cus_Notes?.map( ( x ) => check( x ) ) }  </p> 
                    <p> <b> 自備 : </b> { cus_Objects?.map( ( x ) => check( x ) ) }  </p> 
                    <p className = "has-text-right relative" style = {{ top:"10px" }} ></p>
                </div>
            </div>
            <div className = "column is-2 border td_Left " > 
                 <span className = "relative" style={{ top : "-7px" , left : "-7px" }} > 預計來接 : </span>
            </div>

            { /* 備註 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 } > 備 註  </div>
            <div className = "column is-6 border" style = { h_35 }>  </div>
            <div className = "column is-4 border td_Left v-center" style = { h_35 }> 
                <b> 通知情形 : </b> &nbsp; <span> { check( "已聯絡" ) } { check( "未接" ) } </span>
            </div>
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 } > 流 程 </div>
            <div className = "column is-7 border f_bold h-v-center" style = { h_35 } > 內 容 </div>
            <div className = "column is-1 border f_bold h-v-center" style = { h_35 } > 人 員 </div>
            <div className = "column is-1 border f_bold h-v-center" style = { h_35 } > 時 間 </div>
            <div className = "column is-1 border f_bold relative" style = { h_35 } >  
                <span className = "f_11 relative" style = {{ top : "-7px" }} > 
                    易~難 
                    </span>
            </div>

            { /* 主要差異：美容 / 洗澡  */ }
            { children }

            { /* 梳廢毛 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 }> 梳廢毛 </div>
            <div className = "column is-7 border td_Left v-center" style = { h_35 }> 
                { comb?.map( ( x ) => check( x ) ) } 
            </div>
            <div className = "column is-1 border v-center" style = { h_35 }> </div>
            <div className = "column is-1 border v-center" style = { h_35 }> </div>
            <div className = "column is-1 border v-center" style = { h_35 }> </div>

            { /* 洗澡：第一道 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 }> 洗澡：第一道 </div>
            <div className = "column is-7 border td_Left v-center" style = { h_35 }> 
                <p> { bath_1?.map( ( x ) => check( x ) ) } </p>
                <p className = "m_Top_5 relative" style = {{ top : "-3px" }} > { check( "自備：________" ) }  </p>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 洗澡：第二道 */ }
            <div className = "column is-2 border f_bold h-v-center" > 洗澡：第二道 </div>
            <div className = "column is-7 border td_Left" style = {{ lineHeight : "20px" , height : "80px" }}> 
                <div className = "relative" style = {{ top : "-5px" }}>
                <p> { bath_2_1?.map( ( x ) => check( x ) ) } </p>
                <p> { bath_2_2?.map( ( x ) => check( x ) ) } </p>
                <p className = "m_Top_5"> { check( "自備：________" ) }  </p>
                </div>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 浸泡 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 }> 浸 泡 </div>
            <div className = "column is-7 border td_Left v-center" style = { h_35 }> 
                (  滴食鹽水 )
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>


            { /* 洗澡：第三道 */ }
            <div className = "column is-2 border f_bold h-v-center" style = {{ lineHeight : "20px" , height : "80px" }}> 
                <p> 
                    洗澡：第三道 <br/>
                    <span className = "f_10" >  ( 必要時或重洗 )</span>
                </p>
            </div>
            <div className = "column is-7 border td_Left" style = {{ lineHeight : "20px" , height : "80px" }}> 
                <div className = "relative" style = {{ top : "-5px" }}>
                    <p> { bath_3_1?.map( ( x ) => check( x ) ) } </p>
                    <p> { bath_3_2?.map( ( x ) => check( x ) ) } </p>
                    <p className = "m_Top_5"> { check( "自備：________" ) }  </p>
                </div>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 浸泡 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 }> 浸 泡 </div>
            <div className = "column is-7 border td_Left v-center" style = { h_35 }> 
                (  滴食鹽水 )
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 烘乾 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 }> 烘 乾 </div>
            <div className = "column is-7 border td_Left v-center" style = { h_35 }> 
                { dry?.map( ( x ) => check( x ) ) }
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 基礎 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_60 }> 基 礎 </div>
            <div className = "column is-7 border td_Left" style = { h_60 }> 
                <div className = "relative"  style = {{ top : "-5px" }}>
                <p> { basic_1?.map( ( x ) => check( x ) ) } </p>
                <p> { basic_2?.map( ( x ) => check( x ) ) } </p>
                </div>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            { /* 小美容修剪 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 }> 小美容修剪 </div>
            <div className = "column is-7 border td_Left v-center" style = { h_35 } > 
                <span className = "relative" > 
                { basic_3?.map( ( x ) => check( x ) ) }  
                <span className = "relative" style = {{ left : "40px" }}> { basic_4?.map( ( x ) => check( x ) ) } </span> 
                </span>
            </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>
            <div className = "column is-1 border" > </div>

            
            { /* 等候情形 */ }
            <div className = "column is-2 border f_bold h-v-center"  style = { h_35 } > 等候情形 </div>
            <div className = "column is-7 border td_Left v-center" style = { h_35 } > 
                { wait?.map( ( x ) => check( x ) ) }
            </div>
            <div className = "column is-3 border td_Left v-center" style = { h_35 }> 
                檢查員簽名 
            </div>
            
            { /* 告知主人 */ }
            <div className = "column is-2 border f_bold h-v-center" > 
                <p> 
                    告知主人 <br/>
                    { check( "都正常" ) } 
                </p>
            </div>
            <div className = "column is-10 border td_Left" style = {{ lineHeight : "20px" }} > 
            
                <p> 
                    <b className = "m_Right_10"> 打結 </b> { info_1?.map( ( x ) => check( x ) ) } 
                    <span className = "relative" style = {{ left : "107px" }}> 
                    <b className = "m_Right_10 "> 廢毛 </b> { info_2?.map( ( x ) => check( x ) ) } 
                    </span>
                </p> 
                <p> 
                    <b> 眼 </b>  <span className = "relative" style = {{ left : "26px" }} > { info_4?.map( ( x ) => check( x ) ) } </span> 
                    <span className = "relative" style={{ left : "40px" }} > 
                    <b className = "m_Right_10"> 體外 </b> { info_7?.map( ( x ) => check( x ) ) } 
                    </span>
                </p> 
                <p> <b className = "m_Right_10"> 會兇 </b> { info_3?.map( ( x ) => check( x ) ) } </p> 
                <p> <b> 耳 </b>  <span className = "relative" style = {{ left : "26px" }} > { info_5?.map( ( x ) => check( x ) ) } </span> </p> 
                <p> <b className = "m_Right_10"> 皮膚 </b> { info_6?.map( ( x ) => check( x ) ) } </p> 
                <p> </p> 
                <p className = "m_Top_5" > { info_8?.map( ( x ) => check( x ) ) } </p> 

            </div>

            { /* 客戶意見 */ }
            <div className = "column is-2 border f_bold h-v-center" style = { h_35 }> 客戶意見 </div>
            <div className = "column is-4 border td_Left" style = { h_35 }> </div>
            <div className = "column is-2 border td_Left v-center" style = { h_35 }> 
                第幾次 : 
            </div>
            <div className = "column is-2 border td_Left v-center" style = { h_35 }> 
                金額 : 
            </div>
            <div className = "column is-2 border td_Left v-center" style = { h_35 }> 
                入電腦 :
            </div>

        </div>


} ;

export default A4_Print_Content_Common  