

// @ 美容師 _ 處理過程、結果
const Beautician_Process = ( { data , register  } : { data : any , register : any } ) => {



  return  <>
 
             <hr/> 

             <>   
            
                <b className="tag is-large is-danger m_Top_30 m_Bottom_30"> <i className="fas fa-list-alt"></i> &nbsp; 美容師處理結果

                    { data['shop_status'] === '到店等候中' && <> &nbsp; &nbsp; <b className="tag is-medium is-rounded is-white"> 美容師 _ 尚未處理 </b></>  }
                    { data['shop_status'] === '到店美容中' && <> &nbsp; &nbsp; <b className="tag is-medium is-rounded is-white"> 美容師 _ 處理中 </b></>  }

                </b> 

                { /* 美容師後續處理 */ }
                {/* { ( data['shop_status'] === '洗完等候中' || data['shop_status'] === '已回家( 房 )' ) && */}

                    <div className="columns is-multiline is-mobile relative"  style={{ left : "20px" }}>

                        <div className="column is-12-desktop" >

                            <i className="fas fa-list-ul f_14"></i> &nbsp;<b className="tag is-medium is-white f_14"> 檢查 / 異常項目 : </b>
                            <b className="fDred f_14"> { data['beautician_report'] } </b>

                        </div>

                        <div className="column is-12-desktop" >

                            <i className="fas fa-door-open f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 等候方式 : </b>
                            <b className="fDred f_14"> { data['wait_way'] } </b>

                        </div>

                        <div className="column is-12-desktop" >

                            <i className="far fa-clock f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 開始等候時間 : </b>
                            <b className="fDred f_14"> { data['wait_time'] } </b>

                        </div>

                        <div className="column is-12-desktop" >

                            <i className="far fa-star f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 美容師評分 ( 寵物 ) : </b>
                            { data['beautician_star'] === '0' ?
                                <b className="f_14" style={{ color:'red'}}> 拒 接 </b> :
                                <b className="fDred f_14"> { data['beautician_star'] } </b>
                            }

                        </div>

                        

                        { /* 洗澡美容備註 */ } 
                        <div className="column is-12-desktop m_Bottm_20" >

                           <i className="fas fa-user f_14"></i> <b className="tag is-medium is-white f_14"> 洗澡美容備註  </b> 
                           
                            <div className="fBlue m_Left_40 m_Top_10 m_Bottom_50">

                                { data?.pet?.note }

                            </div>

                        </div>  

                        { /* 客訴及其他備註 ( 私有備註 ) */ } 
                        <div className="column is-12-desktop m_Bottm_20" >

                           <i className="fas fa-user f_14"></i> <b className="tag is-medium is-white f_14"> 客訴及其他備註 </b> ( 私有備註 )  
                           
                            <div className="fBlue m_Left_40 m_Top_10 m_Bottom_50">

                                { data?.pet?.private_note }

                            </div>

                        </div>  

                        <div className="column is-12-desktop" >

                            <i className="fas fa-pencil-alt f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 美容師備註 : </b>
                            
                            
                            {/* <b className="fDred f_14"> { data['beautician_note'] ? data['beautician_note'] : '無' } </b> */}

                            <textarea rows="8" cols="20" className="textarea relative" {...register("beautician_Note")} placeholder="備註事項"
                                                    style={{color: "rgb(0,0,180)", fontWeight: "bold" , left:"35px" }}/>


                        </div>
 
                    </div>

                {/* } */}

             </>

         </>   

} ;

export default Beautician_Process
       