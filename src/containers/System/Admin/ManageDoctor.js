import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageDoctor.scss'
import { LANGUAGES, MANAGE_ACTION } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { getAllSpecialtyService } from '../../../services/specialtyService';
import { Editor } from 'primereact/editor';

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            introduction: '',
            description: '',
            selectedProvince: "",
            selectedPrice: "",
            selectedMethod: "",
            clinicName: '',
            clinicAddress: '',
            selectedSpecialty: "",
            note: '',
            count: 0,

            allDoctor: [],
            prices: [],
            paymentMethods: [],
            provinces: [],
            allSpecialty: [],

            hasOldData: false,
        }
    }
    async componentDidMount() {
        let response = await getAllSpecialtyService();
        this.setState({
            allSpecialty: response.data,
            selectedSpecialty: response && response.data ? response.data[0].id : ""
        })
        console.log(this.state.allSpecialty)
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllcodeRedux('PROVINCE');
        this.props.fetchAllcodeRedux('PRICE');
        this.props.fetchAllcodeRedux('PAYMENT');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux || prevProps.language !== this.props.language) {
            let dataSelect = this.buildDoctorData(this.props.allDoctorRedux);
            this.setState({
                allDoctor: dataSelect
            })
        }
        if (prevProps.provincesRedux !== this.props.provincesRedux) {
            let provincesRedux = this.props.provincesRedux;
            this.setState({
                provinces: provincesRedux,
                selectedProvince: provincesRedux && provincesRedux.length > 0 ? provincesRedux[0].key : ''
            })
        }
        if (prevProps.pricesRedux !== this.props.pricesRedux) {
            let pricesRedux = this.props.pricesRedux;
            this.setState({
                prices: pricesRedux,
                selectedPrice: pricesRedux && pricesRedux.length > 0 ? pricesRedux[0].key : ''
            })
        }
        if (prevProps.paymentMethodsRedux !== this.props.paymentMethodsRedux) {
            let paymentMethodsRedux = this.props.paymentMethodsRedux;
            this.setState({
                paymentMethods: paymentMethodsRedux,
                selectedMethod: paymentMethodsRedux && paymentMethodsRedux.length > 0 ? paymentMethodsRedux[0].key : ''
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

    buildDoctorData = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.forEach((item, index) => {
                let object = {};
                switch (language) {
                    case LANGUAGES.VI: object.label = `${item.lastName} ${item.firstName}`; break;
                    case LANGUAGES.EN: object.label = `${item.firstName} ${item.lastName}`; break;
                    case LANGUAGES.JA: object.label = `${item.firstName} ${item.lastName}`; break;
                    default: object.label = `${item.firstName} ${item.lastName}`; break;
                }
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    buildSelectData = (option) => {

    }

    handleSaveDoctorDetail = () => {
        let { hasOldData } = this.state
        this.props.saveDoctorDetailRedux({
            doctorID: this.state.selectedDoctor.value,
            introduction: this.state.introduction,
            specialtyID: this.state.selectedSpecialty,
            provinceID: this.state.selectedProvince,
            priceID: this.state.selectedPrice,
            paymentID: this.state.selectedMethod,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
            description: this.state.description,
            action: hasOldData === true ? MANAGE_ACTION.UPDATE : MANAGE_ACTION.CREATE
        })
    }
    handleSelectDoctor = async (selectedDoctor) => {
        this.setState({
            selectedDoctor
        })
        await this.props.fetchDoctorDetailsRedux(selectedDoctor.value);
        let { doctorDetailRedux } = this.props;
        if (doctorDetailRedux && doctorDetailRedux.Doctor_Detail) {
            let doctorDetail = doctorDetailRedux.Doctor_Detail;
            this.setState({
                introduction: doctorDetail.introduction,
                description: doctorDetail.description,
                selectedSpecialty: doctorDetail.specialtyID,
                selectedProvince: doctorDetail.provinceID,
                selectedPrice: doctorDetail.priceID,
                selectedMethod: doctorDetail.paymentID,
                clinicName: doctorDetail.clinicName,
                clinicAddress: doctorDetail.clinicAddress,
                note: doctorDetail.note,
                hasOldData: true
            })
        } else {
            this.setState({
                introduction: "",
                description: "",
                selectedProvince: this.state.provinces.length > 0 ? this.state.provinces[0].key : "",
                selectedPrice: this.state.prices.length > 0 ? this.state.prices[0].key : "",
                selectedMethod: this.state.paymentMethods.length > 0 ? this.state.paymentMethods[0].key : "",
                selectedSpecialty: this.state.allSpecialty.length > 0 ? this.state.allSpecialty[0].id : "",
                clinicName: "",
                clinicAddress: "",
                note: "",
                hasOldData: false
            })
        }
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { allSpecialty, clinicName, clinicAddress, selectedPrice, selectedMethod, prices, provinces, selectedProvince, paymentMethods, note, hasOldData, selectedSpecialty } = this.state
        let { language } = this.props
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='title'><FormattedMessage id="system.manage-doctor.create-doctor-detail"></FormattedMessage></div>
                    <div className='doctor-information row'>
                        <div className='col-6 form-group'>
                            <div className='mb-3'>
                                <label><FormattedMessage id="system.manage-doctor.choose-doctor"></FormattedMessage></label>
                                <Select
                                    onChange={this.handleSelectDoctor}
                                    options={this.state.allDoctor}
                                />
                            </div>
                            <div className='form-group'>
                                <label><FormattedMessage id="system.manage-doctor.introduction"></FormattedMessage></label>
                                <Editor value={this.state.introduction} onTextChange={(e) => this.setState({ introduction: e.htmlValue })} style={{ height: '150px' }} />
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='mb-3'>
                                <label><FormattedMessage id="system.manage-doctor.clinic-name"></FormattedMessage></label>
                                <input value={clinicName} className='form-control' onChange={(event) => this.setState({ clinicName: event.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <label><FormattedMessage id="system.manage-doctor.clinic-address"></FormattedMessage></label>
                                <input value={clinicAddress} className='form-control' onChange={(event) => this.setState({ clinicAddress: event.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <label><FormattedMessage id="system.manage-doctor.specialty"></FormattedMessage></label>
                                <select className="form-select" value={selectedSpecialty}
                                    onChange={(event) => this.setState({ selectedSpecialty: event.target.value })}
                                >
                                    {allSpecialty && allSpecialty.length > 0 &&
                                        allSpecialty.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label><FormattedMessage id="system.manage-doctor.note"></FormattedMessage></label>
                                <input value={note} className='form-control' onChange={(event) => this.setState({ note: event.target.value })} />
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className='mb-3'>
                                <label><FormattedMessage id="system.manage-doctor.province"></FormattedMessage></label>
                                <select className="form-select" value={selectedProvince}
                                    onChange={(event) => this.setState({ selectedProvince: event.target.value })}
                                >
                                    {provinces && provinces.length > 0 &&
                                        provinces.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {item[this.getValueByLanguage(language)]}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label><FormattedMessage id="system.manage-doctor.price"></FormattedMessage></label>
                                <select className="form-select" value={selectedPrice}
                                    onChange={(event) => this.setState({ selectedPrice: event.target.value })}
                                >
                                    {prices && prices.length > 0 &&
                                        prices.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {item[this.getValueByLanguage(language)]}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label><FormattedMessage id="system.manage-doctor.payment-method"></FormattedMessage></label>
                                <select className="form-select" value={selectedMethod}
                                    onChange={(event) => this.setState({ selectedMethod: event.target.value })}
                                >
                                    {provinces && provinces.length > 0 &&
                                        paymentMethods.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {item[this.getValueByLanguage(language)]}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <div><FormattedMessage id="system.manage-doctor.description"></FormattedMessage></div>
                        <Editor value={this.state.description} onTextChange={(e) => this.setState({ description: e.htmlValue })} style={{ height: '400px' }} />
                    </div>
                    <button
                        className='btn-save'
                        onClick={() => this.handleSaveDoctorDetail()}
                    >
                        {
                            hasOldData === true ?
                                <FormattedMessage id="manage-user.save-change"></FormattedMessage>
                                :
                                <FormattedMessage id="manage-user.create-new"></FormattedMessage>
                        }
                    </button>
                </div >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctorRedux: state.admin.allDoctor,
        doctorDetailRedux: state.admin.doctorDetails,
        language: state.app.language,
        paymentMethodsRedux: state.admin.paymentMethods,
        pricesRedux: state.admin.prices,
        provincesRedux: state.admin.provinces
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
        saveDoctorDetailRedux: (data) => dispatch(actions.saveDoctorDetailStart(data)),
        fetchDoctorDetailsRedux: (data) => dispatch(actions.fetchDoctorDetailsStart(data)),
        fetchAllcodeRedux: (type) => dispatch(actions.fetchAllcodeStart(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
