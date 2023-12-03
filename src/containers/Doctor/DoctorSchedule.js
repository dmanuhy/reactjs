import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss"
import * as actions from "../../store/actions"
import { LANGUAGES } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import "moment/locale/vi"
import "moment/locale/ja"

const DAYS = 7;

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daysToChoose: [],
            doctorSchedules: []
        }
    }

    componentDidMount() {
        this.setDaysToChoose(this.props.language)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setDaysToChoose(this.props.language);
        }
        if (prevProps.doctorSchedulesRedux !== this.props.doctorSchedulesRedux) {
            this.setState({
                doctorSchedules: this.props.doctorSchedulesRedux
            })
        }
    }
    setDaysToChoose = (language) => {
        let days = [];
        for (let i = 0; i < DAYS; i++) {
            let object = {};
            object.label = moment(new Date()).locale(language).add(i, 'days').format('ddd, DD - MMM');
            object.value = moment(new Date()).add(i, 'days').startOf('days').toISOString();
            days.push(object);
        }
        this.setState({
            daysToChoose: days
        })
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

    handleOnChangeDate = async (event) => {
        let { doctorID } = this.props
        let date = event.target.value
        await this.props.fetchDoctorSchedulesByDateRedux(doctorID, date);
        console.log(this.state)
    }

    render() {
        let { daysToChoose, doctorSchedules } = this.state
        let { language } = this.props
        return (
            <>
                <div className='schedule-container'>
                    <div className='choose-date d-flex align-items-center gap-2 mb-4'>
                        <span className='fs-3' style={{ color: "#45c3d2" }}><FontAwesomeIcon icon="fa-solid fa-calendar-days" /></span>
                        <select onChange={(event) => this.handleOnChangeDate(event)}>
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
                            <span className='fs-4' style={{ color: "#ffc10e" }}><FontAwesomeIcon icon="fa-solid fa-clock" /></span><span style={{ color: "#ffc10e" }} className='fs-5 text-uppercase'><FormattedMessage id="doctor-detail.doctor-schedule"></FormattedMessage></span>
                        </div>
                        <div className='times d-flex flex-wrap gap-2'>
                            {
                                doctorSchedules && doctorSchedules.length > 0 ?
                                    doctorSchedules.map((item, index) => {
                                        return (
                                            <div className='no-wrap'>
                                                <button key={index}><span className='no-wrap'>{item.timeData[this.getValueByLanguage(language)]}</span></button>
                                            </div>
                                        )
                                    })
                                    :
                                    <div>
                                        <span style={{ color: "#ffc10e" }}> Bác sĩ không có lịch khám trong hôm nay, vui lòng chọn ngày khác</span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
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
