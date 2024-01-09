import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BookingModal.scss'
import moment from 'moment';
import FlatPickr from "react-flatpickr"
import NumberFormat from 'react-number-format';
import { bookAppointment } from '../../services/bookingService';
import { toast } from 'react-toastify';
import "moment/locale/vi"
import "moment/locale/ja"
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientName: "",
            gender: true,
            dob: new Date(),
            phoneNumber: "",
            reason: ""
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    buildDoctorName = () => {
        switch (this.props.language) {
            case "en": return this.props.doctorInfo.firstName + " " + this.props.doctorInfo.lastName;
            case "ja": return this.props.doctorInfo.firstName + " " + this.props.doctorInfo.lastName
            case "vi": return this.props.doctorInfo.lastName + " " + this.props.doctorInfo.firstName;
            default: return this.props.doctorInfo.firstName + " " + this.props.doctorInfo.lastName;
        }
    }

    handleBookAppointment = async () => {
        let res = await bookAppointment({
            patientID: this.props.userInfo.id,
            patientName: this.state.patientName,
            gender: this.state.gender === true ? "M" : "F",
            dob: this.state.dob,
            dobString: moment(this.state.dob).locale(this.props.language).format('DDD/MMMM/YYYY'),
            phoneNumber: this.state.phoneNumber,
            reason: this.state.reason,
            doctorID: this.props.doctorInfo.doctorID,
            doctorFullname: this.buildDoctorName(),
            date: this.props.time.date,
            dateTime: "[" + this.props.time.timeData[this.props.getValueByLanguage(this.props.language)] + "] - " + moment(this.props.time.date).locale(this.props.language).format('DDD/MMMM/YYYY'),
            timeType: this.props.time.timeType,
            language: this.props.language
        })
        if (res && res.errorCode === 0) {
            toast.success("Booked new appointment !")
            this.props.closeBookingModal();
        } else {
            toast.error(res.message)
        }
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            dob: date[0],
        })
    }

    render() {
        let { language, isOpen, time, closeBookingModal, doctorInfo, getValueByLanguage, getCurrencyByLanguage } = this.props;
        return (
            <>
                {
                    console.log(this.props)
                }
                <Modal
                    isOpen={isOpen}
                    className='booking-modal-container'
                    size='lg'
                    centered
                >
                    <div className='booking-modal-header'>
                        <span className='title'><FormattedMessage id="doctor-detail.booking-modal.booking-information"></FormattedMessage></span>
                        <span onClick={closeBookingModal} className='close-icon'><FontAwesomeIcon icon="fa-solid fa-x" /></span>
                    </div>
                    <div className='booking-modal-body row'>
                        <div className='col-12 d-flex'>
                            <div className='doctor-image col-3' style={{ backgroundImage: `url(${doctorInfo && doctorInfo.image})` }}></div>
                            <div className='col-9 d-flex px-5 justify-content-between'>
                                <div>
                                    <div className='doctor-text-name fs-4 fw-bold'>
                                        {doctorInfo && doctorInfo.position &&
                                            <span>
                                                {doctorInfo.position[getValueByLanguage(language)]}: {doctorInfo.firstName}, {doctorInfo.lastName}
                                            </span>
                                        }
                                    </div>
                                    <div className='pt-2 d-flex flex-column gap-2'>
                                        <div>
                                            {
                                                time && moment(time.date).locale(language).format('dddd, DD - MMMM')
                                            }
                                        </div>
                                        <div>
                                            <span style={{ backgroundColor: "#fff04b" }} className=' p-2 rounded-2'>
                                                {time && time.timeData && time.timeData[getValueByLanguage(language)]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className='fs-5'><FormattedMessage id="doctor-detail.booking-modal.price"></FormattedMessage>: </span>
                                    <NumberFormat className='text-white fs-5 bg-success p-2 rounded-2' value={doctorInfo && doctorInfo.price && doctorInfo.price[getValueByLanguage(language)]} displayType={'text'} thousandSeparator={true} suffix={getCurrencyByLanguage(language)}> </NumberFormat>
                                </div>
                            </div >
                        </div>
                        <div className='col-4'>
                            <label className='mb-2'><FormattedMessage id="doctor-detail.booking-modal.patient-full-name"></FormattedMessage></label>
                            <input onChange={(event) => this.setState({ patientName: event.target.value })} value={this.state.patientName} className='form-control' type='text' />
                        </div>
                        <div className='col-2'>
                            <label><FormattedMessage id="doctor-detail.booking-modal.patient-gender"></FormattedMessage></label>
                            <div class="form-check">
                                <input onClick={() => this.setState({ gender: true })} name='gender' checked={this.state.gender === true ? true : false} class="form-check-input" type="radio" id="male" />
                                <label class="form-check-label" for="male">
                                    <FormattedMessage id="doctor-detail.booking-modal.male"></FormattedMessage>
                                </label>
                            </div>
                            <div class="form-check">
                                <input onClick={() => this.setState({ gender: false })} name='gender' checked={this.state.gender === true ? false : true} class="form-check-input" type="radio" id="female" />
                                <label class="form-check-label" for="female">
                                    <FormattedMessage id="doctor-detail.booking-modal.female"></FormattedMessage>
                                </label>
                            </div>
                        </div>
                        <div className='col-3'>
                            <label className='mb-2'><FormattedMessage id="doctor-detail.booking-modal.year-of-birth"></FormattedMessage></label>
                            <FlatPickr
                                className='form-control'
                                value={this.state.dob}
                                onChange={this.handleChangeDatePicker}
                                options={{ dateFormat: "d/m/Y", maxDate: "today" }}
                            />
                        </div>
                        <div className='col-3'>
                            <label className='mb-2'><FormattedMessage id="doctor-detail.booking-modal.phone-number"></FormattedMessage></label>
                            <input onChange={(event) => this.setState({ phoneNumber: event.target.value })} value={this.state.phoneNumber} className='form-control' type='text' />
                        </div>
                        <div class="form-floating col-12 p-1">
                            <textarea onChange={(event) => this.setState({ reason: event.target.value })} style={{ height: "200px" }} class="form-control" placeholder="Leave a comment here" id="floatingTextarea">{this.state.reason}</textarea>
                            <label for="floatingTextarea"><FormattedMessage id="doctor-detail.booking-modal.reason"></FormattedMessage></label>
                        </div>
                    </div>
                    <div className='booking-modal-footer d-flex justify-content-end gap-2'>
                        <button onClick={() => this.handleBookAppointment()} className='btn btn-success'><FormattedMessage id="doctor-detail.booking-modal.confirm"></FormattedMessage></button>
                        <button onClick={closeBookingModal} className='btn btn-secondary'><FormattedMessage id="doctor-detail.booking-modal.cancel"></FormattedMessage></button>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
