import { Routes as Switch, Route } from 'react-router-dom'
import { Landing } from '../../pages'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Landing />} />
    </Switch>
  )
}

export default Routes
