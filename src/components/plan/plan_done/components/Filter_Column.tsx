import { FC } from 'react' ;



type Filter = {

    title  : string ;
    value  : string ;
    action : ( value : string ) => void ;
  
  }
  
  
  
// # 篩選欄位
const Filter_Column : FC< Filter > = ( { title , value , action } ) => {
  
     return <div className = "column is-2"> 
  
              <b className = "f_14" > { title } </b>
  
              <div className = "control has-icons-left" >
  
                  <span className="icon is-small is-left"> <i className="fas fa-expand"></i> </span>
  
                  <input className = "input"  
                         type      = "text"
                         value     = { value }
                         onChange  = { e => action( e.target.value ) } />
  
            </div>
     
  </div>
  
  
} ;

export default Filter_Column
       

