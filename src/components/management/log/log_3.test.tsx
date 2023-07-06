

import configureStore from 'redux-mock-store' ; // for 測試 Redux Action
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { addCounter , fetchCount , fetchUser } from "store/actions/action_Log" ;
import { render , waitFor } from "@testing-library/react" ;



// 建立 _ 所要 mock 的 store ( 僅針對 action ，所以隔絕 reducer, store 的影響 )
const middlewares : any[] = [ thunk ] ;
const mockStore = configureStore( middlewares ) ;


// 還可以設定保管的 state
const store = mockStore({ count: 0, });



describe( 'addCount', () => {


    // 每一次測試後清除 fetchMock 的紀錄
    afterEach( () => {

      fetchMock.restore();

    });

    // --------------
  
    test('Action : ADD_COUNTER 有存在', () => {

      const expectAction = {
        type    : 'ADD_COUNTER' ,
        payload : { addQuantity: 1, },
      };

      expect( addCounter() ).toEqual( expectAction ) ; 

    });
  


    test('get count dispatch of action', async() => {

        // fetchMock 與 fetchCount() 內的請求網址相同
        fetchMock.getOnce('http://example.com/count', {

            body : { count: 4  },

        });
        
        
        const store = mockStore( { count: 0 , } );  // 創建 store
    
        // 使用 store 用 fetchCount() 觸發 dispatch
        await store.dispatch( fetchCount() as any ) ;
        
        // console.log( '目前取得 Actions : ' , store.getActions() ); // 這裡可以看到 dispatch 觸發了哪些事件

    
    });



    test( '測試取得的使用者姓名為 : Leanne Graham' , async() => {  
	
        // expect.assertions( 1 ) ;     // 補捉錯誤
      
       
          // fetchUser().then( ( res : any ) => {   

          //      expect( res.data.name ).toBe( '33 Graham' ); 

          //  }) ;
  
    });






  });