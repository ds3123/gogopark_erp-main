import { useState } from "react";

import { Input } from "templates/form/Input";
import { useForm } from "react-hook-form" 
import { IService } from "utils/Interface_Type" 




// @ 店家：點數
const Shop_Quota = () => {



  // 是否顯示 : 分配點數
  const [ is_Show_Allocate , set_Is_Show_Allocate ] = useState( false ) ;

  // 是否顯示 : 點數目前分佈情形
  const [ is_Show_Point_Stat , set_Is_Show_Point_Stat ] = useState( false ) ;



  // React Hook Form
  const { register  } = useForm< IService >({ mode : 'all' }) ; 


  // 點選 _ 顯示：分配點數
  const click_Show_Allocate = () => set_Is_Show_Allocate( !is_Show_Allocate ) ;

  // 點選 _ 顯示：分配點數
  const click_Show_Point_Stat = () => set_Is_Show_Point_Stat( !is_Show_Point_Stat ) ;


  // 變動 _ 點數數值
  const handle_Allocate_Change = () => {
 
 
  } ; 


 const box = { height:"45vh" , overflow:"auto" , padding:"20px"  } ; 


    
  return <>
                 
                 <span className="tag is-large m_Bottom_30 is-white">
                     <span className="fas fa-store "></span>&nbsp; 店家 ：  <b className="fDred"> 寵物公園 _ 北新店 </b> &nbsp; <span className="fGray f_11 relative" style={{ top:"2px" }}> ( 251-3 ) </span>
                 </span>

                    
                <div className="columns is-multiline  is-mobile m_Bottom_30">

                    { /* 星星 */ }
                    <div className="column is-offset-1 is-7-desktop relative">
                        
                        <b className="tag is-primary is-light is-medium is-rounded relative w-full" >

                            <span className="absolute" style={{ left:"40px" }}>

                                <span className="m_Right_30"> <i className="far fa-star"></i> &nbsp;星 星 </span>

                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-cog"></i>&nbsp;  預 設 : 1000 </b> 
                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-gift"></i>&nbsp; 新 增 : 500 </b> 
                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-list"></i>&nbsp; 分 配 : 200 </b> 
                                
                            </span>
                            
                        </b>  

                    </div>

                    <div className="column is-2-desktop relative">
                       <b className="tag is-primary f_11 is-rounded m_Right_30"> <i className="fas fa-calculator"></i>&nbsp; 小 計 : 1300 </b> 
                    </div>    


                    { /* 金幣 */ }
                    <div className="column is-offset-1 is-7-desktop relative">
 
                       <b className="tag is-link is-light is-medium is-rounded relative w-full" >
                  
                           <span className="absolute" style={{ left:"40px" }}>

                               <span className="m_Right_30"> <i className="fab fa-bitcoin f_14"></i>&nbsp; 金 幣 </span>
                                
                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-cog"></i>&nbsp;  預 設 : 1000 </b> 
                                <b className="tag is-white f_11 is-rounded m_Right_30"> <i className="fas fa-dollar-sign"></i> &nbsp; 購 買 : 0    </b> 
                                <b className="tag is-white f_11 is-rounded m_Right_50"> 
                                    <i className="fas fa-user"></i> &nbsp; 成 員 : 400 &nbsp; 
                                    <b className= { `tag is-rounded pointer ${ is_Show_Allocate ? 'is-warning' : 'is-gray' }` }  onClick = { () => click_Show_Allocate() }> 分 配 </b>  
                                </b> 
                               
                           </span>
                            
                       </b>  

                    </div>

                    <div className="column is-2-desktop relative">

                       <b className="tag is-link f_11 is-rounded m_Right_20"> 
                           <i className="fas fa-calculator"></i>&nbsp;  小 計 : 600 &nbsp;
                           <b className={ `tag pointer is-rounded ${ is_Show_Point_Stat ? 'is-warning' : 'is-gary'  }` }  onClick = { () => click_Show_Point_Stat() }> 檢 視 </b>
                       </b> 

                    </div>    

                </div>

                { /* 分配金幣 */ }

                { is_Show_Allocate &&

                    <div className="columns is-multiline  is-mobile m_Bottom_20">

                        <div className="column is-offset-1 is-3-desktop relative required"> 

                            <p> 成員姓名 ( 職稱 ) </p> 
                            <div className="select">
                                <select   >
                                    <option value="請選擇"> 請選擇 </option>
                                    <option value=""> 陳ＸＸ( 櫃檯行政 ) </option>
                                    <option value=""> 李ＸＸ( 美容師 ) </option>
                                    <option value=""> 黃ＸＸ( 接送員 ) </option>
                                    
                                </select>
                            </div>
                        
                        </div>
                        
                        <Input type="number" name="allocate_points" label="預設金幣" register={register} icon="fas fa-id-card-alt" asterisk={true} columns="2" onChange={ handle_Allocate_Change } />
                           
                        <div className="column is-3-desktop relative"> 
                        
                           <b className="tag is-medium is-success absolute pointer" style={{ top:"37px" , left:"40px" }}> <i className="fas fa-list"></i>&nbsp; 分配 _ 金幣 </b>
            
                        </div>
                                            
                    </div>

                }    

                { /* 金幣分佈 */ }

                { is_Show_Point_Stat &&

                    <div className="w-full" style={ box }>

                        <table className="table is-fullwidth is-hoverable">

                            <thead>
                                <tr>
                                    <th>  成員編號 </th>
                                    <th>  成員姓名 <span className="f_11 fGray"> ( 職稱 ) </span>   </th>
                                
                                    <th>  預設金幣 </th>
                                    <th>  使用金幣 </th>
                                   
                                    <th>  金幣小計 </th>
                                
                                </tr>
                            </thead>

                            <tbody>

                                <tr> <td> 251-3-1 </td><td className="td_Left"> 陳 X X  <span className="f_10 fGray"> ( 櫃檯行政 ) </span> </td> <td> 200 </td> <td> 0 </td>  <td> 200 </td> </tr>
                                <tr> <td> 251-3-2 </td><td className="td_Left"> 李 X X  <span className="f_10 fGray"> ( 美容師 ) </span> </td> <td> 200 </td>  <td> 150 </td> <td> 50 </td> </tr>
                                <tr> <td> 251-3-3 </td><td className="td_Left"> 黃 X X  <span className="f_10 fGray"> ( 接送員 ) &nbsp; <b className="fRed f_8"> 新員工 </b> </span> </td> <td> 0 </td>  <td> 0 </td> <td> 0 </td> </tr>
                            
                            
                            </tbody>

                        </table>

                        <br/>

                    </div> 

                }
               
   

         </>

} ;


export default Shop_Quota
       