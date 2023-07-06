/* eslint-disable react/jsx-pascal-case */
import Admin_Data_Render from "templates/layout/Admin_Data_Render" ; 
import Check_Lodge_Button from "components/lodge/components/Check_Lodge_Button";



/* @ 住宿頁面 ( 住宿資料、安親資料 ) */
const Lodge = () => {


  
    return <>  

                {  /* 點選 _ 檢視住宿情形  */ }
                <b className="absolute" style={{ right:"-120px" , top:"30px" }}> <Check_Lodge_Button /> </b>
                    
                <Admin_Data_Render data_Type  = { "lodge" }  />
                  
           </>

};

export default Lodge ;
