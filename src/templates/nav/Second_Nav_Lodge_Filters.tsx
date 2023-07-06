import { useState , useEffect } from 'react' ;
import moment from 'moment' ; 
import Date_Period from "components/lodge/components/Date_Period" ; 
import { useDispatch , useSelector } from 'react-redux';

import { set_Is_Filtered_By_Lodge_Date } from 'store/actions/action_Lodge' ;




// @ 住宿 _ 第二層 : 額外篩選條件 ( Ex. 住房期間 )
const Second_Nav_Lodge_Filters = () => {


    const dispatch = useDispatch() ;


    // 是否點選 _ 要篩選 : 住房期間
    const is_Filtered_By_Lodge_Date = useSelector( ( state : any ) => state.Lodge.is_Filtered_By_Lodge_Date ) ;

    // 點選 _ 住房期間
    const click_Show_Lodge_Period   = () => dispatch( set_Is_Filtered_By_Lodge_Date( !is_Filtered_By_Lodge_Date ) ) ;


    return  <div className="relative" style={{ top:"5px" }}> 

                <div className="m_Bottom_5" >

                    <b className = { `tag is-medium m_Bottom_5 pointer ${ is_Filtered_By_Lodge_Date ? 'is-primary' : '' }` } 
                        onClick  = { click_Show_Lodge_Period } > 
                        住房期間
                    </b>     

                </div>  

                { is_Filtered_By_Lodge_Date && <Date_Period />  }    

            </div>
  

} ;
  
export default Second_Nav_Lodge_Filters
         