import cellPhone from '../../assets/kenya/kaa/cell-phone.png'
import circle from '../../assets/kenya/kaa/circle-white.png'
import message from '../../assets/kenya/kaa/message.png'

import './index.scss'

type Props = {}

const HeaderLarge = (props: Props) => {
    return (
        <div className='HeaderLarge'>
            <img className='message' src={message} />
            <img className='cell' src={cellPhone} />
            <img className='circle' src={circle} />
        </div>
    )
}

export default HeaderLarge