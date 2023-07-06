/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux" ;
import Side_Info_Basic from "./components/Side_Info_Basic" ;
import Side_Info_Prices from "./components/Side_Info_Prices" ;
import Left_Side_Panel from "templates/panel/Left_Side_Panel" ;



// @ 左側固定位置 _ 服務提示資訊 ( Ex. 特定品種所有相關服務價格列表 )
const Side_Info = () => {


    // 是否開啟
    const Side_Info_Open     = useSelector(( state : any ) => state.Layout.Side_Info_Open ) ;

    // @【 新增 】目前點選 : 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )
    const current_Create_Tab = useSelector(( state : any ) => state.Service.current_Create_Tab ) ;      

    // 會顯示的新增類型
    const arrTab      = [ '基礎' , '洗澡' , '美容' , '方案' ] ;
    const is_Show_Tab = arrTab.includes( current_Create_Tab ) ;


  return <>

            {

              ( Side_Info_Open && is_Show_Tab ) &&

                  <Left_Side_Panel>

                      { /* 位置、客戶、寵物 */ }
                      <Side_Info_Basic />

                      <hr/>

                      { /* 服務基本價格  */ }
                      <Side_Info_Prices />

                  </Left_Side_Panel>

            }

       </>

} ;


export default Side_Info