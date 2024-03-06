/* eslint-disable react/jsx-pascal-case */
import { FC } from 'react' ;
import Status_Cards from "components/index/Status_Cards";


type Status = {

    data : any[] ;

}


// # 今日到店服務狀態
const Shop_Status : FC< Status > = ( { data } ) => {



  return <div className = "columns is-mobile is-multiline relative m_Top_150 m_Bottom_50" style = {{ width:"110%" , left:"-4%" }} >

                {/* 到店等候中 */}
                <div className = "column is-3-desktop" style = { { padding : "5px" } }>
                    <Status_Cards  pet_Arr = { data }  shop_Status = "到店等候中" />
                </div>

                {/* 到店美容中 */}
                <div className = "column is-3-desktop" style={ { padding : "5px" } }>
                    <Status_Cards  pet_Arr = { data }  shop_Status = "到店美容中" />
                </div>

                {/* 洗完等候中 */}
                <div className = "column is-3-desktop" style={ { padding : "5px" } }>
                    <Status_Cards  pet_Arr = { data } shop_Status = "洗完等候中" />
                </div>

                {/* 已回家 ( 房 ) */}
                <div className = "column is-3-desktop" style={ { padding : "5px" } }>
                    <Status_Cards  pet_Arr = { data } shop_Status = "已回家( 房 )" />
                </div>

          </div> 
} ;

export default Shop_Status  