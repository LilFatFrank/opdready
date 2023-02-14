import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { Button } from '../../components'
import './medicalform.scss'

const MedicalForm = () => {
  const { isConnected } = useAccount()

  return (
    <div className="medical-form">
      {!isConnected ? (
        <div className="not-connected">
          <h2 className="not-connected-title">Connect wallet to continue</h2>
          <ConnectKitButton.Custom>
            {({ show }) => {
              return <Button onClick={show}>Connect Wallet</Button>
            }}
          </ConnectKitButton.Custom>
        </div>
      ) : null}
    </div>
  )
}

export default MedicalForm
