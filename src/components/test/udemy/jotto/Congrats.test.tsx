

import { shallow } from "enzyme" ;
import { Congrats } from "./Congrats" ;
import { findByTestAttr } from "./utils/tool" ;



// 樣板設定 / Helper function 
const setup = ( is_Success : boolean ) => shallow( <Congrats is_Success = { is_Success } /> )


// ------------------

test( "畫面有元件：component-congrats" , () => {

    const wrapper   = setup( false );
    const component = findByTestAttr( wrapper , "component-congrats" ) ;

    expect( component.length ).toBe( 1 ) ;

}) ;

test( "當屬性 is_Success 為 false，顯示 : 沒有文字" , () => {

    const wrapper   = setup( false ) ;
    const component = findByTestAttr( wrapper , "component-congrats" ) ;

    expect( component.text() ).toBe( "" ) ;

}) ;

test( "當屬性 is_Success 為 true，顯示 _恭喜訊息" , () => {

    const wrapper     = setup( true ) ;
    const congrat_Msg = findByTestAttr( wrapper , "congrat-message" ) ;

    expect( congrat_Msg.text().length ).not.toBe( 0 ) ;
   
}) ;





