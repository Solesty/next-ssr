import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import data from './data/data.json'

// initial state
const startState = {
    cards: []
}

// Actions
export const initialCards = () => {
    console.log("initialCards")
    return {
        type: 'INITIAL_CARDS',
        cards: data
    }
}

export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        item
    }
}

// Reducers
export const reducer = (state = startState, action) => {
    switch (action.type) {
        case 'INITIAL_CARDS':
            return { cards: action.cards }
        case 'ADD_ITEM':
            return { ...state, cards: { ...state, item: action.item } }
        default:
            return state
    }
}

// create store
export const initStore = (initialState = startState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}