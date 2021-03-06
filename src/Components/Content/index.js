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
                Th??m th??nh vi??n
            </button>    
            <table className={cx('table')}>
                <tr>
                    <th>ID</th>
                    <th>H??? t??n</th>
                    <th>S??? ??i???n tho???i</th>
                    <th>?????a ch???</th>
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
                                    <button onClick={() => handleShowUpdate(index)}>S???a</button>
                                    <button onClick={() => handleShowConfirm(index)}>X??a</button>
                                </td>
                            </tr>
                            
                            <Modal show={showConfirm} onHide={handleCloseConfirm} className={cx('modal-confirm')}>
                                <div className={cx('modal-wrapper')}>
                                    <button className={cx('close')} onClick={handleCloseConfirm}>&times;</button>
                                    <div className={cx('modal-header')}>B???n c?? mu???n x??a th??nh vi??n n??y kh??ng</div>
                                    <div className={cx('modal-content')}>
                                        <button className={cx('btn-submit')} onClick={() => handleDelete(editIndex)}>OK</button>
                                        <button className={cx('btn-cancel')} onClick={handleShowConfirm}>Cancel</button>
                                    </div>
                                </div>
                            </Modal>

                            <Modal show={showUpdate} onHide={handleCloseUpdate} className={cx('modal')} id='modal'>
                                <div className={cx('modal-wrapper')}>
                                    <button className={cx('close')} onClick={handleCloseUpdate}>&times;</button>
                                    <div className={cx('modal-header')}>C???p nh???t th??ng tin th??nh vi??n</div>
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
                                                    placeholder='Nh???p id'
                                                    className={cx('form-control')}
                                                />
                                                <span className={cx('form-message')}></span>
                                            </div>

                                            <div className={cx('form-group')}>
                                                <label htmlFor='fullname' className={cx('form-label')}>H??? v?? t??n</label>
                                                <input 
                                                    id='fullname'
                                                    name='fullname'
                                                    type='text'
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder='Nh???p h??? t??n'
                                                    className={cx('form-control')}
                                                />
                                                <span className={cx('form-message')}></span>
                                            </div>

                                            <div className={cx('form-group')}>
                                                <label htmlFor='fullname' className={cx('form-label')}>S??? ??i???n tho???i</label>
                                                <input 
                                                    id='contact'
                                                    name='contact'
                                                    type='text'
                                                    value={contact}
                                                    onChange={e => setContact(e.target.value)}
                                                    placeholder='Nh???p s??? ??i???n tho???i'
                                                    className={cx('form-control')}
                                                />
                                                <span className={cx('form-message')}></span>
                                            </div>

                                            <div className={cx('form-group')}>
                                                <label htmlFor='fullname' className={cx('form-label')}>?????a ch???</label>
                                                <input 
                                                    id='address'
                                                    name='address'
                                                    type='text'
                                                    value={address}
                                                    onChange={e => setAddress(e.target.value)}
                                                    placeholder='Nh???p ?????a ch???'
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
                                                    placeholder='Nh???p email'
                                                    className={cx('form-control')}
                                                />
                                                <span className={cx('form-message')}></span>
                                            </div>

                                            <button disabled={invalid} className={cx('btn-submit')} onClick={() => handleUpdate(editIndex)}>C???p nh???t</button>
                                            <button className={cx('btn-cancel')} onClick={handleCloseUpdate}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>

                            <Modal show={showAdd} onHide={handleCloseAdd} className={cx('modal')} id='modal'>
                                <div className={cx('modal-wrapper')}>
                                    <button className={cx('close')} onClick={handleCloseAdd}>&times;</button>
                                    <div className={cx('modal-header')}>Th??m th??nh vi??n</div>
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
                                                    placeholder='Nh???p id'
                                                    className={cx('form-control')}
                                                />
                                                <span className={cx('form-message')}></span>
                                            </div>

                                            <div className={cx('form-group')}>
                                                <label htmlFor='fullname' className={cx('form-label')}>H??? v?? t??n</label>
                                                <input 
                                                    id='fullname'
                                                    name='fullname'
                                                    type='text'
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder='Nh???p h??? t??n'
                                                    className={cx('form-control')}
                                                />
                                                <span className={cx('form-message')}></span>
                                            </div>

                                            <div className={cx('form-group')}>
                                                <label htmlFor='fullname' className={cx('form-label')}>S??? ??i???n tho???i</label>
                                                <input 
                                                    id='contact'
                                                    name='contact'
                                                    type='text'
                                                    value={contact}
                                                    onChange={e => setContact(e.target.value)}
                                                    placeholder='Nh???p s??? ??i???n tho???i'
                                                    className={cx('form-control')}
                                                />
                                                <span className={cx('form-message')}></span>
                                            </div>

                                            <div className={cx('form-group')}>
                                                <label htmlFor='fullname' className={cx('form-label')}>?????a ch???</label>
                                                <input 
                                                    id='address'
                                                    name='address'
                                                    type='text'
                                                    value={address}
                                                    onChange={e => setAddress(e.target.value)}
                                                    placeholder='Nh???p ?????a ch???'
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
                                                    placeholder='Nh???p email'
                                                    className={cx('form-control')}
                                                />
                                                <span className={cx('form-message')}></span>
                                            </div>

                                            <button disabled={invalid} className={cx('btn-submit')} onClick={handleSubmit}>Th??m th??nh vi??n</button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>
                      )
                    })
                    : 
                    <tr>Kh??ng c?? th??nh vi??n n??o</tr>
                    
                    }
            </table>
            


            
        </div>
     );
}

export default Content;