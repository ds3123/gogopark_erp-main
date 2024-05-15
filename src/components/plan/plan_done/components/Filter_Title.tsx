

// # 標題列
const Filter_Title : React.FC< { data : any[] } > = ( { data } ) => {

  return <b className = "tag is-large is-rounded f_18 relative" > 
                        
            <i className = "fas fa-file-alt"></i> &nbsp; 方案 ( 已用完 ) &nbsp; 

            <span className = "tag is-rounded is-white f_14" > 
                筆數 : &nbsp; <span className = "fDblue" > { data?.length  } </span>  
            </span>
           
        </b> 

             
} ;

export default Filter_Title