import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, MANAGE_USER, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ManageUserTable from './ManageUserTable';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewImageUrl: '',
            isOpenImage: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            positionID: '',
            roleID: '',
            image: '',

            action: '',
            editUserID: ''
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gendersRedux !== this.props.gendersRedux) {
            let gendersRedux = this.props.gendersRedux;
            this.setState({
                genders: gendersRedux,
                gender: gendersRedux && gendersRedux.length > 0 ? gendersRedux[0].key : ''
            })
        }
        if (prevProps.positionsRedux !== this.props.positionsRedux) {
            let positionsRedux = this.props.positionsRedux;
            this.setState({
                positions: positionsRedux,
                positionID: positionsRedux && positionsRedux.length > 0 ? positionsRedux[0].key : ''
            })
        }
        if (prevProps.rolesRedux !== this.props.rolesRedux) {
            let rolesRedux = this.props.rolesRedux;
            this.setState({
                roles: rolesRedux,
                roleID: rolesRedux && rolesRedux.length > 0 ? rolesRedux[0].key : ""
            })
        }
        if (prevProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                image: '',
                previewImageUrl: '',
                action: MANAGE_USER.CREATE
            })
        }
    }

    getValueByLanguage = (chosenLanguage) => {
        switch (chosenLanguage) {
            case LANGUAGES.VI:
                return 'valueVI';
            case LANGUAGES.EN:
                return 'valueEN';
            case LANGUAGES.JA:
                return 'valueJA';
            default:
                break;
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let selectedFile = data[0];
        if (selectedFile) {
            let base64 = await CommonUtils.getBase64(selectedFile);
            console.log(base64);
            let objectUrl = URL.createObjectURL(selectedFile);
            this.setState({
                previewImageUrl: objectUrl,
                image: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImageUrl) {
            return
        }
        this.setState({
            isOpenImage: true
        })
    }
    handleSaveUserCreation = () => {
        let isValid = this.validateInput();
        let action = this.state.action;
        if (isValid === false) {
            return;
        }
        if (action === MANAGE_USER.CREATE) {
            this.props.createUserStart({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleID: this.state.roleID,
                positionID: this.state.positionID,
                image: this.state.image
            });
            this.props.fetchAllUserRedux();
        } else {
            if (action === MANAGE_USER.UPDATE) {
                //Fire redux edit user
                this.props.updateUserRedux({
                    id: this.state.editUserID,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleID: this.state.roleID,
                    positionID: this.state.positionID,
                    image: this.state.image
                });
            }
        }
    }
    validateInput = () => {
        let isValid = true;
        let userAttribute = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'address'];
        for (let i = 0; i < userAttribute.length; i++) {
            if (!this.state[userAttribute[i]]) {
                isValid = false;
                alert('Misssing required parameter: ' + userAttribute[i]);
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUserParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            positionID: user.positionID,
            roleID: user.roleID,
            image: '',
            previewImageUrl: imageBase64,
            action: MANAGE_USER.UPDATE,
            editUserID: user.id,
        })
    }

    render() {
        let { genders, positions, roles } = this.state;
        let language = this.props.language;
        let isLoadingGenders = this.props.isLoadingGenders;
        let { email, password, firstName, lastName, phoneNumber, address, gender, positionID, roleID } = this.state;
        return (
            <>
                <div className='user-redux-container'>
                    <div className='title'>
                        Manage User Redux
                    </div>
                    <div className="user-redux-body" >
                        <div style={{ width: "1200px" }} className='container mt-5'>
                            <div className="row g-3">
                                <div className="col-md-12 fs-4">
                                    <FormattedMessage id="manager-user.add-new-user" />
                                </div>
                                <div className="col-md-12 text-center text-uppercase fs-4">{isLoadingGenders === true ? "Loading ..." : ""}</div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.first-name" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={firstName}
                                        onChange={(event) => this.onChangeInput(event, 'firstName')}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.last-name" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.email" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={email}
                                        onChange={(event) => this.onChangeInput(event, 'email')}
                                        disabled={this.state.action === MANAGE_USER.UPDATE ? true : false}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.password" />
                                    </label>
                                    <input type="password" className="form-control"
                                        value={password}
                                        onChange={(event) => this.onChangeInput(event, 'password')}
                                        disabled={this.state.action === MANAGE_USER.UPDATE ? true : false}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.phone" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={phoneNumber}
                                        onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.address" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={address}
                                        onChange={(event) => this.onChangeInput(event, 'address')}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.gender" />
                                    </label>
                                    <select className="form-select" value={gender}
                                        onChange={(event) => this.onChangeInput(event, 'gender')}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {item[this.getValueByLanguage(language)]}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.position" />
                                    </label>
                                    <select className="form-select" value={positionID}
                                        onChange={(event) => this.onChangeInput(event, 'positionID')}
                                    >
                                        {positions && positions.length > 0
                                            && positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {item[this.getValueByLanguage(language)]}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.role" />
                                    </label>
                                    <select className="form-select" value={roleID}
                                        onChange={(event) => this.onChangeInput(event, 'roleID')}
                                    >
                                        {roles && roles.length > 0
                                            && roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {item[this.getValueByLanguage(language)]}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <FormattedMessage id="manager-user.image" />
                                    </label>
                                    <div className='preview-image-container'>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >
                                        </div>
                                        <input id='previewImage' type='file' hidden
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <label className='upload-image mb-2' htmlFor='previewImage'>
                                            Tai Anh <i className="fas fa-upload"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 my-3">
                                    <button type="submit"
                                        className={this.state.action === MANAGE_USER.UPDATE ? "btn btn-success" : "btn btn-primary"}
                                        onClick={() => this.handleSaveUserCreation()}>
                                        {this.state.action === MANAGE_USER.UPDATE ?
                                            <FormattedMessage id="manager-user.save-change" />
                                            :
                                            <FormattedMessage id="manager-user.sign-up" />
                                        }
                                    </button>
                                </div>
                                <div className='col-12'>
                                    <ManageUserTable
                                        handleEditUserParent={this.handleEditUserParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.isOpenImage === true &&
                        <LightBox
                            mainSrc={this.state.previewImageUrl}
                            onCloseRequest={() => this.setState({
                                isOpenImage: false
                            })}
                        />
                    }
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gendersRedux: state.admin.genders,
        positionsRedux: state.admin.positions,
        rolesRedux: state.admin.roles,
        isLoadingGenders: state.admin.isLoadingGenders,
        usersRedux: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createUserStart: (data) => dispatch(actions.createUserStart(data)),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        updateUserRedux: (data) => dispatch(actions.updateUserStart(data)),
        //changeAppLanguageRedux: (language) => { dispatch(changeAppLanguage(language)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
