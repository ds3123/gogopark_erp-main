





const Nav_Filter = () => {


   
 
   const way = {  fontSize : "11pt" , top : "-3px" , fontWeight : "bold"   } as const ; 

   return  <div className="columns is-multiline is-mobile m_Bottom_70">

                <div className="column is-2-desktop"> 

                        <div className="select is-small" >

                                <select  style = { way }  >

                                    <option  value="所有縣市" > 所有縣市 </option>
                                    <option  value="新北市" > 新北市 </option>
                                    <option  value="台北市" > 台北市 </option>
                                    
                                </select>

                        </div>
                
                </div>

                <div className="column is-2-desktop"> 

                        <div className="select is-small" >

                                <select  style = { way }  >

                                    <option  value="所有行政區" > 所有行政區 </option>
                                    <option  value="淡水區" > 淡水區 </option>
                                    
                                </select>

                        </div>
                
                </div>

                <div className="column is-2-desktop"> 

                        <div className="select is-small" >

                                <select  style = { way }  >

                                    <option  value="所有品牌" > 所有品牌 </option>
                                    <option  value="狗狗公園" > 狗狗公園 </option>
                                
                                    
                                </select>

                        </div>
                
                </div>

           </div>

} ;

export default Nav_Filter
       