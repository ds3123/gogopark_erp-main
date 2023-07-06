
import { useEffect } from "react" ;
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "store/actions/action_Test";


// @ 測試 :「 Redux 」

const Home = () => {

   const dispatch = useDispatch();


   const user = JSON.stringify(  useSelector( ( state:any ) => state.Home.user ) )  ;

    
   useEffect( () => {

     dispatch( fetchUser() ) ; // 從 API 取得資料，完成後會更新 store 中的 user，顯示在以下的頁面中

   } , [] )


    return <div>
                   { user }
            </div>


}

export default Home
       