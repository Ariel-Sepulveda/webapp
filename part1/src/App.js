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

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>


const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={totalVotes()} />
        <StatisticLine text="average" value={(totalVotes() / 3).toFixed(1)} />
        <StatisticLine text="positive" value={((good / totalVotes()) * 100).toFixed(2) + ' %'} />
      </tbody>
    </table>
  )
}

export default App