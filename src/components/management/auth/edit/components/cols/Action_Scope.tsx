
import { useState  } from 'react'



// @ 動作的作用範圍
const Action_Scope = () => {


    // 個別店家 : 權限範圍
    const [ auth_Shop_Range , set_Auth_Shop_Range ] = useState< string[] >( [ ] ) ; 


    // 作用範圍
    const click_Shop_Range = ( range_Type : string ) => {
    

        // 若已點選：跨店，再次點選 --> 取消所有選項  
        if( range_Type === '跨店' && auth_Shop_Range.includes( '跨店' ) ){

            set_Auth_Shop_Range( [] ) ;
            return false

        }  

        // 若點選已加入項目 -> 刪除
        if( auth_Shop_Range.indexOf( range_Type ) != -1 ){

           const arr = [ ...auth_Shop_Range ] ;  
           arr.splice( auth_Shop_Range.indexOf( range_Type ) , 1  ) // 刪除
           set_Auth_Shop_Range( arr )
           return false

        }

        set_Auth_Shop_Range( [ ...auth_Shop_Range , range_Type  ] )

    } ;



   
    const bt = 'tag is-large m_Right_20 pointer' ; 

   return <div className="relative" style={{ left : "20px" }}>

            <b className={ `${ bt } ${ auth_Shop_Range.includes( '跨店' ) ? 'is-primary' : 'hover' }` }    onClick = { () => click_Shop_Range( '跨店' ) } > 跨店    </b>
            
            { ( auth_Shop_Range.includes( '跨店' ) ) &&
                <b className={ `${ bt } ${ auth_Shop_Range.includes( '跨品牌' ) ? 'is-primary' : 'hover' }` }   onClick = { () => click_Shop_Range( '跨品牌' ) } > 跨品牌   </b>
            }
            
            
            { ( auth_Shop_Range.includes( '跨店' ) && auth_Shop_Range.includes( '跨品牌' ) ) &&
                <b className={ `${ bt } ${ auth_Shop_Range.includes( '跨行政區' ) ? 'is-primary' : 'hover' }` } onClick = { () => click_Shop_Range( '跨行政區' ) } > 跨行政區 </b>
            }

            
            { ( auth_Shop_Range.includes( '跨店' ) && auth_Shop_Range.includes( '跨品牌' ) && auth_Shop_Range.includes( '跨行政區' ) ) &&
                <b className={ `${ bt } ${ auth_Shop_Range.includes( '跨縣市' ) ? 'is-primary' : 'hover' }` }   onClick = { () => click_Shop_Range( '跨縣市' ) } > 跨縣市   </b>
            }  
                        
          </div> 

} ;

export default Action_Scope
       