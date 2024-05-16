/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Pet_Plans from "components/pets/components/Pet_Plans";


// # 寵物資訊
const Pet_Info_Button : React.FC< { data : any } > = ( { data } ) => {


    const dispatch = useDispatch() ;


    // 寵物資料
    const pet = data?.pet ;


    // 點選寵物
    const click_Pet = ( pet_Data : any ) => 
          dispatch( set_Modal( true , <Pet_Plans pet_Data = { pet_Data } /> , { data : null , modal_Style : { width : "80%" , height : "70%" , left : "10%" , bottom : "0px" } } )) ;

    

  return <div>


              <b className = "f_14 tag hover pointer"  
                 onClick   = { () => click_Pet( pet ) } > 

                 <p> { pet?.name }  <span className = "f_11"> ( { pet?.species } ) </span> </p> 

              </b> 
              
              <p className = "m_Top_10 m_Left_10"> { pet?.serial } </p>  

             
         </div>
} ;

export default Pet_Info_Button  