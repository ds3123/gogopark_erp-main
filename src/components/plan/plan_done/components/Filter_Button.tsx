



// # 點選 _ 篩選鈕
const Filter_Button : React.FC< { filter : () => void } > = ( { filter } ) => {

  return <div className = "column is-12"> 

            <b onClick = { filter } className = "tag is-large is-success w-full pointer" > 
                <i className = "fas fa-filter"></i> &nbsp; 篩 選 _ 已 用 完 方 案 
            </b>
        
        </div>

} ;

export default Filter_Button  