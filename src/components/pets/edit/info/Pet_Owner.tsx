import { useDispatch } from "react-redux" ;
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Update_Pet_Owner from "components/customers/change/Update_Pet_Owner" ;

import { useFetch_Pet_Owner } from "hooks/react-query/pet/useFetchPets"



type Owner = {

  pet_Serial : undefined | string ;   // 寵物序號

}



// @ 寵物主人 ( 修改、分配 )
const Pet_Owner = ( { pet_Serial } : Owner ) => {


   const dispatch = useDispatch() ;   


   // 取得 _ 該寵物序號的主人資料
   const pet_Owner = useFetch_Pet_Owner( pet_Serial );



   // 點選 _ 寵物的主人
   const click_Check_Used_Records = ( cus_Data : any ) => {
       dispatch( set_Modal( true , <Update_Pet_Owner /> , { data : cus_Data , modal_Style : { width : "84%" , height:"92vh" , left : "8%" , bottom : "0px" } } ) ) ;
   } ;  






   return  <b className="tag is-medium is-rounded hover relative" onClick={ () => click_Check_Used_Records( pet_Owner ) }  style={{ top:"-3px" }}> 
 
                <i className="fas fa-user f_12" ></i> &nbsp; 主人 :&nbsp;

                <b className="fDred"> 

                    { 
                        pet_Owner?.customer ? 
                            <b> { pet_Owner.customer.name } ( { pet_Owner?.customer?.mobile_phone } ) </b> : 
                            <b className="fRed"> 尚未指定主人 </b>
                    }

                </b> 

            </b>  

} ;

export default Pet_Owner
       