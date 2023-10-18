
import { FC } from 'react' ;


type Options = {

   current_Tag    : number ;
   set_Current_Tag : ( tagNo : number ) => void

}



// @ 列印聯選項
const Service_Tag_Options : FC< Options > = ( { current_Tag , set_Current_Tag } ) => {


    const on = { background : "rgba(120,120,150,.9)" , color : "white" }

    return <div className="columns is-variable is-1">

                <div className="column">
                <span className = { `tag is-large pointer` } style = { current_Tag === 1 ? on : {} } onClick = { () => set_Current_Tag( 1 ) } > 
                    第一聯
                </span>
                </div>

                <div className="column">
                <span className = { `tag is-large pointer` } style = { current_Tag === 2 ? on : {} } onClick = { () => set_Current_Tag( 2 ) } > 
                    第二聯
                </span>
                </div>

                <div className="column">
                <span className = { `tag is-large pointer` } style = { current_Tag === 3 ? on : {} } onClick = { () => set_Current_Tag( 3 ) } > 
                    第三聯
                </span>
                </div>

                <div className="column">
                <span className = { `tag is-large pointer` } style = { current_Tag === 4 ? on : {} } onClick = { () => set_Current_Tag( 4 ) } > 
                    第四聯
                </span>
                </div>

                <div className="column">
                <span className = { `tag is-large pointer` } style = { current_Tag === 5 ? on : {} } onClick = { () => set_Current_Tag( 5 ) } > 
                    第五聯
                </span>
                </div>

          </div>


} ;

export default Service_Tag_Options
       