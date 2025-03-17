import HeaderLarge from '../HeaderLarge'

import './index.scss'
import Kenya from "../../components/Kenya";
import React from "react";

type Props = {
    login: () => void
}

const Agent = (props: Props) => {
    return (
        <div className='Agent'>
            <div className='kenya-header'>
                <Kenya />
            </div>
            <div className='login-area'>
                <h2>Sign In</h2>
                <div className='login'>
                    <label>Agent Username</label>
                    <input />
                </div>
                <div className='login'>
                    <label>Password</label>
                    <input type='password' />
                </div>
                <div className='button-area'>
                    <button
                        onClick={() => props.login()}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Agent