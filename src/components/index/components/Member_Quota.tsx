
import Date_Picker from "templates/form/Date_Picker"
import { useForm } from "react-hook-form" 
import { IService } from "utils/Interface_Type" 


// @ 成員：點數、使用紀錄
const Member_Quota = () => {

   // React Hook Form
   const { control } = useForm< IService >({ mode : 'all' }) ; 

   const box = { height:"55vh" , overflow:"auto" , padding:"20px"  } ; 

   return <>

                <span className="tag is-large m_Bottom_20 is-white">
                   <span className="fas fa-user"></span>&nbsp; 成員 ： <b className="fDred"> 李 X X </b> &nbsp; <span className="fGray f_11 relative" style={{ top:"2px" }}> ( 櫃檯行政 ) </span>
                </span>
                    
                { /* 點數列 */ }    
                <div className="columns is-multiline  is-mobile m_Bottom_30">

                    { /* 星星 */ }
                    <div className="column is-offset-1 is-7-desktop relative">
                        
                        <b className="tag is-primary is-light is-medium is-rounded relative w-full">

                            <span className="absolute" style={{ left:"40px" }}>

                                <span className="m_Right_30"> <i className="far fa-star"></i> &nbsp;星 星 </span>

                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-cog"></i>&nbsp;  預 設 : 200 </b> 
                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-plus-circle"></i>&nbsp; 新 增 : 6 </b> 
                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-minus-circle"></i>&nbsp; 扣 除 : 1 </b> 
                                
                            </span>
                            
                        </b>  

                    </div>

                    <div className="column is-2-desktop relative">
                       <b className="tag is-primary f_11 is-rounded m_Right_30"> <i className="fas fa-calculator"></i>&nbsp; 小 計 : 205 </b> 
                    </div>   



                    { /* 金幣 */ }
                    <div className="column is-offset-1 is-7-desktop relative">
 
                       <b className="tag is-link is-light is-medium is-rounded relative w-full" >
                  
                           <span className="absolute" style={{ left:"40px" }}>

                               <span className="m_Right_30"> <i className="fab fa-bitcoin f_14"></i>&nbsp; 金 幣 </span>
                                
                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-cog"></i>&nbsp;  預 設 : 200 </b> 

                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-minus-circle"></i>&nbsp; 使 用 : 100 </b> 
                               
                           </span>



                            
                       </b>  

                    </div>

                    <div className="column is-2-desktop relative">

                       <b className="tag is-link f_11 is-rounded m_Right_20"> 
                           <i className="fas fa-calculator"></i>&nbsp;  小 計 : 100 &nbsp;
                       </b> 

                    </div>      


                    



                </div>

                { /* 成員使用紀錄  */ }   
                <div className = "w-full" style={ box }>

                    <div className="columns is-multiline  is-mobile m_Bottom_30">

                        <div className="column is-offset-9 is-3-desktop relative"> 
                            
                            <Date_Picker control={ control } name="service_Date" default_Date={ new Date() } />

                        </div>

                    </div> 

                    <table className="table is-fullwidth is-hoverable">

                        <thead>
                            <tr>
                                <th> 序 號   </th>
                                <th> 操作類別 </th>
                                <th> 服務類別 </th>
                                <th> Ｑ碼     </th>
                                <th> 新增星星 <span className="fGray f_11"> ( 6 ) </span>  </th>
                                <th> 扣除星星 <span className="fGray f_11"> ( 1 ) </span>   </th>
                                <th> 星星小計 </th>
                                
                                <th> 操作時間 </th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr><td>1</td><td>新增</td><td>基礎</td><td>Q01</td><td>3</td><td>0</td><td>203</td><td> 09:25</td></tr>
                            <tr><td>2</td><td>新增</td><td>洗澡</td><td>Q02</td><td>3</td><td>0</td><td>206</td><td> 09:25</td></tr>
                            <tr><td>3</td><td>新增</td><td>美容</td><td>Q03</td><td>0</td><td className="relative"> 1  <span className="absolute f_9 fRed" > &nbsp; 未填寫完整 </span> </td><td>205</td><td> 09:25</td></tr>

                        </tbody>

                    </table>

                    <br/>

                </div>

          </> 

} ;

export default Member_Quota
       