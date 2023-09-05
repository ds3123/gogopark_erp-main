import { FC } from 'react' ;
import { get_Week_Day } from "utils/time/date" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useEffect_Edit_Redirect } from "../hooks/useEffect_Holidays_List"
import { delete_Holiday_SingleDate } from "utils/api/api_Lodge" ; 




 type Item = {

    date : string[]

 }



 

// @ 日期標籤
const Date_Tags : FC< Item > = ( { date } ) => {


    // 目前登入者所屬店家 id
    const shop_Id         = useAccount_Shop_Id() ;

    


    // 排序日期
    const sortedDates = date.sort(( a : any , b : any ) : any => {
                                    
                            const _a = new Date( a ) ; 
                            const _b = new Date( b ) ; 

                            return _a > _b ? 1 : -1  // 升冪
                        
                        }) ;   
  
    const redirect = useEffect_Edit_Redirect( "已刪除 : 指定日期" );


    // 點選 _ 刪除特定日期
    const click_Delete_Tag = async( shop_Id : string , date : string ) => {
    
        await delete_Holiday_SingleDate( shop_Id , date ) ;
        
        redirect() ;
    
    } ;


    return <>
    
              {  
                 
                 sortedDates.map( ( item : string , index : number ) => {
                            
                      return <b className = "tag is-medium m_Right_20 m_Bottom_20 relative" key = { index } >
                        
                                  { item } ( { get_Week_Day( item )  } ) 

                                  <b className = "delete m_Left_10 m_Right_5" style={{ background : "rgba(150,0,0,.7)" }} onClick = { () => { 

                                           if( window.confirm( `確認要刪除此日期?` ) )  click_Delete_Tag( shop_Id , item ) ;

                                     }} ></b>
                                
                              </b>

                  })

               }
    
           </>

       
  
} ;

export default Date_Tags
       