/*
 
   # 整合測試 ( Integration )
      --> 測試 ：
           * Action Creator
           * Reducer

*/

import { storeFactory } from "./jotto/utils/tool";
import { guessWord } from "./actions/action_Success";

import { reducer_GuessWord } from "./reducers/reducer_GuessWord";

describe( "guessWord action dispatcher" , () => {

  const secreteWord       = "party" ;
  const unsuccessfulGuess = "train" ;

  describe( "沒有任何 ( guessedWords 為空陣列 )  _ 猜測數字" , () => {

    let store : any ;

    const reducers_Obj = { GUESS_WORD: reducer_GuessWord };

    beforeEach(() => {
      store = storeFactory(reducers_Obj); // 建立 store
    });

    test("猜錯時，能正確更新 state", () => {

      const expectedState = {

        GUESS_WORD: {
                      secreteWord  : secreteWord,
                      is_Success   : false,
                      guessedWords : [
                                       { guessedWord : unsuccessfulGuess, letterMatchCount: 3 },
                                      ],
                    },
      };

      // 觸發 _ action
      store.dispatch( guessWord(secreteWord, unsuccessfulGuess));

      // 取得 _ store 目前 state
      const newState = store.getState();

      //expect( newState ).toEqual( expectedState ) ;
      expect(newState ).toEqual(expectedState);

    }) ;

    test("猜對時，能正確更新 state", () => {

      // 期待結果
      const expectedState = {
        GUESS_WORD: {
          secreteWord: secreteWord,
          is_Success: true,
          guessedWords: [{ guessedWord: secreteWord, letterMatchCount: 5 }],
        },
      };

      // 觸發 _ action
      store.dispatch(guessWord(secreteWord, secreteWord));

      // 取得 _ store 目前 state
      const newState = store.getState();

      expect(newState).toEqual(expectedState);

    });
  }) ;

  describe( "已有一些 ( guessedWords 不為空陣列 ) _ 猜測文字" , () => {

    // 預先已有一筆資料
    const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];

    let store: any;

    const reducers_Obj = { GUESS_WORD: reducer_GuessWord };

    // 初始 state
    const initState = {
      GUESS_WORD: {
        secreteWord: secreteWord,
        is_Success: false,
        guessedWords: guessedWords, // 設定、修改 _ 預設 state
      },
    };

    beforeEach(() => {
      store = storeFactory(reducers_Obj, initState); // 建立 store
    });

    test("猜錯時，能正確更新 state", () => {
      // 期待結果
      const expectedState = {
        GUESS_WORD: {
          secreteWord: secreteWord,
          is_Success: false,
          guessedWords: [
            ...guessedWords,
            { guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
          ],
        },
      };

      // 觸發 _ action
      store.dispatch(guessWord(secreteWord, unsuccessfulGuess));

      // 取得 _ store 目前 state
      const newState = store.getState();

      expect(newState).toEqual(expectedState);
    });

    test.skip("猜對時，能正確更新 state", () => {
      // 期待結果
      const expectedState = {
        GUESS_WORD: {
          secreteWord: secreteWord,
          is_Success: true,
          guessedWords: [
            ...guessedWords,
            { guessedWord: secreteWord, letterMatchCount: 5 },
          ],
        },
      };

      // 觸發 _ action
      store.dispatch(guessWord(secreteWord, secreteWord));

      // 取得 _ store 目前 state
      const newState = store.getState();

      expect(newState).toEqual(expectedState);
    });
  }) ;

});
