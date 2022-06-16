import Styles from './ContentStyles.module.scss'
import classNames from 'classnames/bind';
import { computeHeadingLevel } from '@testing-library/react';
import { useState, useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
// import { tab } from '@testing-library/user-event/dist/tab';

const cx = classNames.bind(Styles)

function Content() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [editIndex, setEditIndex] = useState()
    
    const [showConfirm, setShowConfirm] = useState(false);
    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = (index) =>  {
        setShowConfirm(true);
        setEditIndex(index)
    }

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (index) =>  {
        setShowUpdate(true);
        setEditIndex(index)
        setId(id)
        setName(name)
        setContact(contact)
        setAddress(address)
        setEmail(email)
    }

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () =>  setShowAdd(true)


    const [table, setTable] = useState([])

    const invalid = id === '' || name === '' || contact === '' || address === '' || email === ''

    const handleUpdate = (index) => {
        setTable(prev => {
            const newTableUpdate = [...prev, 
                {
                    id: id, 
                    name: name, 
                    contact: contact, 
                    address: address, 
                    email: email
                }
            ]
            setId('')
            setName('')
            setContact('')
            setAddress('')
            setEmail('')
            return newTableUpdate
        })
    }


    const handleDelete = (index) => {
        console.log(index)
        setEditIndex(index)

        setTable((prev) => {
            const newTable = [...prev]
            newTable.splice(index, 1)
            return newTable
        })
        handleCloseConfirm()
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
        <div className={cx('wrapper')}>
            <button 
                className={cx('btn-add')}
                onClick={handleShowAdd}
            >
                Thêm thành viên
            </button>    
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
                                    <button onClick={() => handleShowUpdate(index)}>Sửa</button>
                                    <button onClick={() => handleShowConfirm(index)}>Xóa</button>
                                </td>
                            </tr>
                            
                            <Modal show={showConfirm} onHide={handleCloseConfirm} className={cx('modal-confirm')}>
                                <div className={cx('modal-wrapper')}>
                                    <button className={cx('close')} onClick={handleCloseConfirm}>&times;</button>
                                    <div className={cx('modal-header')}>Bạn có muốn xóa thành viên này không</div>
                                    <div className={cx('modal-content')}>
                                        <button className={cx('btn-submit')} onClick={() => handleDelete(editIndex)}>OK</button>
                                        <button className={cx('btn-cancel')} onClick={handleShowConfirm}>Cancel</button>
                                    </div>
                                </div>
                            </Modal>

                            <Modal show={showUpdate} onHide={handleCloseUpdate} className={cx('modal')} id='modal'>
                                <div className={cx('modal-wrapper')}>
                                    <button className={cx('close')} onClick={handleCloseUpdate}>&times;</button>
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

                                            <button disabled={invalid} className={cx('btn-submit')} onClick={() => handleUpdate(editIndex)}>Cập nhật</button>
                                            <button className={cx('btn-cancel')} onClick={handleCloseUpdate}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>

                            <Modal show={showAdd} onHide={handleCloseAdd} className={cx('modal')} id='modal'>
                                <div className={cx('modal-wrapper')}>
                                    <button className={cx('close')} onClick={handleCloseAdd}>&times;</button>
                                    <div className={cx('modal-header')}>Thêm thành viên</div>
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

                                            <button disabled={invalid} className={cx('btn-submit')} onClick={handleSubmit}>Thêm thành viên</button>
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