

import { shallow } from "enzyme" ;
import { Click_Count } from "./Click_Count" ;



// 樣板設定 / Helper function ( 可抽取至獨立檔案，供多個測試檔案呼叫使用 )
const setup          = () => shallow( <Click_Count/> ) ;
const findByTestAttr = ( wrapper : any , val : string ) => wrapper.find( `[data-test='${ val }']`  ) ;

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－



test( "畫面有元件：component-app" , () => {

    const wrapper   = setup() ;
    const component = findByTestAttr( wrapper , "component-app" ) ;
    
    expect( component.length ).toBe( 1 ) ;

}) ;



test( "畫面元件有:新增計數按鈕" , () => {

    const wrapper = setup() ;
    const button  = findByTestAttr( wrapper , "increment-button" ) ;
    
    expect( button.length ).toBe( 1 ) ;

}) ;



test( "畫面元件有:顯示目前計數" , () => {

    const wrapper = setup() ;
    const display = findByTestAttr( wrapper , "counter-display" ) ;
    
    expect( display.length ).toBe( 1 ) ;

}) ;


test( "目前計數 _ 初始為 0" , () => {

    const wrapper = setup() ;
    const count   = findByTestAttr( wrapper , "count" ).text() ;

    expect( count ).toBe( "0" ) ;

}) ;

test( "點選 _ 新增計數按鈕 -> 目前計數顯示區塊會加 1 ( 測試 _ 行為 )" , () => {

    const wrapper = setup() ;
    const button  = findByTestAttr( wrapper , "increment-button" ) ;

    button.simulate( "click" ) ;  // 點選 _ 新增按鈕

    const count   = findByTestAttr( wrapper , "count" ).text() ;

    expect( count ).toBe( "1" ) ;

}) ;