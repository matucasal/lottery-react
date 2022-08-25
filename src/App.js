import React, { useEffect, useState } from 'react'
import './App.css'
import web3 from './web3'
import lottery from './lottery'

function App() {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getManager = async () => {
      const localManager = await lottery.methods.manager().call()
      const localPlayers = await lottery.methods.getPlayers().call()
      const localBalance = await web3.eth.getBalance(lottery.options.address)

      setManager(localManager)
      setPlayers(localPlayers)
      setBalance(localBalance)
    }
    getManager()
  }, [])

  function handleEnterAmount(event) {
    setValue(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    setMessage('Waiting for transacction...')
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether'),
    })
    setMessage('You have entered')
  }

  const onPickWinner = async () => {
    const accounts = await web3.eth.getAccounts()
    setMessage('Waiting for Pick winner...')
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    })
    setMessage('Winner picked')
  }

  return (
    <div>
      <h2>Lottery contract</h2>
      <p>This contract is managed by {manager}</p>
      There are currently {players.length} people entered, competing to wing{' '}
      {web3.utils.fromWei(balance, 'ether')} ether!
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>
            Amout of ether to enter
            <input value={value} onChange={handleEnterAmount}></input>
          </label>
          <button type="submit">Enter</button>
        </div>
      </form>
      <hr />
      <h1> {message} </h1>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={onPickWinner} type="button">
        Pick a winner!
      </button>
      <hr />
    </div>
  )
}

export default App
