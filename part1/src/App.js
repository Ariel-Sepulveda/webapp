import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button handler={() => setGood(good + 1)} text="good" />
      <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handler={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

const Button = ({ handler, text }) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Display = ({ text, votes }) => {
  return (
    <div>
      {text + ' ' + votes}
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const totalVotes = () => (good + bad + neutral)

  if (totalVotes() === 0) {
    return (
      <div>no feedback given</div>
    )
  }

  return (
    <>
      <Display text="good" votes={good} />
      <Display text="neutral" votes={neutral} />
      <Display text="bad" votes={bad} />
      <Display text="all" votes={totalVotes()} />
      <Display text="average" votes={totalVotes() / 3} />
      <Display text="positive" votes={(good / (good + bad + neutral)) * 100} />
    </>
  )
}

export default App