import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss"
import * as actions from "../../store/actions"
import { LANGUAGES } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import BookingModal from '../../components/Modal/BookingModal';
import moment from 'moment';
import "moment/locale/vi"
import "moment/locale/ja"

const DAYS = 7;

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daysToChoose: [],
            doctorSchedules: [],
            isOpenBookingModal: false,
            selectedTime: {}
        }
    }

    componentDidMount() {
        let days = this.getDaysToChoose(this.props.language)

        this.setState({
            daysToChoose: days
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let days = this.getDaysToChoose(this.props.language)
            this.setState({
                daysToChoose: days
            })
        }
        if (prevProps.doctorSchedulesRedux !== this.props.doctorSchedulesRedux) {
            this.setState({
                doctorSchedules: this.props.doctorSchedulesRedux
            })
        }
        if (prevProps.doctorInfo.doctorID !== this.props.doctorInfo.doctorID) {
            let schedules = this.handleOnChangeDate(this.state.daysToChoose[0].value)
            this.setState({
                doctorSchedules: schedules
            })
        }
    }
    getDaysToChoose = (language) => {
        let days = [];
        for (let i = 1; i <= DAYS; i++) {
            let object = {};
            object.label = moment(new Date()).locale(language).add(i, 'days').format('dddd, DD - MMMM');
            object.value = moment(new Date()).add(i, 'days').startOf('days').toISOString();
            days.push(object);
        }
        return days;
    }

    handleOnChangeDate = async (date) => {
        let { doctorInfo } = this.props
        await this.props.fetchDoctorSchedulesByDateRedux(doctorInfo.doctorID, date);
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenBookingModal: true,
            selectedTime: time
        })
    }

    getCurrencyByLanguage = (chosenLanguage) => {
        switch (chosenLanguage) {
            case LANGUAGES.VI:
                return ' ₫';
            case LANGUAGES.EN:
                return ' $';
            case LANGUAGES.JA:
                return ' ¥';
            default:
                break;
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

    handleCloseBookingModal = () => {
        this.setState({
            isOpenBookingModal: false
        })
    }
    render() {
        let { daysToChoose, doctorSchedules, isOpenBookingModal, selectedTime } = this.state
        let { language, doctorInfo } = this.props
        return (
            <>
                {
                    console.log(doctorSchedules)
                }
                <div className='schedule-container'>
                    <div className='choose-date d-flex align-items-center gap-2 mb-4'>
                        <span className='fs-3' style={{ color: "#45c3d2" }}><FontAwesomeIcon icon="fa-solid fa-calendar-days" /></span>
                        <select onChange={(event) => this.handleOnChangeDate(event.target.value)}>
                            {
                                daysToChoose && daysToChoose.length > 0 &&
                                daysToChoose.map((item, index) => {
                                    return (
                                        <option className='fs-5' value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='available-time'>
                        <div className='text-calendar d-flex align-items-center gap-3'>
                            <span className='fs-4' ><FontAwesomeIcon icon="fa-solid fa-clock" /></span><span className='fs-5 text-uppercase'><FormattedMessage id="doctor-detail.doctor-schedule"></FormattedMessage></span>
                        </div>
                        <div className='times d-flex flex-wrap gap-2'>
                            {
                                doctorSchedules && doctorSchedules.length > 0 ?
                                    doctorSchedules.map((item, index) => {
                                        return (
                                            <div key={index} className='no-wrap'>
                                                <button onClick={() => this.handleClickScheduleTime(item)}>
                                                    <span className='no-wrap'>{item.timeData[this.getValueByLanguage(language)]}</span>
                                                </button>
                                            </div>
                                        )
                                    })
                                    :
                                    <div>
                                        <span className='fst-italic'><FormattedMessage id="doctor-detail.no-schedule-message"></FormattedMessage></span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpen={isOpenBookingModal}
                    time={selectedTime}
                    closeBookingModal={this.handleCloseBookingModal}
                    doctorInfo={doctorInfo}
                    getValueByLanguage={this.getValueByLanguage}
                    getCurrencyByLanguage={this.getCurrencyByLanguage}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorSchedulesRedux: state.admin.doctorSchedulesByDate
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorSchedulesByDateRedux: (doctorID, date) => dispatch(actions.fetchDoctorScheduleByDateStart(doctorID, date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
