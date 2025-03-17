import { useEffect } from 'react'
import { international } from '../../language'

import './index.scss'

import common from '../../language/english/common.json'
import {BiSortDown} from "react-icons/bi";
import {IoList, IoLocation} from "react-icons/io5";
import Product from "../../types/product";
import Header from "../Header";
import deleteIcon from '../../assets/kenya/kaa/delete.png'

type Props = {
    enabledBack: () => void
    onContinue: () => void
    product: Product
}

const Cart = (props: Props) => {
    useEffect(() => {
        document.title = international(common.EmrgMobile)
        props.enabledBack()
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='Cart'>
            <Header />
            <div className='content-area-large'>
                <h2>My Cart</h2>
                <div className='cart-item'>
                    <p className='data'>{props.product.data}{props.product.data_unit}</p>
                    <p className='dur'>{props.product.duration} {props.product.duration_unit}</p>
                    <div className='cart-number'>
                        <div>+</div>
                        <p>1</p>
                        <div>&minus;</div>
                    </div>
                </div>
                <div className='delete'>
                    <img src={deleteIcon} />
                    <p>Remove from cart</p>
                </div>
                <div className='content'>
                    <div className='cost'>
                        <p className='data'>{props.product.data}{props.product.data_unit} data
                            ({props.product.duration} {props.product.duration_unit})</p>
                        <p>${props.product.price}</p>
                    </div>
                    <div className='tax'>
                        <p>Tax</p>
                        <p>${(props.product.price * 0.15).toFixed(2)}</p>
                    </div>
                    <div className='total'>
                        <p>Total</p>
                        <p>${(props.product.price * 1.15).toFixed(2)}</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        props.onContinue()
                    }}
                >
                    Continue to Payment
                </button>
            </div>
        </div>
    )
}

export default Cart