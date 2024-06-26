import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react';
import { useMainContract } from './hooks/useMainContract';
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from '@ton/core';
import WebApp from '@twa-dev/sdk'

//contract address = EQD1zcZB7w7gG18sKLL13jbnK5xNvu2Ywd4KOuOTE6xqlvyR
//owner address= 0QD9K7jUqeYKTSF7r00MJpOa2j48mKMSzUZo2Wqxegvh3FOh

function App() {
  const {
    contract_address,
    counter_value,
    /*
    recent_sender,
    owner_address,
    */
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const {connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

  return (
  <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Platform</b>
          <div className='Hint'>{WebApp.platform}</div>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0,30)+"..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && (<div className='Hint'>{fromNano(contract_balance)}</div>)}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
      </div>

      <a onClick={() => { showAlert() }}>Color scheme is: {WebApp.colorScheme}</a>
      <br/>

      {connected && (
        <a onClick={() => { sendIncrement()}}>Increment by 5</a>
      )
      }

      <br/>
      {connected && (
        <a onClick={() => { sendDeposit()}}>Request deposit of 1 TON</a>
        )}

      <br/>
      {connected && (
        <a onClick={() => { sendWithdrawalRequest()}}>Request 0.7 TON withdrawal</a>
        )}
  </div>);
}

export default App
