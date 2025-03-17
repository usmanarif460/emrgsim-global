import Header from "../Header";

import './index.scss'
import PageIndex from "../../components/PageIndex";
import { nationalities, countries } from "./list";
import Camera from '../../components/Camera'

import { AiOutlineCamera } from 'react-icons/ai'
import React, {useState} from "react";

type Props = {
}

const Passport = (props: Props) => {
    const [passportImage, setPassportImage ] = useState<string>('')
    const [selfieImage, setSelfieImage ] = useState<string>('')

    return (
        <div className='Passport'>
            <Header />

            <div className='content-area-large passport-flow'>
                <PageIndex index={2} total={4} />
                <form
                    action='/api/passport_data'
                    method='post'
                    onSubmit={(ev) => {
                        for (let i = 0; i < ev.currentTarget.length; i++) {
                            const el = ev.currentTarget[i]
                            const name = el.getAttribute('name')
                            if (!name || name.indexOf('optional') > -1) {
                                continue
                            }

                            let val = ''
                            switch (el.nodeName) {
                                case 'INPUT':
                                    val = (el as HTMLInputElement).value
                                    break
                                case 'SELECT':
                                    val = (el as HTMLSelectElement).value
                            }
                            if (!val) {
                                ev.preventDefault()
                                alert(`Please fill out ${name.replace('-', ' ')}`)
                                break
                            }
                        }
                    }}
                >
                    <h1>Complete Registration</h1>
                    <p>The information below is required to register your electronic simcard.</p>
                    <h2>Scan Identification Documentation</h2>
                    <div className='camera-area'>
                        <Camera
                            idealFacingMode={'environment'}
                            onImage={(img: string) => {
                                if (img.length > 10) {
                                    setPassportImage(img)
                                }
                            }}
                        />
                        <input
                            hidden
                            type='text'
                            value={passportImage}
                            name='passport-image'
                        />
                    </div>
                    <h2>Identification</h2>
                    <div className='question'>
                        <label>Identification Type</label>
                        <p>Passport</p>
                    </div>
                    <div className='question'>
                        <label>Passport Number</label>
                        <input name='passport-number' />
                    </div>
                    <div className='question'>
                        <label>First Name</label>
                        <input name='first-name' />
                    </div>
                    <div className='question'>
                        <label>Middle Name (Optional)</label>
                        <input name='middle-name-optional' />
                    </div>
                    <div className='question'>
                        <label>Last Name</label>
                        <input name='last-name' />
                    </div>
                    <div className='question'>
                        <label>Date of Birth</label>
                        <input
                            type='date'
                            name='dob'
                        />
                    </div>
                    <div className='question'>
                        <label>Gender</label>
                        <select name='gender'>
                            <option selected disabled>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className='question'>
                        <label>Nationality</label>
                        <select name='nationality'>
                            <option selected disabled>Select Nationality</option>
                            {nationalities.map((n) => {
                                return <option>{n}</option>
                            })}
                        </select>
                    </div>
                    <h2>Home Address</h2>
                    <div className='question'>
                        <label>Street Address</label>
                        <input name='street-address' />
                    </div>
                    <div className='question'>
                        <label>Apartment or Unit No.</label>
                        <input name='apartment-optional' />
                    </div>
                    <div className='question'>
                        <label>City</label>
                        <input name='city' />
                    </div>
                    <div className='question'>
                        <label>State/Province</label>
                        <input name='state' />
                    </div>
                    <div className='question'>
                        <label>Zip/Postal Code</label>
                        <input name='zip' />
                    </div>
                    <div className='question'>
                        <label>Country</label>
                        <select name='country'>
                            <option selected disabled>Select Country</option>
                            {countries.map((c) => {
                                return <option>{c}</option>
                            })}
                        </select>
                    </div>
                    <h2>Take your photo</h2>
                    <div>
                        <p>
                            Take a clear photo of face using your front camera.
                            This will be used by the EmrgSIM agent to confirm your identity.
                        </p>
                    </div>
                    <div className='camera-area'>
                        <Camera
                            idealFacingMode={'user'}
                            onImage={(img: string) => {
                                if (img.length > 10) {
                                    setSelfieImage(img)
                                }
                            }}
                        />
                        <input
                            hidden
                            type='text'
                            value={selfieImage}
                            name='selfie-image'
                        />
                    </div>
                    <button type='submit'>
                        Next
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Passport;