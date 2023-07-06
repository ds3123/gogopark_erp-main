

import { render }  from "@testing-library/react" ;
import '@testing-library/jest-dom/extend-expect';

import Add_Relatives_Button from "components/customers/edit/customer_relatives/components/Add_Relatives_Button" ;




describe( "測試 _ 是否顯示 : 新增關係人按鈕" , () => { 


    test( "如果狀態 ( is_Setting_Existing_Data = false )  ，不為 : 帶入舊關係人資料 ，新增關係人按鈕 -> 顯示" , async() => {

        const mockFunction = jest.fn() ; 

        const { getByText } = render( <Add_Relatives_Button is_Setting_Existing_Data = { false } click_Add_Relatives = { mockFunction } /> )

        const add_Button = getByText( /新 增/i ) ;

        expect( add_Button ).toBeInTheDocument() ;

        
    } ) ;


    test( "如果狀態 ( is_Setting_Existing_Data = true ) ，為 : 帶入舊關係人資料 ，新增關係人按鈕 -> 不顯示" , async() => {

        const mockFunction = jest.fn() ; 

        const { queryByText } = render( <Add_Relatives_Button is_Setting_Existing_Data = { true } click_Add_Relatives = { mockFunction } /> )

        const add_Button = queryByText( /新 增/i ) ;

        expect( add_Button ).not.toBeInTheDocument() ;

        
    } ) ;


}) ;






















