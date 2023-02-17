# About

[OpdReady](https://opdready.com) is a project to store the medical history of a patient.
At the moment, the website works only on Desktop and is a simple MVP.

## Problem Statement

OpdReady focuses on the following problems:
* A patient has to carry a dossier on their doctor's appointment.
* In case of accidents or emergencies, the information is not readily available.
* The patient has to repeat the same information every time they visit a new doctor.

## Solution

The solution is to create a website that stores all this information and more. To be able to store past surgeries, current medication, immunizations, also family medical history. The end vision of the product is to be able to make this information available with a simple scan within a second.

## Under the hood

For the purposes of MVP, the functionality of [Web3Storage](https://web3.storage/) is leveraged.
In simple steps, this is how the app works:
* On connecting the wallet, we ask the user to create a profile for which he has to pay gas.
* The gas is used to store the IPNS key. IPNS will be a simple pointer to the user's metadata.
* The [contract](https://mumbai.polygonscan.com/address/0xc904c95d0cbf50342fd92c8ab4764819f5641808) is deployed on the Polygon Mumbai Network.
* The user's metadata is simply a json file stored on IPFS.
* IPFS hash is generated based on the contents on the file. So, everytime the user adds or updates some information, the hash is changed which makes it difficult to track it.
* To combat that, the IPNS key is stored against the user's address on the contract and everytime the IPFS hash is updated it is published against the IPNS key.
* Packages: [web3.storage](https://www.npmjs.com/package/web3.storage), [w3name](https://www.npmjs.com/package/w3name)

There is no backend at the moment. All the data is stored on IPFS and smart contract integrated with the frontend.

## Frontend Tech Stack

* React with Typescript
* [Ethers](https://www.npmjs.com/package/ethers)
* [ConnectKit](https://www.npmjs.com/package/connectkit)
* [wagmi](https://www.npmjs.com/package/wagmi)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
