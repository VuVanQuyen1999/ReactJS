import Styles from './ContentStyles.module.scss'
import classNames from 'classnames/bind';
import { computeHeadingLevel } from '@testing-library/react';
import { useState, useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { tab } from '@testing-library/user-event/dist/tab';

const cx = classNames.bind(Styles)

function Content(props) {

    const data = props.data


    const modalRef = useRef()

    const modalConfirmRef = useRef()

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [editIndex, setEditIndex] = useState()
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (index) =>  {
        setShow(true);
        setEditIndex(index)
    }

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = (index) =>  {
        setShow1(true);
        setEditIndex(index)
    }
    const [table, setTable] = useState(data)

    const invalid = id === '' || name === '' || contact === '' || address === '' || email === ''

    const handleUpdate = (index) => {
        
    }


    const handleDelete = (index, data) => {
        console.log(index)
        setEditIndex(index)

        setTable((prev) => {
            const newTable = [...prev]
            newTable.splice(index, 1)
            return newTable
        })
        handleClose()
    }

    useEffect(() => {
        setTable(data)
        console.log('mounted')
    }, [data])
    
    return ( 
        <div className={cx('wrapper')}>
            <table className={cx('table')}>
                <tr>
                    <th>ID</th>
                    <th>Họ tên</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                
                    {
                    table.length ? 
                    table.map((item, index) => {
                      return (
                        <>
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.contact}</td>
                                <td>{item.address}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button onClick={() => handleShow1(index)}>Sửa</button>
                                    <button onClick={() => handleShow(index)}>Xóa</button>
                                </td>
                            </tr>
                            
                            <Modal show={show} onHide={handleClose} className={cx('modal-confirm')} ref={modalConfirmRef}>
                                <div className={cx('modal-wrapper')}>
                                    <button className={cx('close')} onClick={handleClose}>&times;</button>
                                    <div className={cx('modal-header')}>Bạn có muốn xóa thành viên này không</div>
                                    <div className={cx('modal-content')}>
                                        <button className={cx('btn-submit')} onClick={() => handleDelete(editIndex, data)}>OK</button>
                                        <button className={cx('btn-cancel')} onClick={handleClose}>Cancel</button>
                                    </div>
                                </div>
                            </Modal>

                            <Modal show={show1} onHide={handleClose1} className={cx('modal')} id='modal' ref={modalRef}>
                                <div className={cx('modal-wrapper')}>
                                    <button className={cx('close')} onClick={handleClose1}>&times;</button>
                                    <div className={cx('modal-header')}>Cập nhật thông tin thành viên</div>
                                    <div className={cx('modal-content')}>
                                        <div 
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

                                            <button disabled={invalid} className={cx('btn-submit')} onClick={() => handleUpdate(editIndex, data)}>Cập nhật</button>
                                            <button className={cx('btn-cancel')} onClick={handleClose1}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>
                      )
                    })
                    : 
                    <tr>Không có thành viên nào</tr>
                    
                    }
            </table>
            


            
        </div>
     );
}

export default Content;