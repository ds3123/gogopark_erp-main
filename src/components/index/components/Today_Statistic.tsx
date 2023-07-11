/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import Service_Error from "components/index/list/Service_Error" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { useDispatch } from 'react-redux';
import { 
         get_Completed_BasicBathBeauty_Sum , 
         get_Completed_BasicBathBeauty_Persentage ,
         get_ServiceOrder_CompletedNum_Basic ,
         get_ServiceOrder_CompletedNum_Bath ,
         get_ServiceOrder_CompletedNum_Beauty ,
         get_ServiceOrder_AppointmentNum_Total ,
         get_ServiceOrder_OnSiteNum_Total ,
        } from "fp/services/read/get_Statistic" ;
import { useEffect_Error_Sum } from "hooks/data/useError" ;


type Statistic = {

  data : any 

}       


// # 今日統計
export const Today_Statistic : FC< Statistic > = ( { data } ) => {



    // 顯示 _ 服務異常
    const dispatch = useDispatch() ;
    const click_Service_Error = () => dispatch( set_Side_Panel( true , <Service_Error /> , {} ) ) ;


    return   <div className="tags has-addons" >

                <b className= "tag is-large is-link" >
                
                    <i className="fas fa-calculator"></i> &nbsp; 
                    
                    今日統計 &nbsp;
                    
                    <b className="tag is-white relative f_12" style={{ borderRadius:"30px", top:"4px" }}>  
                       預約 : { get_ServiceOrder_AppointmentNum_Total( data ) } &nbsp;  
                       現場 : { get_ServiceOrder_OnSiteNum_Total( data ) }  
                    </b>
                
                </b>

                <span className="tag is-large is-light">

                    <i className="fas fa-list-alt"></i> &nbsp; 基礎&nbsp;<b>完</b> &nbsp; :&nbsp;
                    <b className='fDred m_Right_25'> { get_ServiceOrder_CompletedNum_Basic( data ) } </b> 

                    <i className="fas fa-bath"></i> &nbsp; 洗澡&nbsp;<b>完</b> &nbsp; :&nbsp;
                    <b className='fDred m_Right_25'> { get_ServiceOrder_CompletedNum_Bath( data ) } </b>

                    <i className="fas fa-cut"></i> &nbsp; 美容&nbsp;<b>完</b> &nbsp;: &nbsp;
                    <b className='fDred m_Right_25'> { get_ServiceOrder_CompletedNum_Beauty( data ) }  </b> 

                    <b className="tag is-white f_13 relative" style={{ borderRadius : "20px" , top:"4px" }}> 
                        <i className="fas fa-tasks"></i> &nbsp;  
                        完成率 : &nbsp; <span className="fRed"> { get_Completed_BasicBathBeauty_Persentage( data ) } % </span> &nbsp; 
                        <span className="f_10"> ( { get_Completed_BasicBathBeauty_Sum( data ) } / { data.length } ) </span>  
                    </b> 

                </span>

                <span className="tag is-large is-light is-danger pointer" onClick={ click_Service_Error } >
                    <i className="fas fa-exclamation"></i> &nbsp; 服務異常 : &nbsp;
                    <b>  { useEffect_Error_Sum() } </b>
                </span>

            </div>


} ;