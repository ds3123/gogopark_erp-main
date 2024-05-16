import { useDispatch } from "react-redux" ;
import { set_Modal } from "store/actions/action_Global_Layout" ;




// # 客戶：其他寵物
const Customer_Other_Pets : React.FC< { data : any[] , current_Pet : any } > = ( { data , current_Pet } ) => {


    const dispatch = useDispatch() ;

    
    if( data.length === 0 ) return null ;



    // 點選方案
    const click_Plan = ( ) => 
            dispatch( set_Modal( true , <></> , { data : null , modal_Style : { width : "80%" , height : "70%" , left : "10%" , bottom : "0px" } } )) ;



  return <div className = "m_Top_10" >
          

            { data.length > 1 && 
            
                <>

                    <p className = "m_Bottom_5 fDblue">  其他寵物 : </p> 

                    {

                        data.map( ( x : any , y : number ) => {

                            if( x?.name === current_Pet?.name ) return null ;  // 略過目前寵物

                            return <b key       = { y } 
                                      onClick   = { click_Plan }
                                      className = "tag is-medium m_Right_10 m_Bottom_10 is-warning pointer"> 

                                      { x?.name }  <span className = "f_9 m_Left_5" > ( { x?.species } ) </span>

                                   </b> 

                        })  

                    }
            
                </>
                
            }

         </div>

} ;

export default Customer_Other_Pets  