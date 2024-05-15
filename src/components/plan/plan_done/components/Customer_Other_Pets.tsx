



// # 客戶：其他寵物
const Customer_Other_Pets : React.FC< { data : any[] , current_Pet : any } > = ( { data , current_Pet } ) => {

  
  if( data.length === 0 ) return null ;


  return <div className = "m_Top_10" >
          

            { data.length > 1 && 
            
                <>

                    <p className = "m_Bottom_5 fDblue">  其他寵物 : </p> 

                    {

                        data.map( ( x : any , y : number ) => {

                            if( x?.name === current_Pet?.name ) return null ;  // 略過目前寵物

                            return <b key       = { y } 
                                      className = "tag is-medium m_Right_10 m_Bottom_10 is-warning"> 

                                        { x?.name }  <span className = "f_9 m_Left_5" > ( { x?.species } )</span>

                                   </b> 

                        })  

                    }
            
                </>
                
            }

         </div>

} ;

export default Customer_Other_Pets  