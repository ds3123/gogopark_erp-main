
import { renderHook , act } from '@testing-library/react-hooks';
import useSection_Folding from './useSection_Folding';


/* 第一個以 Chat GPT 寫下的測試案例  2023.03.28 ^＿^" */

describe( '自訂 Hook : useSection_Folding', () => {

    test( '點選折疊按鈕後，is_folding 狀態會由 false 轉為 true', () => {

        const { result }     = renderHook( () => useSection_Folding() );
        const { Folding_Bt } = result.current;

        expect( result.current.is_folding ).toBe(false);

        act( () => {

            Folding_Bt.props.onClick();

        });

        expect( result.current.is_folding ).toBe( true ) ;

    });

});


