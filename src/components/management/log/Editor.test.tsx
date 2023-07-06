
import { render , fireEvent , waitFor  }  from "@testing-library/react" ;
import '@testing-library/jest-dom/extend-expect';
import { Redirect as MockRedirect } from 'react-router' ;
// import { build , fake , sequence} from 'test-data-bot' ;

import Editor from "./Editor" ;
import { savePost } from './API' ;



// mock 此模組
jest.mock( './API' ) ;  


// mock React-Router
jest.mock( 'react-router' , () => {

    return { Redirect : jest.fn( () => null ) } // 回傳設為 null

})



afterEach( () => {

    // 因 mock 了 api functions ，在任何測試跑完之後，要復原回原本的 api functions ，才不會污染其他的測試 --> 必須保持每個單元測試都是獨立的
    jest.clearAllMocks() ;

})


describe( '提交表單' , () => {

    
    test( '渲染一個表格，含有 Label 元素有 : 標題 , 內容 , 標籤 ，以及一個提交按鈕' , async() => {

        const fakeUser = { id : 'user-1'}  ;

        const fakePost = {
                            title   : 'Test Title' ,
                            content : 'Test content' ,
                            tags    : ['tag1', 'tag2']  // 注意：這個欄位我們想要接收的是 array
                         }

        const expectObj = {
 
             ...fakePost ,
             authorId : fakeUser.id 

         }

        // ----------------------------------  

        // 斷言 savePost 函式的 mock 函式型別 ( 避免以下使用 .mockResolvedValueOnce() 報錯 ) 
        const mockSavePost = savePost as jest.MockedFunction< typeof savePost > ;
        

        // 固定 _ mockSavePost 回傳值  ( 作用 ??? )
        // mockSavePost.mockResolvedValueOnce( expectObj ) ;


        const { getByLabelText , getByText } = render( <Editor user = { fakeUser } /> ) ; 

        const title   = getByLabelText( /標 題/i ) as any ;                 
        const content = getByLabelText( /內 容/i ) as any ;                 
        const tags    = getByLabelText( /標 籤/i ) as any ;                 
    
        const submitButton = getByText( /提 交/i ) ;

        // 注入假資料
        title.value   = fakePost.title ;
        content.value = fakePost.content ;
        tags.value    = fakePost.tags.join(',') ;

        // 點選提交鈕 
        fireEvent.click( submitButton ) ;          


        // 驗證 (1) : 提交後是否按鈕會失效
        expect( submitButton ).toBeDisabled() ; 

        // ------------

        // 驗證 (2) : 提交時，是否輸入正確參數
        expect( mockSavePost ).toHaveBeenCalledWith( expectObj )

        // ------------

        // 驗證 (3) : 提交方法是否被呼叫
        expect( mockSavePost ).toHaveBeenCalledTimes( 1 )

        // ------------

        // 驗證 (4) : Router 重導向 
        await waitFor( () => expect( MockRedirect ).toHaveBeenCalledWith( { to : '/' } , {} ) ) ;
        expect( MockRedirect ).toHaveBeenCalledTimes( 1 ) ;


    } ) ;
    


} )


