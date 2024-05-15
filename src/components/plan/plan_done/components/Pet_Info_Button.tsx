

// # 寵物資訊
const Pet_Info_Button : React.FC< { data : any } > = ( { data } ) => {

    
    const pet = data?.pet ;

  return <>


              <b className = "f_14" > 
                 <p> { pet?.name }  <span className = "f_11"> ( { pet?.species } ) </span> </p> 
              </b> { pet?.serial }   
             
         </>
} ;

export default Pet_Info_Button  