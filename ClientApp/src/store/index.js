import C from '../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	// console.log('ski days', store.getState().length)
	result = next(action)

	let { customer, product, sale, store } = store.getState()

	console.log(`

		customer: ${customer}
		product: ${product}
		sale: ${sale}
		store: ${store}

	`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk)(createStore)(appReducer, initialState)
}



