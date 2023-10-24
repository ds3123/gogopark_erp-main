
import { FC , useState , useEffect } from 'react' ;



type Title = {

   tag_Color    : string ;
   service_Type : string ;
   amount_Type  : string ; 
   amount_Total : number | undefined ;

}


// # 各區塊標題列
const Title_Folder : FC< Title > = ( { children ,  tag_Color , service_Type , amount_Type , amount_Total } ) => {


    
  const [ is_folding , set_Is_Folding ] = useState< boolean >( false ) ;



  const is_Expenditure = amount_Type === '支 出' || amount_Type === '扣 _ 預收款' ;

    
  return  <div className = 'columns is-multiline is-mobile' >

                { /* 標題 */ }
                <div className = 'column is-9-desktop' >
                    
                    <b className={ 'tag is-large is-light ' + tag_Color }> { service_Type } :&nbsp;<span className="fBlue"> { amount_Type } </span>  </b>

                </div>

                { /* 小計 / 按鈕 */ }
                <div className = 'column is-3-desktop relative' >

                    { /* 小計 */ }
                    <b className = 'tag is-large is-white absolute' style = { is_Expenditure ? { left : "155px" , top : "10px" } : {}}> 
                         <span className = { is_Expenditure ? 'fBlue' : 'fRed' }  > { ( amount_Total || amount_Total === 0 ) ? amount_Total + ' 元' : '尚未完成' } </span>&nbsp;  
                    </b>
                        
                    { /* 按鈕 */ }
                    <b className = { `tag is-medium f_10 pointer ${ !is_folding ? 'is-white' : 'is-success is-light' } relative` }
                       style     = { { float:'right' } }
                       onClick   = { () => set_Is_Folding( !is_folding ) } >
                                    <i className="fas fa-bars"></i>
                    </b> 

                </div>

                { /* 區塊內容 */ }
                <div className = 'column is-12-desktop' >

                     { is_folding && children }
                    
                </div>

           </div> 

} ;

export default Title_Folder  