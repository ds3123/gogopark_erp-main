
import { FC , useState , useEffect } from 'react' ;
import { Input } from "templates/form/Input" ;





type Early = {

  register : any ;  

}


// @ 安親費用 ( 早於 15 : 00 Check In )
const Lodge_Early_CheckIn : FC< Early > = ( { register } ) => {


   return <div className = "columns is-multiline is-mobile" >

             <div className = "column is-2-desktop relative" >

                <b className = "tag is-medium is-warning is-rounded relative" style = {{ top : "20px" }} > <i className = 'far fa-clock'></i> &nbsp; 提早 Check In </b>
                
             </div>

             { /* 名字 */ }
             <Input type = "number" name = "lodge_Early_CheckIn" label = "安親費用 ( 元 )" register = { register }
                    icon = "fas fa-dollar-sign" asterisk = { false } columns = "2" />

             
   
          </div> 

} ;

export default Lodge_Early_CheckIn
       