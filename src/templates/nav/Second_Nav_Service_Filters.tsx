
import { useDispatch , useSelector } from "react-redux" ;

// React Hook Form
import { useForm } from "react-hook-form" ;
import { ICustomer } from "utils/Interface_Type" ;
import Date_Picker from "templates/form/Date_Picker" ;

import { set_Is_Filtered_By_Service_Date as set_Filtered_Service_Date } from "store/actions/action_Service" ;



// @ 洗美 _ 第二層 : 額外篩選條件 ( Ex. 來店日期 )
const Second_Nav_Service_Filters = ( ) => {


    const dispatch = useDispatch() ;

    
    // React Hook Form
    const { control } = useForm< ICustomer >({ mode : "all" }) ;

   
    // 是否點選 _ 要篩選 : 來店日期
    const is_Filtered_Service_Date = useSelector( ( state : any ) => state.Service.is_Filtered_By_Service_Date ) ;
     

    // 點選 _ 來店日期
    const click_Show_Service_Date = () => dispatch( set_Filtered_Service_Date( !is_Filtered_Service_Date ) ) ;
    


  return   <div className="relative" style={{top:"-3px"}}>
                    
                <b className = { `tag is-medium m_Left_15 m_Bottom_5 pointer ${ is_Filtered_Service_Date ? 'is-primary' : '' }` } 
                    onClick  = { click_Show_Service_Date } > 
                    來店日期 
                </b>   <br/>
                
                { is_Filtered_Service_Date &&

                    <div className="tag is-large is-white">
                        <Date_Picker control={ control } name="service_Date" default_Date={ new Date } />
                    </div>

                } 

           </div>

             
} ;

export default Second_Nav_Service_Filters
       