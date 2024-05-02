/* eslint-disable react/jsx-pascal-case */
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import Update_Service from "components/services/edit/Update_Service" ;
import { switch_Service_Type_Id } from "utils/data/switch" ;
import { is_Service_Delete_Sign } from "templates/info/delete";


// # 紀錄列標題 
const Records_Row_Title = ( { data } : any ) => {


   const dispatch = useDispatch() ;


   // 取得 _ 服務( 基礎、洗澡、美容 ) 相對應服務資料表 id "
   const { service_Id } = switch_Service_Type_Id( data ) ; 

  
   
   // 點選 _ 檢視按鈕
    const click_View_Detail = ( data : any ) => {

        dispatch( set_Side_Panel( true , <Update_Service /> ,
                                    { source_Page : 'Pet_Consumption_Records' , service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string }
                                )) ;

    } ;


    
  return <b className = "tag is-medium relative p_20 is-rounded border relative" style = {{ top : "-60px" , left : "-17px" }}  >

            &nbsp; 到店日期 : &nbsp; 
            <span className = "fDred" > { data.service_date } </span> &nbsp;&nbsp; 
            <span className = "f_10" > ( Q{ data.q_code } /  id : { service_Id } ) </span> &nbsp;&nbsp; 

            付款方式： <span className = "fDred" >  { data.payment_method } </span> &nbsp;&nbsp;&nbsp;
            
            <span className = "tag is-medium border is-rounded pointer hover" 
                  onClick   = { () => click_View_Detail( data ) } > 
                <i className="fas fa-search"></i> 
            </span> 

            { /* 是否銷單 */ }
            { data?.is_delete === 1 && is_Service_Delete_Sign() }
            
        </b>

} ;

export default Records_Row_Title  