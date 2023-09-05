/* eslint-disable react-hooks/exhaustive-deps */


import { FC , useState , useEffect } from 'react' ;



  type Custom = {
                  register : any ;  
                  setValue : any ;
                } ;


  type Item = {
                 title  : string ,
                 amount : string
              } ;


// 追加 _ 自訂費用
const Lodge_Custom_Fee : FC< Custom > = ( { register , setValue } ) => {


    // 是否顯示
    const [ is_On , set_Is_On ] = useState< boolean >( false ) ;

    // 項目內容
    const [ item , set_Item ] = useState< Item >({ 
                                                   title  : "" ,
                                                   amount : ""
                                                 }) ;
    // 所有項目
    const [ itemArr , set_ItemArr ] = useState< Item[] >( [] ) ; 


    // 點選 _ 顯示輸入安親金額
    const click_Is_On    = () => set_Is_On( !is_On ) ; 

    // 修改 _ 項目
    const change_Title  = ( value : any ) => set_Item({ ...item , title : value }) ;


    // 修改 _ 金額
    const change_Amount = ( value : any ) => set_Item({ ...item , amount : value }) ;


    // 點選 _ 新增
    const click_AddItem = ( item : Item ) => {

        if( !item.title ){
            alert('請填寫 _ 費用名稱') ;
            return false
        }

        if( !item.amount ){
            alert('請填寫 _ 費用金額') ;
            return false
        }

        set_Item( { ...item , title  : "" , amount : "" }) ;
        set_ItemArr( [ ...itemArr , item ] ) ;
    
    } ;


    // 點選 _ 刪除
    const click_DeleteItem = ( item : Item ) => {

        const filterArr = itemArr.filter( x => x.title !== item.title && x.amount !== item.amount ) ;
        
        set_ItemArr( filterArr ) ;

    }



    return <div className = "columns is-multiline is-mobile m_Bottom_50" >

                <div className = "column is-2-desktop relative" >

                    <b className = { `tag is-medium is-success ${ is_On ? '' : 'is-light' } is-rounded relative p_20 pointer` } style = {{ top : "20px" }} onClick = { () => click_Is_On() } > <i className = 'fas fa-list'></i> 
                    
                        <span className = "m_Left_10 m_Right_10" > 自訂費用 </span>

                    </b>

                </div>

                <>

                    <div className = "column is-4-desktop relative" >

                        <p> 費用名稱 </p>
                        <div className="control has-icons-left" >
                            <span className="icon is-small is-left"> <i className="fas fa-eye-dropper"></i> </span>
                            <input type = "text" className = "input" value = { item.title } onChange = { e => change_Title( e.target.value ) }  />
                        </div>

                    </div>

                    <div className = "column is-2-desktop relative" >

                        <p> 費用金額 </p>
                        <div className="control has-icons-left" >
                            <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                            <input type = "number" className = "input" value = { item.amount }  onChange = { e => change_Amount( e.target.value ) } />
                        </div>

                    </div>


                    <div className = "column is-2-desktop" >

                        <b className = "tag is-large hover relative" style = {{ top : "20px" }} onClick = { () => click_AddItem( item )  } > <span className="f_12"> 新增費用 </span> </b>

                    </div>
                
                </>

                { 

                  itemArr.map( ( item : Item , index : number ) => {

                    return <div key = { index } className = "column is-offset-2 is-10-desktop relative" >

                               <b className="delete relative m_Right_15" style = {{ top : "5px" }} onClick = { () => click_DeleteItem( item ) } ></b>
                               <b className="tag is-medium is-white fBlue"> { item.title  }    </b> _ 
                               <b className="tag is-medium is-white fDred"> { item.amount } 元 </b>

                           </div>

                  }) 

                }

            </div> 


} ;


export default Lodge_Custom_Fee
       