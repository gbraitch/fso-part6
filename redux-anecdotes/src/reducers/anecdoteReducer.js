import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data

    case 'INCREASE': {
      return state.map(a =>
        a.id !== action.data.id ? a : action.data)
      }

    case 'CREATE':
      return [...state, action.data]

    default:
      return state
  }
}

export const increaseVote = toChange => {
  return async dispatch => {
    const changedAnecdote = {
      ...toChange,
      votes: toChange.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(toChange.id, changedAnecdote)
    dispatch ({
      type: 'INCREASE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer