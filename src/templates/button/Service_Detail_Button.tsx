/* eslint-disable react/jsx-pascal-case */
import { FC } from 'react' ;
import useServiceType from "hooks/layout/useServiceType" ;
import { switch_Service_Id } from "utils/data/switch" ;
import { useDispatch } from 'react-redux';
import { set_Side_Panel , set_Side_Extra_Fee } from "store/actions/action_Global_Layout" ; 
import Update_Service from "components/services/edit/Update_Service" 


type Button = {

    data : any ;

}



// 點選檢視 _ 服務詳細內容
const Service_Detail_Button : FC< Button > = ( { data  } ) => {

   
   const dispatch = useDispatch() ;

    
   // 服務單欄位 _ 顏色、Icon
   const { color , icon } = useServiceType( data[ 'service_type' ] , false , 'medium' ) ; 

 
    // 點選 _ 服務單
    const click_Service    = ( data : any ) => {

      // 開啟 _ 左側 : 服務加價面板  
      dispatch( set_Side_Extra_Fee( true , data ) ) ;

      // 開啟 _ 右側 : 服務單面板  
      dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : data['service_type'] , preLoadData : data } as { service_Type : string } ) ) ;

    } 



  return  <b className = { color + " pointer" } onClick = { () => click_Service( data ) } >

            <i className = { icon } ></i> &nbsp; { data[ 'service_type' ] }       &nbsp;
            
            <b className = "f_9"> ( { switch_Service_Id( data ) } )            </b> &nbsp;
            <b className = "tag is-white is-rounded f_9" >  Q{ data['q_code'] } </b> 

          </b>

} ;

export default Service_Detail_Button  