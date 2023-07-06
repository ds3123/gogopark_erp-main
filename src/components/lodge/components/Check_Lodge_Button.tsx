import { useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Lodge_Calendar from "components/lodge/edit/Lodge_Calendar" ;



// @ 按鈕 : 點選 _ 檢視住宿情形
const Check_Lodge_Button = () => {


   const dispatch = useDispatch() ;


   // 點選 _ 檢視住宿情形
   const click_Check_Lodge_Calendar = () => {

      dispatch( set_Modal( true , <Lodge_Calendar /> , { data : null , modal_Style : { height:"150vh" ,width : "80%" , left : "10%"   , bottom : "0px"  } } )) ;

   } ;



   return <>

               <b className = "tag is-medium is-link is-light pointer" 
                  onClick   = { click_Check_Lodge_Calendar }> 
                  <i className="far fa-calendar-alt"></i> &nbsp; 檢視住宿 
               </b> 
   
   
          </>

} ;

export default Check_Lodge_Button
       