import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intanageUserTablel';
import { connect } from 'react-redux';
import "./ManageUserTable.scss";
import * as actions from "../../../store/actions";

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
            <table className='user-table mb-5' id='userTableList'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {userList && userList.length > 0 &&
                        userList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td >
                                        <button className='btn-edit-user'
                                            onClick={() => this.handleEditUser(item)}
                                        >
                                            <i className="fas fa-edit" ></i>
                                        </button>

                                        <button className='btn-delete-user'
                                            onClick={() => this.handleDeleteUser(item)}
                                        >
                                            <i className="fas fa-user-slash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody >
            </table >
        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (userID) => dispatch(actions.deleteUserStart(userID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserTable);
