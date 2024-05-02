/* eslint-disable react/jsx-pascal-case */
import { useDispatch } from "react-redux";
import { Service_Tag } from '../Service_Tag';
import { set_Modal } from "store/actions/action_Global_Layout" ;
import { useReactToPrint } from 'react-to-print'
import { createRef } from "react"
import A4_Print_Content_Beauty from "./components/A4_Print_Content_Beauty";
import A4_Print_Content_Bath from "./components/A4_Print_Content_Bath";


type Tag = {
    data : any
    type : "洗澡單" | "美容單" ;
}



// # 服務單 : 洗澡單 / 美容單 ( Ａ4 尺寸 )
const Service_Tag_A4 : React.FC< Tag > = ( { data , type } ) => {


    const dispatch = useDispatch() ;
    const ref      = createRef() ;


    // 返回上一頁
    const back_To_ServiceTag = ( ) => {

       dispatch( set_Modal( true , <Service_Tag /> , { data : data , modal_Style : { width : "40%" , left : "30%" , top : "-70px" } }  ) )
    
    }

    // 點選 _ 列印 ( A4 尺寸 )
    const click_A4_Print = useReactToPrint({

        pageStyle : `@media print {
                                    @page {
                                            size   : 210mm 297mm ;
                                            margin : 10mm ;
                                           } 
                                  }` ,

        content   : () : any => ref.current ,
        
        // onAfterPrint : () => handleResetPrint()

    }) ;


  return <div className = "p-4" style = {{ overflow : "auto" , height : "85vh" , color : "black" }} >
     
            { /* 按鈕：返回、列印 */ }
            <div className = "relative" style = {{ width: "210mm" , margin : "auto" }} > 

                <b className = "tag is-large is-rounded hover m_Right_10" 
                    onClick = { back_To_ServiceTag } > 
                    <i className = "fas fa-backward"></i> &nbsp;
                    返回
                </b>

                <div onClick = { click_A4_Print }
                    className = "tag is-large is-success pointer absolute" style = {{ top : "0px" , right : "0px" }} > 
                    <i className = "fas fa-print m_Right_10 f_14" ></i>  列印 
                </div>

            </div>
            
            { /* A4 列印內容 */ }
            <div ref       = { ref as any }  
                 className = "border m_Top_20 p-4 m_Bottom_50" 
                 style     = { { width : "21cm" , margin : "auto" } } >

               { type === "洗澡單" && <A4_Print_Content_Bath   data = { data } /> } 
               { type === "美容單" && <A4_Print_Content_Beauty data = { data } /> } 

            </div>
             
         </div>

} ;

export default Service_Tag_A4  