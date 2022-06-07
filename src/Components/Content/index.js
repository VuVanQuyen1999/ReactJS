import Styles from './ContentStyles.module.scss'
import classNames from 'classnames/bind';
import { computeHeadingLevel } from '@testing-library/react';

const cx = classNames.bind(Styles)

function Content(props) {
console.log(props.data);
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
                    props.data.length ? 
                    props.data.map((item, index) => {
                      return ( 
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.contact}</td>
                            <td>{item.address}</td>
                            <td>{item.email}</td>
                            <td>
                                <button>Sửa</button>
                                <button>Xóa</button>
                            </td>
                        </tr>
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