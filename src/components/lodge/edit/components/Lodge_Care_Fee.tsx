/* eslint-disable react-hooks/exhaustive-deps */

import { FC , useState , useEffect } from 'react' ;
import { useDispatch } from 'react-redux';
import { set_Lodge_Care_Amount } from "store/actions/action_Extra_Service_Fee"



type Care = {

  register : any ;  
  setValue : any ;

}


// @ 住宿 _ 安親費用 ( 早於 15 : 00 Check In )
const Lodge_Care_Fee : FC< Care > = ( { register , setValue } ) => {


   const dispatch = useDispatch() ;

   const [ is_On , set_Is_On ] = useState< boolean >( false ) ;


   // 點選 _ 顯示輸入安親金額
   const click_Is_On = () => set_Is_On( !is_On )


   // 清空 _ 輸入框
   useEffect( () => {
      
      if( !is_On ) setValue( "lodge_Early_CheckIn" , "" ) ;

   } , [ is_On ] ) ;


   return <div className = "column is-4-desktop relative" >

                <b className = { `tag is-medium is-primary ${ is_On ? '' : 'is-light' } is-rounded relative p_20 pointer` } style = {{ top : "20px" }} onClick = { () => click_Is_On() } > <i className = 'fas fa-baby-carriage'></i> 
                
                   <span className = "m_Left_10 m_Right_10" > 安親 </span>

                   { is_On && 
                     <>

                        <div className = "control has-icons-left m_Left_10 relative" style = {{ width:"120px" }} >
                           <input className = "input" type = "number" { ...register( "lodge_Care_Fee" ) } min = "0" style = {{ height : "35px" }} onClick = { e => e.stopPropagation() } onChange = { e => dispatch( set_Lodge_Care_Amount( e.target.value )  ) } />
                           <span className = "icon is-small is-left absolute" style = {{ left : "-5px" , top: "-2px" }}> <i className="fas fa-dollar-sign"></i> </span>
                        </div>

                        &nbsp;&nbsp;元&nbsp;

                     </>
                   }

               </b>

             </div>
         
          

} ;

export default Lodge_Care_Fee
       