import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss"
import * as actions from "../../store/actions"
import { LANGUAGES } from '../../utils';
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
        let { daysToChoose } = this.state

        return (
            <>
                <div className='schedule-container'>
                    <div className='choose-date'>
                        <select onChange={(event) => this.handleOnChangeDate(event)} className='form-control w-50'>
                            {
                                daysToChoose && daysToChoose.length > 0 &&
                                daysToChoose.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='available-time'>

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
