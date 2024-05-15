



// # 清除篩選鈕
const Clean_Button : React.FC< { clean : () => void } > = ( { clean } ) => {

  return  <b onClick = { clean } className = "button hover absolute" style = {{ right : "30px" }} >
             <i className = "fas fa-sync-alt"></i> 
          </b> 

} ;

export default Clean_Button  