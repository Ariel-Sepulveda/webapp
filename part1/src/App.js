import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handler={goodClick} text="good" />
      <Button handler={neutralClick} text="neutral" />
      <Button handler={badClick} text="bad" />

      <h1>statistics</h1>

      <Display text={'good ' + good} />
      <Display text={'neutral ' + neutral} />
      <Display text={'bad ' + bad} />
      
    </div>
  )
}

const Button = ({ handler, text }) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Display = ({ text }) => {
  return (
    <div>
      {text}
    </div>
  )
}

export default App