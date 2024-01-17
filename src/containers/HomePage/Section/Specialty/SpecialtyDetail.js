import React, { Component } from 'react';
import { connect } from "react-redux";
import "../../../../assets/scss/SpecialtyDetail.scss"
import HomeHeader from '../../HomeHeader';

class SpecialtyDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {

        return (
            <>
                <HomeHeader />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
