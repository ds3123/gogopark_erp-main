import { FC } from 'react' ;


type Section = {

    icon     : string ;
    title    : string ;
    content  : string | JSX.Element ;

    options? : string ;

}


// @ 區塊資訊
const Service_Tag_Section : FC< Section > = ( { icon , title , content , options } ) => {

   
   return <>
   
            <div className = "t_Left" >  
                    <span className="tag is-large m_Right_10 is-white f_18 relative" style={{left:"-13px"}} > 
                       <i className = { icon } ></i> 
                    </span>   
                    <span className = "f_14 relative" style = {{ top:"13px" , left:"-35px" }} > { title } </span>    
            </div>

            <div className = "border p_10 m_Bottom_20"  style={{ textAlign : "left" }}>

                <div className = "f_14 m_Bottom_5"> { options?.replace( /,/g , " / " ) } </div> 
                
                { content } 

            </div>
   
         </>


} ;


export default Service_Tag_Section
       