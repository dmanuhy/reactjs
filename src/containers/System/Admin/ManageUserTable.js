import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intanageUserTablel';
import { connect } from 'react-redux';
import "./ManageUserTable.scss";
import * as actions from "../../../store/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ManageUserTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                userList: this.props.usersRedux
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserParent(user);
    }

    render() {
        let userList = this.state.userList;
        return (
            <>
                <table className='user-table mb-5' id='userTableList'>
                    <tbody>
                        <tr className='row'>
                            <th className='col-3'>Email</th>
                            <th className='col-2'>First Name</th>
                            <th className='col-2'>Last Name</th>
                            <th className='col-3'>Address</th>
                            <th className='col-2'>Action</th>
                        </tr>
                        {userList && userList.length > 0 &&
                            userList.map((item, index) => {
                                return (
                                    <tr key={index} className='row'>
                                        <td className='col-3'>{item.email}</td>
                                        <td className='col-2'>{item.firstName}</td>
                                        <td className='col-2'>{item.lastName}</td>
                                        <td className='col-3'>{item.address}</td>
                                        <td className='d-flex justify-content-between col-2 px-5'>
                                            <button className='btn-edit-user'
                                                onClick={() => this.handleEditUser(item)}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-user-pen" />
                                            </button>

                                            <button className='btn-delete-user'
                                                onClick={() => this.handleDeleteUser(item)}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-user-xmark" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody >
                </table >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (userID) => dispatch(actions.deleteUserStart(userID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserTable);
