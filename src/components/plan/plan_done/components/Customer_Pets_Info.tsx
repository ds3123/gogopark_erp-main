



// # 客戶：所有寵物
const Customer_Pets_Info : React.FC< { data : any[] } > = ( { data } ) => {

  
  if( data.length === 0 ) return null ;


  return <div className = "m_Top_10" >

            { data.map( ( x : any , y : number ) => <b key = { y } className = "tag is-medium m_Right_10 m_Bottom_10"> { x?.name } </b> ) }

         </div>

} ;

export default Customer_Pets_Info  