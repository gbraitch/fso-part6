const initialState = {
  message: 'Initial Notification',
  timeoutID: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_MESSAGE':
      return { message: '', timeoutID: ''}
    case 'UPDATE_MESSAGE':
      return { message: action.data.message, timeoutID: action.data.timeoutID}
    default:
      return state
  }
}

export const setNotification = (message, t) => {
  return async dispatch => {
    dispatch ({
      type: 'UPDATE_MESSAGE',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE'
      })
    }, t*1000)
  }
}

export default reducer