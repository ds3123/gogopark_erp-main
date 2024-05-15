



// # 客戶資訊
const Customer_Info_Button : React.FC< { data : any } > = ( { data } ) => {


    const cus = data?.customer ;


  return <>

            <b className = "f_14" > 

              <p> { cus?.name }  <span className = "f_12"> ( { cus?.mobile_phone } ) </span> </p> 
            
            </b>  { cus?.id } 

         </>
} ;

export default Customer_Info_Button