const { createStore ,applyMiddleware } = require('redux')
const { composeWithDevTools } = require('@redux-devtools/extension')
const thunk = require('redux-thunk').default;
// 定义初始状态
const initialState = {
    boardData: null,
    isLoading: false,
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
    case 'SET_SCENE_TEXT':
      return setSceneText(state, action.payload)
    case 'SET_ALL_SCENE_TEXT':
      return setAllSceneText(state, action.payload)
    case 'SET_PROMPT_ITEM':
      return setPromptItem(state, action.payload)
    case 'SET_PROMPT_LIST':
      return {
        ...state,
        boardData: {
          ...state.boardData,
          promptList: action.payload
        }
      }
    default:
      return state
  }
}

function setPromptItem(state, payload) {
  const { key, promptText, name } = payload
  const promptList = state.boardData.promptList
  const index = promptList.findIndex(item => item.key === key)
  if (index !== -1) {
    promptList[index] = {
      ...promptList[index],
      prompt: promptText,
    }
    if (name) {
      promptList[index].name = name
    }
  }
  return {
    ...state,
    boardData: {
      ...state.boardData,
      promptList: [...promptList]
    }
  }
}

function setSceneText(state, payload) {
  const { index, shortText } = payload
  const { boardData } = state
  const boards = boardData.boards
  if (boards[index]) {
    boards[index].content = shortText
  }
  return {
    ...state,
    boardData: {
      ...boardData,
      boards: boards
    }
  }
}
function setAllSceneText(state, payload) {
  const { shortTexts } = payload
  const { boardData } = state
  const boards = boardData.boards
  if (boards.length) {
    boards.forEach((board, index) => {
      board.content = shortTexts[index]
    })
  }

  return {
    ...state,
    boardData: {
      ...boardData,
      boards: boards
    }
  }
}
// 创建store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
if (typeof window !== 'undefined') {
  window.storyStore = store;
}
module.exports = store;