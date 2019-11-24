// import C from './constants'
// import fetch from 'isomorphic-fetch'

// export function addDay(resort, date, powder=false, backcountry=false) {

//     return {
//         type: C.ADD_DAY,
//         payload: {resort,date,powder,backcountry}
//     }

// }

export const updateSaleRecord = (data) => {

    return {
        type: "UPDATE_ALL_RECORD",
        records: data
    }

}

export const setEditRecord = (data) => {

    return {
        type: "SET_EDIT_RECORD",
        records: data
    }

}

export const clearEditRecord = () => {return {type: "CLEAR_EDIT_RECORD", record : {}}}
    

// export const setGoal = (goal) => 
//     ({
//         type: C.SET_GOAL,
//         payload: goal
//     })

// export const addError = (message) => 
//    ({
//       type: C.ADD_ERROR,
//       payload: message
//    })

// export const clearError = index => 
//     ({
//         type: C.CLEAR_ERROR,
//         payload: index
//     })   

// export const changeSuggestions = suggestions => 
//   ({
//     type: C.CHANGE_SUGGESTIONS,
//     payload: suggestions
//   })

// export const clearSuggestions = () => 
//     ({
//         type: C.CLEAR_SUGGESTIONS
//     })

// export const suggestResortNames = value => dispatch => {

//     dispatch({
//         type: C.FETCH_RESORT_NAMES
//     })

//     fetch('http://localhost:3333/resorts/' + value)
//         .then(response => response.json())
//         .then(suggestions => {

//             dispatch({
//                 type: C.CHANGE_SUGGESTIONS,
//                 payload: suggestions
//             })

//         })
//         .catch(error => {

//             dispatch(
//                 addError(error.message)
//             )

//             dispatch({
//                 type: C.CANCEL_FETCHING
//             })

//         })

// }
export const fetchSaleData = () => async (dispatch, state) => {
    dispatch({
        type: "START_FETCH_RECORDS"
    })
    try {
        const response = await fetch('api/')
        const data = await response.json();
        console.log(`=>${data}`)
        dispatch({
            type: "FETCH_ALL_RECORD",
            records: data
        })
    } catch (e) {
        console.error(e);
    }

}
