import { AiOutlineCamera } from "react-icons/ai";
import React, {useRef, useState} from "react";
import ReactCamera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import './index.scss'

type onImage = (data: string) => void

type Props = {
    onImage: onImage
    idealFacingMode?: "environment" | "user" | undefined
    label?: string
}

const Camera = (props: Props) => {
    const [img, setImage] = useState<string>('')
    const [cameraReady, setCameraReady] = useState<boolean>(false)
    const [showCamera, setShowCamera] = useState<boolean>(false)

    if (showCamera) {
        return (
            <div className='Camera'>
                <div
                    className='camera'
                    hidden={cameraReady}
                >
                    <ReactCamera
                        onTakePhoto = { (dataUri) => {
                            if (dataUri.length < 10) {
                                setShowCamera(false)
                                return
                            }
                            setImage(dataUri)
                            props.onImage(dataUri)
                            setShowCamera(false)
                        }}
                        onCameraStart={() => {
                            setCameraReady(true)
                        }}
                        onCameraStop={() => {
                            setCameraReady(false)
                        }}
                        onCameraError={() => {
                            setShowCamera(false)
                            alert('Unable to use camera, please enable camera permissions for your browser')
                        }}
                        idealFacingMode={props.idealFacingMode}
                    />
                </div>
            </div>
        )
    }

    return(
        <div className='Camera'>
            <div className='capture-area'>
                <div hidden={!!img}>
                    <AiOutlineCamera
                        onClick={() => {
                            setShowCamera(true)
                        }}
                    />
                </div>
                <div>
                    <img
                        className='captured'
                        src={img}
                        hidden={!img}
                    />
                </div>
            </div>
            <div
                className='passport-take-pic'
                hidden={!img}
            >
                <input
                    type='button'
                    value={!!img ? 'Retake Image' : 'Take Image'}
                    onClick={(ev) => {
                        ev.preventDefault()
                        setImage('')
                        setShowCamera(true)
                    }}
                />
            </div>
        </div>
    )
}

export default Camera