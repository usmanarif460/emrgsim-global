import './index.scss'

type Props = {
    index: number,
    total: number
}

const PageIndex = (props: Props) => {
    return (
        <div className='PageIndex'>
            <p><b>{props.index}</b> of {props.total}</p>
            <div className='bar-area'>
                <div
                    className='bar-highlight bar'
                    style={{
                        flexGrow: props.index
                    }}
                />
                <div
                    className='bar-no-highlight'
                    style={{
                        flexGrow: props.total-props.index
                    }}
                />
            </div>
        </div>
    )
}

export default PageIndex