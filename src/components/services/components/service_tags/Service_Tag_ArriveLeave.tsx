
import { FC } from 'react' ;

type Way = {

    arrive : string ;
    leave  : string ;

}


// @ 到店、離店方式
const Service_Tag_ArriveLeave : FC< Way > = ( { arrive , leave } ) => {


    const _arrive = arrive === "接送員接來" ? <b className = "f_15 relative" style = {{ top : "-5px" }}>&nbsp;{ arrive } </b> : arrive ;
    const _leave  = leave  === "接送員接送" ? <b className = "f_15 relative" style = {{ top : "-5px" }}>&nbsp;{ leave } </b>  : leave ;

    return <>

              <div className = "t_Left m_Bottom_5 w-50 float_Left"> 到店 : { _arrive } </div>
              <div className = "t_Left m_Bottom_20 w-50"> 離店 : { _leave }  </div>
          
          </>


} ;

export default Service_Tag_ArriveLeave
       