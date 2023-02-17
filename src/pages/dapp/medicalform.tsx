import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '../../components'
import { MedicalFormData, rem } from '../../utils'
import './medicalform.scss'

interface MedicalFormProps {
    onSubmit: (val: MedicalFormData) => void
}

const MedicalForm = ({ onSubmit }: MedicalFormProps) => {
  const [formData, setFormData] = useState<MedicalFormData>({
    firstName: '',
    lastName: '',
    contact: '',
    sex: '',
    age: '',
    bloodGroup: '',
    height: '',
    weight: '',
    lifestyle: '',
    alcohol: '',
    smoking: '',
    allergies: '',
    accountAddress: ''
  })

  const addFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="medical-form-container">
        <h3 className="form-title">Medical form</h3>
        <div className="medical-form-section">
          <h4 className="medical-form-section-title">Personal Details</h4>
          <div className="medical-form-section-fields">
            <div className="input-container">
              <label className="input-container-label">First Name</label>
              <input
                placeholder="John"
                type={'text'}
                className={'input-container-input'}
                name={'firstName'}
                onChange={addFormData}
              />
            </div>
            <div className="input-container">
              <label className="input-container-label">Last Name</label>
              <input
                placeholder="Doe"
                type={'text'}
                className={'input-container-input'}
                name={'lastName'}
                onChange={addFormData}
              />
            </div>
            <div className="input-container">
              <label className="input-container-label">Contact</label>
              <input
                placeholder="1234567890"
                type={'text'}
                className={'input-container-input'}
                name={'contact'}
                onChange={addFormData}
              />
            </div>
          </div>
          <div className="medical-form-section-fields">
            <div className="input-container">
              <label className="input-container-label">Sex</label>
              <input
                placeholder="M"
                type={'text'}
                className={'input-container-input'}
                name={'sex'}
                onChange={addFormData}
              />
            </div>
            <div className="input-container">
              <label className="input-container-label">Age</label>
              <input
                placeholder="27"
                type={'text'}
                className={'input-container-input'}
                name={'age'}
                onChange={addFormData}
              />
            </div>
          </div>
          <div className="medical-form-section-fields">
            <div className="input-container">
              <label className="input-container-label">Blood Group</label>
              <input
                placeholder="B+"
                type={'text'}
                className={'input-container-input'}
                name={'bloodGroup'}
                onChange={addFormData}
              />
            </div>
            <div className="input-container">
              <label className="input-container-label">Height (in cm)</label>
              <input
                placeholder="165"
                type={'text'}
                className={'input-container-input'}
                name={'height'}
                onChange={addFormData}
              />
            </div>
            <div className="input-container">
              <label className="input-container-label">Weight (in kg)</label>
              <input
                placeholder="65"
                type={'text'}
                className={'input-container-input'}
                name={'weight'}
                onChange={addFormData}
              />
            </div>
          </div>
        </div>
        <div className="medical-form-section">
          <h4 className="medical-form-section-title">General Information</h4>
          <div className="medical-form-section-fields">
            <div className="input-container">
              <label className="input-container-label">Lifestyle</label>
              <input
                placeholder="Sedentary"
                type={'text'}
                className={'input-container-input'}
                name={'lifestyle'}
                onChange={addFormData}
              />
            </div>
            <div className="input-container">
              <label className="input-container-label">
                Alcohol Consumption
              </label>
              <input
                placeholder="Yes"
                type={'text'}
                className={'input-container-input'}
                name={'alcohol'}
                onChange={addFormData}
              />
            </div>
            <div className="input-container">
              <label className="input-container-label">Smoking</label>
              <input
                placeholder="No"
                type={'text'}
                className={'input-container-input'}
                name={'smoking'}
                onChange={addFormData}
              />
            </div>
            <div className="input-container">
              <label className="input-container-label">Allergies</label>
              <input
                placeholder="Milk, Nuts"
                type={'text'}
                className={'input-container-input'}
                name={'allergies'}
                onChange={addFormData}
              />
            </div>
          </div>
        </div>
        <Button style={{ marginTop: rem(15), alignSelf: 'end' }} type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default MedicalForm
