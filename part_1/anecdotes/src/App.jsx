import { useState } from 'react'

const Button = ({handle_click, text}) => <button onClick={handle_click}> {text} </button>

const Anecdote = ({text, votes}) => {
  return (
    <div>
      <p>{text}</p>
      <p>Has {votes} votes.</p>
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)
  }

  const random_limit_len = () => Math.floor(Math.random() * anecdotes.length)
  const popularIndex = () => votes.indexOf(Math.max.apply(null, votes))

  console.log(selected)
  console.log(votes)
  console.log(popularIndex())
  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handle_click={vote} text={"vote"} />
      <Button handle_click={() => setSelected(random_limit_len())} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[popularIndex()]} votes={votes[popularIndex()]} />
    </div>
  )
}

export default App