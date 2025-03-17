import React, {useState} from 'react'

import HeaderLarge from '../HeaderLarge'
import Camera from '../../components/Camera'

import './index.scss'

type Props = {
    next: () => void
}

const AgentScan = (props: Props) => {
    const [proceed, setProceed] = useState<boolean>(false)
    const [image, setImage] = useState<boolean>(false)
    return (
        <div className='AgentScan'>
            <HeaderLarge />
            <div className='camera-area'>
                <h2>Tap Camera to Scan Barcode</h2>
                <Camera
                    idealFacingMode={'environment'}
                    onImage={(img: string) => {
                        setImage(true)
                    }}
                />
            </div>
            <div className='or'>
                <h1>OR</h1>
            </div>
            <div className='verification'>
                <input placeholder='Enter Verification Code' onChange={(ev) => setProceed(!!ev.target.value)} />
            </div>
            <div>
                <button
                    disabled={!proceed && !image}
                    onClick={() => props.next()}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default AgentScan