import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './DoctorDetail.scss';
import { getDoctorDetailsService } from '../../services/userService'
import { LANGUAGES } from '../../utils'
import DoctorSchedule from './DoctorSchedule';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
            isShowPriceTable: false,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDoctorDetailsService(id);
            if (res && res.errorCode === 0) {
                this.setState({
                    doctor: res.data
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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

    getCurrencyByLanguage = (chosenLanguage) => {
        switch (chosenLanguage) {
            case LANGUAGES.VI:
                return ' đ';
            case LANGUAGES.EN:
                return ' $';
            case LANGUAGES.JA:
                return ' ¥';
            default:
                break;
        }
    }

    changePriceTableState = () => {
        this.setState({
            isShowPriceTable: !this.state.isShowPriceTable
        })
    }

    render() {
        let { doctor, isShowPriceTable } = this.state;
        let language = this.props.language;
        return (
            <>
                {
                    console.log(doctor)
                }
                <HomeHeader />
                <div className='doctor-detail-container'>
                    <div className='doctor-introduction row'>
                        <div className='doctor-image col-3' style={{ backgroundImage: `url(${doctor && doctor.image ? doctor.image : 1})` }}></div>
                        <div className='doctor-text col-9 d-flex flex-column'>
                            <div className='doctor-text-name fs-3 fw-bold'>
                                {doctor && doctor.positionData &&
                                    <span>
                                        {doctor.positionData[this.getValueByLanguage(language)]}: {doctor.firstName}, {doctor.lastName}
                                    </span>
                                }
                            </div>
                            <div className='doctor-text-description pt-2'>
                                {doctor && doctor.Doctor_Detail &&
                                    <div dangerouslySetInnerHTML={{ __html: doctor.Doctor_Detail.introduction }}></div>
                                }
                            </div>
                        </div>
                    </div >
                    <div className='doctor-schedule row'>
                        <div className='left-content col-6'>
                            <DoctorSchedule doctorID={doctor.id} />
                        </div>
                        <div className='right-content col-6 px-4'>
                            <div className='top-content py-3'>
                                <div className='medical-address fw-bold text-uppercase mb-2'><FormattedMessage id="doctor-detail.medical-address"></FormattedMessage></div>
                                {doctor && doctor.Doctor_Detail &&
                                    <>
                                        <div className='fw-bold px-3 py-1'>{doctor.Doctor_Detail.clinicName}</div>
                                        <div className='px-3 py-1'>{doctor.Doctor_Detail.clinicAddress}</div>
                                    </>
                                }
                            </div>
                            <div className='bottom-content py-3'>
                                {
                                    isShowPriceTable === false ?
                                        <>
                                            <div className='price text-uppercase fw-bold'>
                                                <span><FormattedMessage id="doctor-detail.price"></FormattedMessage>: </span>
                                                {
                                                    doctor && doctor.Doctor_Detail &&
                                                    <NumberFormat className='text-success text-lowercase' value={doctor && doctor.Doctor_Detail && doctor.Doctor_Detail.priceData[this.getValueByLanguage(language)]} displayType={'text'} thousandSeparator={true} suffix={this.getCurrencyByLanguage(language)} />
                                                }
                                            </div>
                                            <div><span className='text-info' onClick={() => this.changePriceTableState()}><FormattedMessage id="doctor-detail.view-detail"></FormattedMessage></span></div>
                                        </>
                                        :
                                        <>
                                            <div className='price text-uppercase fw-bold'><FormattedMessage id="doctor-detail.price"></FormattedMessage></div>
                                            <div className='price-table px-4 py-2'>
                                                <div className='border border-2 rounded-1'>
                                                    <div className='multi-price px-5'>
                                                        <div className='d-flex justify-content-between py-2'>
                                                            <span><FormattedMessage id="doctor-detail.vietnam"></FormattedMessage></span>
                                                            {
                                                                doctor && doctor.Doctor_Detail &&
                                                                <NumberFormat className='text-success text-lowercase' value={doctor.Doctor_Detail.priceData['valueVI']} displayType={'text'} thousandSeparator={true} suffix={this.getCurrencyByLanguage('vi')} />
                                                            }
                                                        </div>
                                                        <div className='d-flex justify-content-between py-2'>
                                                            <span><FormattedMessage id="doctor-detail.usa"></FormattedMessage></span>
                                                            {
                                                                doctor && doctor.Doctor_Detail &&
                                                                <NumberFormat className='text-success text-lowercase' value={doctor.Doctor_Detail.priceData['valueEN']} displayType={'text'} thousandSeparator={true} suffix={this.getCurrencyByLanguage('en')} />
                                                            }
                                                        </div>
                                                        <div className='d-flex justify-content-between py-2'>
                                                            <span><FormattedMessage id="doctor-detail.japan"></FormattedMessage></span>
                                                            {
                                                                doctor && doctor.Doctor_Detail &&
                                                                <NumberFormat className='text-success text-lowercase' value={doctor.Doctor_Detail.priceData['valueJA']} displayType={'text'} thousandSeparator={true} suffix={this.getCurrencyByLanguage('ja')} />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='p-2 text-center bg-info text-white'>
                                                        <span className=''><FormattedMessage id="doctor-detail.payment-method"></FormattedMessage>: </span>
                                                        <span>
                                                            {
                                                                doctor && doctor.Doctor_Detail &&
                                                                doctor.Doctor_Detail.paymentData[this.getValueByLanguage(language)]
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div><span className='text-info' onClick={() => this.changePriceTableState()}><FormattedMessage id="doctor-detail.hide-price-table"></FormattedMessage></span></div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='doctor-information'>
                        {doctor && doctor.Doctor_Detail &&
                            <div dangerouslySetInnerHTML={{ __html: doctor.Doctor_Detail.description }}></div>
                        }
                    </div>
                    <div className='doctor-comment'></div>
                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
