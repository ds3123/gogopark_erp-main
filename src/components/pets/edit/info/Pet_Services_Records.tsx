/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import { useDispatch, useSelector } from "react-redux" ;
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Service_Records from "components/services/edit_components/Service_Records" ; 
import useServiceType from "hooks/layout/useServiceType" ;

import { useFetch_Services_By_PetSeial_ServiceType } from "hooks/react-query/service/useFetchServices" ;



const style = { top : "-60px", left:"170px" , display : "block" , width:"70%", height:"35px" } as any ;


// @ 顯示 _ 該 "寵物" 過去各種服務 ( 基礎、洗澡、美容 ) 紀錄 --> 顯示在 : 標題列右上方
const Pet_Services_Records = ( ) => {


    const dispatch = useDispatch() ;
       
    // 目前新增類型標籤
    const current_Tab  = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;


    // 目前所點選寵物資料
    const current_Pet        = useSelector( ( state : any ) => state.Pet.current_Pet ) ;
    const current_Pet_Name   = current_Pet ? current_Pet?.name   : '' ;  // 寵物名字
    const current_Pet_Serial = current_Pet ? current_Pet?.serial : '' ;  // 寵物序號


    // 目前點選寵物，在特定服務類型 ( 洗澡 / 美容 ) 下，其所有服務紀錄
    const pet_Type_Service_Records = useFetch_Services_By_PetSeial_ServiceType( current_Pet_Serial , current_Tab ) ; 
    

    // 服務單欄位 _ 顏色、Icon
    const { color , icon } = useServiceType( current_Tab , false , 'medium' ) ;

   
    // 點選 _ 顯示過去紀錄
    const click_Tab = ( ) => {

        dispatch( set_Modal( 
                              true ,
                              <Service_Records type = "寵物" /> ,
                              { 
                                modal_Style : { width : "90%" , left : "5%" } ,
                                current_Tab : current_Tab 
                              }
                           ) ) ;
 
    } ;
 

    

    return <>
    
               { ( current_Pet && ( current_Tab === "基礎" || current_Tab === "洗澡" || current_Tab === "美容" ) ) &&

                  <div className = "absolute" style = { style } onClick = { click_Tab } >

                     <b className = { color + " pointer" }  >

                           <i className = { icon } ></i> &nbsp; &nbsp;
                           <b className = "f_12 fDblue"> { current_Pet_Name } </b>        
                           <b className = "fDblue"></b> 
                           &nbsp; 過去 { current_Tab } 紀錄 ( 共 { pet_Type_Service_Records?.length } 筆 ) &nbsp;
            
                     </b>

                  </div>   

               }   

           </>

} ;



//export default React.memo( Pet_Services_Records , ( prevProps , nextProps ) => prevProps === nextProps ? true : false ) 
export default Pet_Services_Records 
       