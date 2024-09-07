const { createStore } = require('redux')
// 定义初始状态
const initialState = {
    boardData: null
  }
  
  // 定义reducer
  function rootReducer(state = initialState, action) {
    switch(action.type) {
      case 'SET_BOARD_DATA':
        return {
          ...state,
          boardData: action.payload
        }
      default:
        return state
    }
  }
  // 创建store
  const store = createStore(rootReducer)
  module.exports = store;
  if (typeof window !== 'undefined') {
    window.storyStore = store;
  }