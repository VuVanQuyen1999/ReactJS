import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react';
import Styles from './HeaderStyles.module.scss'
import classNames from 'classnames/bind';
import Content from '../Content';

const cx = classNames.bind(Styles)


function Header() {

    const modalRef = useRef()

    

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [table, setTable] = useState([])

    return ( 
        <div className={cx('header')}>
            <div className={cx('wrapper')}>
                <input 
                    placeholder='Tìm kiếm'
                />
                <button className={cx('btn-search')}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
   

            <Content />

            
        </div>
     );
}

export default Header;