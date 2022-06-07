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

    const invalid = id=== '' || name === '' || contact === '' || address === '' || email === ''


    const addEvent = () => {
        modalRef.current.style.display = 'block'
    }
    const removeEvent = () => {
        modalRef.current.style.display = 'none'
    }
    const handleSubmit = e => {
        e.preventDefault();
        setTable(prev => {
            const newTable = [...prev, {id: id, name: name, contact: contact, address: address, email: email}]
            setId('')
            setName('')
            setContact('')
            setAddress('')
            setEmail('')
            return newTable
        })
    }
    return ( 
        <div className={cx('header')}>
            <div className={cx('wrapper')}>
                <input 
                    placeholder='Tìm kiếm'
                />
                <button className={cx('btn-search')}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
            <button 
                className={cx('btn-add')}
                onClick={addEvent}
            >
                Thêm thành viên
            </button>    

            <Content data={table}/>

            <div className={cx('modal')} id='modal' ref={modalRef}>
                <div className={cx('modal-wrapper')}>
                    <button className={cx('close')} onClick={removeEvent}>&times;</button>
                    <div className={cx('modal-header')}>Thêm thành viên</div>
                    <div className={cx('modal-content')}>
                        <form 
                            action=''
                            method='POST'
                            className={cx('form')}
                            id='form-1'
                        >
                            <div className={cx('form-group')}>
                                <label htmlFor='id' className={cx('form-label')}>ID</label>
                                <input 
                                    id='id'
                                    name='id'
                                    type='text'
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                    placeholder='Nhập id'
                                    className={cx('form-control')}
                                />
                                <span className={cx('form-message')}></span>
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor='fullname' className={cx('form-label')}>Họ và tên</label>
                                <input 
                                    id='fullname'
                                    name='fullname'
                                    type='text'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder='Nhập họ tên'
                                    className={cx('form-control')}
                                />
                                <span className={cx('form-message')}></span>
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor='fullname' className={cx('form-label')}>Số điện thoại</label>
                                <input 
                                    id='contact'
                                    name='contact'
                                    type='text'
                                    value={contact}
                                    onChange={e => setContact(e.target.value)}
                                    placeholder='Nhập số điện thoại'
                                    className={cx('form-control')}
                                />
                                <span className={cx('form-message')}></span>
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor='fullname' className={cx('form-label')}>Địa chỉ</label>
                                <input 
                                    id='address'
                                    name='address'
                                    type='text'
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    placeholder='Nhập địa chỉ'
                                    className={cx('form-control')}
                                />
                                <span className={cx('form-message')}></span>
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor='fullname' className={cx('form-label')}>Email</label>
                                <input 
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder='Nhập email'
                                    className={cx('form-control')}
                                />
                                <span className={cx('form-message')}></span>
                            </div>

                            <button disabled={invalid} className={cx('btn-submit')} onClick={handleSubmit}>Thêm thành viên</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
     );
}

export default Header;