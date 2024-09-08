const { createStore ,applyMiddleware } = require('redux')
const { composeWithDevTools } = require('@redux-devtools/extension')
const thunk = require('redux-thunk').default;
// 定义初始状态
const initialState = {
    boardData: null,
    isLoading: false
  }
  
// 定义reducer
function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_BOARD_DATA':
      return {
        ...state,
        boardData: action.payload
      }
    case 'SET_ORIGINAL_TEXT':
      return {
        ...state,
        boardData: {
          ...state.boardData,
          originalText: action.payload
        }
      }
    case 'SET_SHORT_TEXTS':
      return {
        ...state,
        boardData: {
          ...state.boardData,
          shortTexts: action.payload
        }
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}
// 创建store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
if (typeof window !== 'undefined') {
  window.storyStore = store;
}
module.exports = store;