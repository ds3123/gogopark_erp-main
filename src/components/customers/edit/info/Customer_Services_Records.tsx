/* eslint-disable react/jsx-pascal-case */

import { set_Modal } from "store/actions/action_Global_Layout" ;
import { useDispatch , useSelector } from "react-redux" ;
import Service_Records from "components/services/edit_components/Service_Records";
import useServiceType from "hooks/layout/useServiceType";
import { useFetch_Services_Type_By_Customer_Id } from "hooks/react-query/service/useFetchServices" ;


const style = { top : "-38px", left : "140px" , width : "70%", height : "35px" } ;



// @ 顯示 _ 客戶過去各種服務紀錄 ( 基礎、洗澡、美容 / 顯示在標題列右上方 )
const Customer_Services_Records = () => {

    const dispatch = useDispatch() ;

    
    // 目前所點選 _ 客戶身分證字號
    const Current_Customer_Id = useSelector( ( state : any ) => state.Customer.Current_Customer )?.id ;

    // 目前所點選 _ 新增類型標籤
    const current_Create_Tab  = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;

    // 取得 _ 目前點選客人，在特定服務 ( 基礎、洗澡、美容 ... )，所有服務記錄  
    const customer_Records    = useFetch_Services_Type_By_Customer_Id( current_Create_Tab , Current_Customer_Id ) ;

    // 服務單欄位 _ 顏色、Icon
    const { color , icon }    = useServiceType( current_Create_Tab , false , 'medium' ) ;


    // 點選 _ 顯示過去紀錄
    const click_Tab = () => {

       dispatch( 
                  set_Modal(  
                              true , 
                              <Service_Records type = "客戶" /> ,
                              { 
                                modal_Style : { width : "90%" , left : "5%" } , 
                                current_Tab : current_Create_Tab 
                              }
                           )
               ) ;

    } ;

    

    return <>
                {  
                   ( customer_Records.length > 0  && ( current_Create_Tab === '基礎' || current_Create_Tab === '洗澡' || current_Create_Tab === '美容' )  )  &&

                     <div className="absolute" style={ style } >
                        <b className={ color + "pointer" } onClick={ click_Tab } >
                           <i className = { icon } ></i> &nbsp; 過去所有 { current_Create_Tab } 紀錄 ( 共 { customer_Records.length } 筆 )
                        </b>
                     </div>
                }
           </>

} ;

export default Customer_Services_Records