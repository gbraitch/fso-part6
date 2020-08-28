import React from 'react'
import { connect } from 'react-redux'
import { increaseVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteForm = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [])

  const vote = (anecdote) => {
    props.increaseVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes
        .filter(a => a.content.toUpperCase().startsWith(props.filter.toUpperCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  increaseVote,
  initializeAnecdotes,
  setNotification
}

const connectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default connectedAnecdoteForm