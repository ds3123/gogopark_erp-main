import { render }  from "@testing-library/react" ;
import '@testing-library/jest-dom/extend-expect';

import Show_Customer_Relatives_Row from "components/customers/edit/customer_relatives/components/Show_Customer_Relatives_Row" ;



describe( "測試 _ 是否顯示 : 客戶已新增關係人列" , () => { 

   test( "如果狀態為 : 新增資料 ( current 為 true ) 且該客戶已有新增關係人 ( Current_Customer_Relatives 元素數大於 0 )  -> 顯示 : 客戶已新增關係人列" , () => {
   
        // 新增洗澡
        const current_Add_Tab  = "洗澡" ;  

        // 有 2 個關係人
        const fakeRelativesArr = [
                                    { name : "施先生" , tag : "父" , type : "緊急聯絡人" } ,
                                    { name : "黃小姐" , tag : "朋友" , type : "介紹人" } 
                                 ] ;

        const mockFunction     = jest.fn() ; 

        const { getByTestId }  = render( <Show_Customer_Relatives_Row current = { current_Add_Tab } Current_Customer_Relatives = { fakeRelativesArr } click_Relatives_Btn = { mockFunction } /> )
        
        const relativesRow     = getByTestId( "relatives-row" ) ;

        expect( relativesRow ).toBeInTheDocument() ;


   }) ;
 

   test( "關係人列中，資料( 所有關係人按鈕 )，是否有渲染出" , () => {


        const mockFunction     = jest.fn() ; 
        const fakeRelativesArr = [
                                   { name : "施先生" , tag : "父" , type : "緊急聯絡人" } ,
                                   { name : "黃小姐" , tag : "朋友" , type : "介紹人" } 
                                 ] ;

        const { getAllByRole } = render( 
                                         <Show_Customer_Relatives_Row 
                                               current                    = { '洗澡' } 
                                               Current_Customer_Relatives = { fakeRelativesArr } 
                                               click_Relatives_Btn        = { mockFunction } 
                                         /> 
                                       )



        const relativeButtons  = getAllByRole( "relativeButton" ) ;  // 取得 _ 所有 : 關係人按鈕

        expect( relativeButtons[0] ).toHaveTextContent( fakeRelativesArr[0].name  ) ;
        expect( relativeButtons[1] ).toHaveTextContent( fakeRelativesArr[1].name ) ;


   }) ; 

}) ;




