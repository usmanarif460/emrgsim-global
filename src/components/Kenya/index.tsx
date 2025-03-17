import logo from '../../assets/kenya/kaa/logo.png'
import hero from '../../assets/hero.jpeg'

import './index.scss'

type Props = {
}

const Kenya = (props: Props) => {
    return (
        <div className='kenya'>
            <div className='image'>
                <div>
                    <img src={logo} />
                    <div className='desc'>
                        <h1>Karibu Mobile</h1>
                        <h4>POWERED BY <b>EMRGSIM</b></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Kenya