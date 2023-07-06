
import { shallow , mount } from "enzyme";
import { findByTestAttr , storeFactory } from "./utils/tool";
import { Jotto_App } from "./Jotto_App";

import { get_SecreteWord } from "../actions/action_Index" ;

import { reducer_GuessWord } from "../reducers/reducer_GuessWord"
import { Provider } from "react-redux";
import { AxiosPromise } from "axios";



// 強制轉型
const mock_Get_SecreteWord = get_SecreteWord as jest.MockedFunction< typeof get_SecreteWord > ;



// 啟動 _ 全域模擬 ( global mock ) : get_SecreteWord ( 使其不會發出網路資料請求 ）
jest.mock( "../actions/action_Index" ) ;


const setup = () => {

   const reducers_Obj = { GuessWord : reducer_GuessWord }

   const store        = storeFactory( reducers_Obj  )   

   return mount( <Provider store = { store }> <Jotto_App /> </Provider>  ) ;

   
} 


test.skip( "畫面有元件：component-jotto-app ( 基本元件 )" , () => {

   const wrapper      = setup() ;
   const appComponent = findByTestAttr( wrapper , "component-jotto-app" ) ;

   expect( appComponent ).toHaveLength( 1 ) ;

}) ;

describe.skip( "get_SecreteWord : 取得 _ 待測試文字 " , () => { 

   beforeEach( () => {

       mock_Get_SecreteWord.mockClear() ; // 清除 _ 上一個測試的 mock call 
      
   }) ; 

   test( "Jotto_App 元件載入(mount)時，函式 get_SecreteWord 執行" , () => {

        const wrapper = setup() ;

        expect( mock_Get_SecreteWord ).toHaveBeenCalledTimes( 1 ) ;

   }) ; 

   test( "Jotto_App 元件更新(update)時，函式 get_SecreteWord 不執行" , () => {
   
        const wrapper : any = setup() ;
        mock_Get_SecreteWord.mockClear();

        wrapper.setProps();  // 元件 update

        expect( mock_Get_SecreteWord ).toHaveBeenCalledTimes( 0 ) ;

   }) ;


}) ;










