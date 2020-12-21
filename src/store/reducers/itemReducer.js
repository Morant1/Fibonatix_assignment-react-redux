const initialState = {
  items: []
}

export function itemReducer(state = initialState, action) {
  switch (action.type) {
      case 'SET_ITEMS':
          return {
              ...state,
              items: action.items
          }
      case 'UPDATE_ITEM':
          return { ...state, items: state.items.map(item => item._id === action.item._id ? action.item : item) }

      case 'ADD_ITEM':
          return { ...state, items: [...state.items, action.item] }

      case 'REMOVE_ITEM':
          const items = state.items.filter(item => item._id !== action.id)
          return { ...state, items }
  
      default:
          return state
  }
}