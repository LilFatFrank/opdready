import { Routes as Switch, Route } from 'react-router-dom'
import { Landing, MedicalForm } from '../pages'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Landing />} />
      <Route path="/medicalform" element={<MedicalForm />} />
    </Switch>
  )
}

export default Routes
