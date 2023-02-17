import { ConnectKitButton } from 'connectkit'
import { BigNumber, Contract, ethers, Signer } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { Button } from '../../components'
import { CONTRACT_ADDRESS, MedicalFormData } from '../../utils'
import CONTRACTABI from '../../abi/contract-abi.json'
import './dapp.scss'
import * as Name from 'w3name'
import MedicalForm from './medicalform'
import { Web3Storage } from 'web3.storage'

const web3StorageClient = new Web3Storage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2YTNFYzgzMGRjOUEwZjRiN0QwNjQ0MTA2RDk3MzYxNTUzMTZiRDAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU2MTEzOTc4MzUsIm5hbWUiOiJ0ZXN0X21lZCJ9.MyH_YJh7npTIdPWdpEegdFvNnI0n6i5B6N2JAa1Pg1g',
})

const App = () => {
  const { isConnected, address: accountAddress } = useAccount()
  const { data: signer } = useSigner()

  const [appContract, setAppContract] = useState<Contract | null>(null)
  const [addressExists, setAddressExists] = useState(false)
  const [ipnsName, setIpnsName] = useState<number[]>([])
  const [latestRevision, setLatestRevision] = useState<Name.Revision>()

  const checkProfileExists = async () => {
    try {
      const data: Array<BigNumber> = await appContract!.getData(accountAddress)
      if (data.length) {
        setIpnsName(data.map((d) => d.toNumber()))
        const name = await Name.from(new Uint8Array(data.map((d) => d.toNumber())))
        getLatestRevision(name)
      }
    } catch (e) {
      setAddressExists(false)
    }
  }

  const createProfile = async () => {
    const name = await Name.create()
    const key = name.key.bytes
      .toString()
      .split(',')
      .map((s) => Number(s))
    await appContract!.setData(
      name.key.bytes
        .toString()
        .split(',')
        .map((s) => Number(s)),
    )
    setIpnsName(key)
  }

  const onFormSubmit = async (val: MedicalFormData) => {
    const storedName = await Name.from(new Uint8Array(ipnsName))
    const name = Name.parse(storedName.toString())
    const file = new Blob([JSON.stringify({...val, accountAddress})], { type: 'application/json' })
    const files = [new File([file], `${val.firstName}-medical-metadata.json`)]
    const fileCid = await web3StorageClient.put(files, {
      maxRetries: 3,
      wrapWithDirectory: false,
    })
    const value = `/ipfs/${fileCid}`
    try {
      const revision = await Name.resolve(name)
      if (revision.value) {
        const newRevision = await Name.increment(revision, value)
        await Name.publish(newRevision, storedName.key)
        setLatestRevision(newRevision)
      }
    } catch (e) {
      const revision = await Name.v0(storedName, value)
      await Name.publish(revision, storedName.key)
      setLatestRevision(revision)
    }
  }

  const getLatestRevision = async (name: Name.Name) => {
    const revision = await Name.resolve(name)
    setLatestRevision(revision)
  }

  useEffect(() => {
    if (isConnected && signer) {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACTABI,
        signer as Signer,
      )
      setAppContract(contract)
    }
  }, [isConnected, signer])

  useEffect(() => {
    if (appContract) {
      checkProfileExists()
    }
  }, [appContract])

  useEffect(() => {
    if (ipnsName) {
      setAddressExists(true)
    }
  }, [ipnsName])

  useEffect(() => {
    console.log(latestRevision?.value)
  }, [latestRevision])

  return (
    <div className="dapp">
      {!isConnected ? (
        <div className="not-connected">
          <h2 className="not-connected-title">Connect wallet to continue</h2>
          <ConnectKitButton.Custom>
            {({ show }) => {
              return <Button onClick={show}>Connect Wallet</Button>
            }}
          </ConnectKitButton.Custom>
        </div>
      ) : addressExists ? (
        <MedicalForm onSubmit={(val) => onFormSubmit(val)} />
      ) : (
        <div className="does-not-exist">
          <h3 className="does-not-exist-title">Create a Profile</h3>
          <p className="does-not-exist-desc">
            You don't have a profile created with us. This process creates an
            IPFS name and stores it on the contract to retrieve your details the
            next time you visit us. All you need to do is pay gas (which is a
            one time payment) to create the profile.
          </p>
          <Button onClick={createProfile}>Create Profile</Button>
        </div>
      )}
    </div>
  )
}

export default App
