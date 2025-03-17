import Header from "../Header";
import {useEffect, useRef, useState} from "react";

import cellPhone from '../../assets/kenya/kaa/cell-phone.png'
import circle from '../../assets/kenya/kaa/circle-white.png'
import message from '../../assets/kenya/kaa/message.png'

import './index.scss'
import Kenya from "../../components/Kenya";
import HeaderLarge from "../HeaderLarge";

type Props = {
    next: () => void
}

type UserData = {
    'passport-image': string,
    'passport-number': string,
    'first-name': string,
    'middle-name-optional': string,
    'last-name':  string,
    'dob': string,
    'gender': string,
    'nationality': string,
    'street-address': string,
    'apartment-optional': string,
    'country': string,
    'city': string,
    'state': string,
    'label': string,
    'zip': string,
    'selfie-image': string
}

type canvasPosition = {
    x: number
    y: number
}

const AgentVerify = (props: Props) => {
    const [userData, setUserData] = useState<UserData|null>(null)
    const canvas = useRef<HTMLCanvasElement|null>(null)
    const [currentPosition, setCurrentPosition] = useState<canvasPosition|null>(null)
    const [lastPos, setLastPos] = useState<canvasPosition|null>(null)
    const [drawing, setDrawing] = useState<boolean>(false)
    const requestRef = useRef<number>(0)
    const [startVerify, setStartVerify] = useState<boolean>(false)
    const [verified, setVerified] = useState<boolean>(false)
    function preventTouch(ev: TouchEvent) {
        if (ev.target === canvas?.current) {
            ev.preventDefault()
        }
    }

    function preventMouse(ev: MouseEvent) {
        if (ev.target === canvas?.current) {
            ev.preventDefault()
        }
    }

    useEffect(() => {
        if (!canvas?.current) {
            return
        }

        canvas.current.addEventListener('touchstart', preventTouch, { passive: false })
        canvas.current.addEventListener('touchend', preventTouch, { passive: false })
        canvas.current.addEventListener('touchmove', preventTouch, { passive: false })
        canvas.current.addEventListener('mousedown', preventMouse, { passive: false })
        canvas.current.addEventListener('mouseup', preventMouse, { passive: false })
        canvas.current.addEventListener('mousemove', preventMouse, { passive: false })

        const ctx = canvas.current.getContext('2d')
        if (ctx) {
            ctx.strokeStyle = '#222222'
            ctx.lineWidth = 4
        }
        return () => {
            if (canvas?.current) {
                canvas.current.removeEventListener('touchstart', preventTouch)
                canvas.current.removeEventListener('touchend', preventTouch)
                canvas.current.removeEventListener('touchmove', preventTouch)
                canvas.current.removeEventListener('mousedown', preventMouse)
                canvas.current.removeEventListener('mouseup', preventMouse)
                canvas.current.removeEventListener('mousemove', preventMouse)
            }
        }
    }, [canvas])

    // function animate() {
    //     requestRef.current = requestAnimationFrame(animate)
    //     renderCanvas()
    // }
    //
    // useEffect(() => {
    //     requestRef.current = requestAnimationFrame(animate)
    //     return () => {
    //         cancelAnimationFrame(requestRef.current);
    //     }
    // }, [])

    useEffect(() => {
        if (!drawing || !canvas?.current || !currentPosition || !lastPos) {
            if (drawing && currentPosition && !lastPos) {
                setLastPos(currentPosition)
            }
            return
        }
        renderCanvas(canvas.current, currentPosition, lastPos)
        setLastPos({
            ...currentPosition
        })
    }, [currentPosition])

    function getCanvasPoint(pos: canvasPosition|null): canvasPosition|null {
        if (!pos) {
            return null
        }
        const rect = canvas?.current?.getBoundingClientRect()
        if (!rect) {
            return null
        }
        return {
            x: pos.x - rect.left,
            y: pos.y - rect.top
        }
    }

    function renderCanvas(canvas: HTMLCanvasElement, currentPosition: canvasPosition, lastPos: canvasPosition) {
        const ctx = canvas.getContext('2d')
        if (!ctx || !drawing) {
            return
        }

        ctx.moveTo(lastPos.x, lastPos.y)
        ctx.lineTo(currentPosition.x, currentPosition.y)
        ctx.stroke()
    }

    function clearCanvas(canvas: HTMLCanvasElement) {
        if (canvas?.width) {
            canvas.width = canvas.width
        }
    }

    function startDrawing(pos: canvasPosition|null) {
        setDrawing(true)
        if (pos) {
            setCurrentPosition(pos)
        }
    }

    function stopDrawing(pos: canvasPosition|null) {
        setDrawing(false)
        setCurrentPosition(null)
        setLastPos(null)
    }

    function draw(pos: canvasPosition|null) {
        if (pos) {
            setCurrentPosition(pos)
        }
    }

    // @ts-ignore
    function mousePosition(ev: MouseEvent<HTMLCanvasElement, MouseEvent>): canvasPosition|null {
        if (!ev.clientY || !ev.clientX) {
            return null
        }
        return {
            x: ev.clientX,
            y: ev.clientY
        }
    }

    // @ts-ignore
    function touchPosition(ev: TouchEvent<HTMLCanvasElement, TouchEvent>): canvasPosition|null {
        if (ev?.touches.length) {
            return {
                x: ev.touches[0].pageX,
                y: ev.touches[0].pageY
            }
        }
        return null
    }

    function verify() {
        fetch(`/api/validate_passport`)
            .then(resp => {
                setVerified(true)
                // props.next()
            })
    }

    useEffect(() => {
        fetch(`/api/get_passport_data`)
            .then((resp: Response) => {
                return resp.json()
            })
            .then((resp: UserData) => {
                setUserData(resp)
            })
            .catch(err => {
                alert(err.message)
                console.warn(err)
            })
    }, [])

    if (verified) {
        return (
            <div className='AgentVerify done'>
                <Header />
                <div className='information information-top'>
                    <div>
                        <div className='alert-verified'>
                            <img className='message' src={message} />
                            <img className='cell' src={cellPhone} />
                            <img className='circle' src={circle} />
                        </div>
                        <h1>Success!</h1>
                        {userData != null && (
                            <h2>You've successfully validated {userData["first-name"]}</h2>
                        )}
                        <button onClick={() => props.next()}>Screen Another Customer</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='AgentVerify'>
            <Header />
            {userData && (
                <div className='information' hidden={startVerify}>
                    <h2>Customer Registration Information</h2>
                    <div className='images'>
                        <div>
                            <h3>Identification</h3>
                            <img src={userData["passport-image"]} />
                        </div>
                        <div>
                            <h3>Image</h3>
                            <img src={userData["selfie-image"]} />
                        </div>
                    </div>

                    <div>
                        <p className='label'>Passport Number</p>
                        <p>{userData["passport-number"]}</p>
                    </div>
                    <div className='flex-it'>
                        <div>
                            <p className='label'>First Name</p>
                            <p>{userData["first-name"]}</p>
                        </div>
                        <div>
                            <p className='label'>Middle Name (Optional)</p>
                            <p>{userData["middle-name-optional"]}</p>
                        </div>
                        <div>
                            <p className='label'>Last Name</p>
                            <p>{userData["last-name"]}</p>
                        </div>
                        <div>
                            <p className='label'>Date of Birth</p>
                            <p>{userData["dob"]}</p>
                        </div>
                        <div>
                            <p className='label'>Gender</p>
                            <p>{userData["gender"]}</p>
                        </div>
                        <div>
                            <p className='label'>Nationality</p>
                            <p>{userData["nationality"]}</p>
                        </div>
                    </div>


                    <h3>Home Address</h3>
                    <div className='flex-it'>
                        <div>
                            <p className='label'>Street Address</p>
                            <p>{userData["street-address"]}</p>
                        </div>
                        <div>
                            <p className='label'>Apartment or Unit No.</p>
                            <p>{userData["apartment-optional"]}</p>
                        </div>
                        <div>
                            <p className='label'>Country</p>
                            <p>{userData["country"]}</p>
                        </div>
                        <div>
                            <p className='label'>City</p>
                            <p>{userData["city"]}</p>
                        </div>
                        <div>
                            <p className='label'>State/Province</p>
                            <p>{userData["state"]}</p>
                        </div>
                        <div>
                            <p className='label'>Zip/Postal Code</p>
                            <p>{userData["zip"]}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className={startVerify ? 'agent expanded' : 'agent'} >
                {startVerify ? (
                    <div>
                        <div className='agent-info sign'>
                            <div>
                                <p className='label'>Agent Name</p>
                                <p>Jonathan Odhiambo</p>
                            </div>
                            <div>
                                <p className='label'>Agent Outlet</p>
                                <p>Emrg Technologies JKIA</p>
                            </div>
                        </div>
                        <div className='agent-info sign'>
                            <div>
                                <p className='label'>Agent Assistant Name</p>
                                <p>Ali Hassan</p>
                            </div>
                            <div>
                                <p className='label'>Agent Assistant ID</p>
                                <p>KD9902282</p>
                            </div>
                        </div>
                        <div className='sign'>
                            <h3>To be filled by point of sale agent</h3>
                            <ul>
                                <li>Seen customer in person</li>
                                <li>Customer completed subscriber registration form</li>
                                <li>Proof of ID matched to customer registering </li>
                                <li>Clear copy of National ID/Passport/Alien/Diplomatic Military ID attached</li>
                            </ul>
                            <div className='check'>
                                <input type='checkbox' />
                                <p>Verify information and Sign</p>
                            </div>
                            <div className='signature'>
                                <div className='canvas-area'>
                                    <canvas
                                        ref={canvas}
                                        onMouseDown={(ev) => {
                                            startDrawing(getCanvasPoint(mousePosition(ev)))
                                        }}
                                        onMouseUp={(ev) => {
                                            stopDrawing(getCanvasPoint(mousePosition(ev)))
                                        }}
                                        onMouseMove={(ev) => {
                                            draw(getCanvasPoint(mousePosition(ev)))
                                        }}
                                        onTouchStart={(ev) => {
                                            startDrawing(getCanvasPoint(touchPosition(ev)))
                                        }}
                                        onTouchEnd={(ev) => {
                                            stopDrawing(getCanvasPoint(touchPosition(ev)))
                                        }}
                                        onTouchCancel={(ev) => {
                                            stopDrawing(getCanvasPoint(touchPosition(ev)))
                                        }}
                                        onTouchMove={(ev) => {
                                            draw(getCanvasPoint(touchPosition(ev)))
                                        }}
                                    />
                                    <div>
                                        <p onClick={() => {
                                            if (canvas.current) {
                                                clearCanvas(canvas.current)
                                            }
                                        }}>Clear</p>
                                    </div>
                                </div>
                            </div>
                            <div className='confirm'>
                                <button onClick={() => verify()}>Confirm</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setStartVerify(true)}>Verify & Sign</button>
                )}
            </div>
        </div>
    )
}

export default AgentVerify