const reducer = (state = null, action) => {
  switch (action.type) {
    case 'RESET_MESSAGE':
      return null
    case 'UPDATE_MESSAGE':
      return action.data
    default:
      return state
  }
}

let timeoutID

export const setNotification = (message, t) => {
  return async dispatch => {
    dispatch ({
      type: 'UPDATE_MESSAGE',
      data: message
    })

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE'
      })
    }, t*1000)
  }
}

export default reducer