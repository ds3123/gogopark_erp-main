/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch , useSelector } from "react-redux";
import { set_Self_Adjust_Amount , set_Service_Pickup_Fee } from 'store/actions/action_Plan' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useEffect_Set_Plan_Bath_Beauty_Num ,
         useEffect_Set_Plan_Basic_Price ,
         useEffect_Set_Plan_Receivable_Amount
        } from "../../hooks/useEffect_Plan_Type_Columns" ;



type pType = {
    register  : any ;
    errors    : any ; 
}



// @ 方案的欄位
const Plan_Type_Columns = ( { register , errors  } : pType ) => {


    const dispatch = useDispatch() ;

    // 目前登入者，所屬店家 id
    const shop_Id             = useAccount_Shop_Id() ;
    
    // 目前所選擇寵物資料
    const current_Plan_Name   = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;  // 目前所選擇 : 方案類型( 名稱 )
   
    
    // ----------------


    // 所選擇方案 : 基本價格 ( 未加上自訂金額、接送費 )
    const current_Baisc_Price = useEffect_Set_Plan_Basic_Price( shop_Id , current_Plan_Name ) ;  

    // 方案可洗澡次數、美容次數
    const service_Num         = useEffect_Set_Plan_Bath_Beauty_Num( shop_Id , current_Plan_Name ) ;


    // ----------------


    // 取得 _ 自訂增減金額 ( for 包月洗澡、包月美容 )
    const get_Self_Adjust_Amount = ( price : number ) => dispatch( set_Self_Adjust_Amount( price ? price : 0 ) ) ;
    
    // 取得 _ 接送費 ( for 包月洗澡、包月美容 )
    const get_Pickup_Fee         = ( price : number ) => dispatch( set_Service_Pickup_Fee( price ? price : 0 ) ) ;
    

    // ----------------
    
    // 共計金額
    const total_Amount = useEffect_Set_Plan_Receivable_Amount( shop_Id , current_Plan_Name ) ;

    return  <>

                { /* 基本價格 */ }
                <div className="column is-2-desktop ">

                    <span className="tag is-white is-large relative m_Top_20" >

                        <span className='f_11 absolute' style={{ top:"-15px" , left:"15px" }}> 
                           *     
                           { service_Num['bath'] > 0 && <span className="m_Right_10"> { service_Num['bath'] } 次洗澡  </span> } 
                           { service_Num['beauty'] > 0 && <span>  { service_Num['beauty'] } 次美容  </span> } 
                        </span>

                        <b>基本價格</b> &nbsp;  :  &nbsp; <b className="fRed f_12"> { current_Baisc_Price } 元 </b> 

                    </span>

                </div>

                { /* 方案適用 */ }
                <div className="column is-4-desktop required" style={{ left : "40px" , width:"300px" }}>

                    <div className="relative" >

                        <p> <b> 方案適用 : <span className="fDblue"> 寵物編號 </span> </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Apply_Pet?.message } </b> </p>
                        <div className="control has-icons-left" >
                            <span className="icon is-small is-left"> <i className="fas fa-calculator"></i> </span>
                            <input className='input is-danger'  type='text' {...register("plan_Apply_Pet")}  />
                        </div>

                    </div>

                </div>

                { /* 自訂 : 加 / 減 金額 */ }
                <div className="column is-2-desktop">

                    {/* <p> <b> 自訂 : 加 / 減 金額 </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Adjust_Amount?.message } </b> </p>
                    <div className="control has-icons-left" >
                        <span className="icon is-small is-left"> <i className="fas fa-calculator"></i> </span>
                        <input className='input' type='number' { ...register("plan_Adjust_Amount") }   onChange = { e => get_Self_Adjust_Amount( parseInt( e.target.value ) )} />
                    </div> */}

                </div>

                <div className="column is-1-desktop "> 
                
                   {/* <span className="relative" style={{top:"30px",left:"-10px"}}> 元 </span>  */}
                   
                </div>

                { /* 接送費 */ }
                <div className="column is-2-desktop ">

                    {/* <p> <b> 接送費 </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Pickup_Fee?.message } </b> </p>
                    <div className="control has-icons-left" >
                        <span className="icon is-small is-left"> <i className="fas fa-truck-pickup"></i> </span>
                        <input className='input' type='number' { ...register("plan_Pickup_Fee") }  min='0' onChange = { e => get_Pickup_Fee( parseInt( e.target.value ) ) } />
                    </div> */}

                </div>

                <div className="column is-1-desktop "> 
                
                     {/* <span className="relative" style={{top:"30px",left:"-10px"}}> 元 </span>  */}
                     
                </div>

                { /* 包月洗澡 _ 共計 */ }
                {/* 
                
                    <div className = "column is-2-desktop" >

                        <span className = "tag is-large relative" style={{ top:"20px" }} >
                            <b> 共 計 </b> &nbsp; : &nbsp;
                            <b className = "tag is-white is-rounded fRed f_12" >
                                { total_Amount } 元
                            </b>
                        </span>

                    </div>
                
                */}

            </> 


} ;


export default Plan_Type_Columns
       