import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

//font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookMedical, faMagnifyingGlass, faHospital, faLaptopMedical, faNotesMedical, faMicroscope, faTooth, faListCheck, faSuitcaseMedical, faUserPen, faUserXmark, faUserDoctor, faRightFromBracket, faEyeSlash, faEye, faCalendarDays, faClock, faCircleInfo, faHandPointer, faX, } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
library.add(faBookMedical, faMagnifyingGlass, faHospital, faLaptopMedical, faNotesMedical, faMicroscope, faTooth, faListCheck, faSuitcaseMedical, faUserPen, faUserXmark, faUserDoctor, faRightFromBracket, faEyeSlash, faEye, faGoogle, faFacebookF, faCalendarDays, faClock, faCircleInfo, faHandPointer, faX);

const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <IntlProviderWrapper>
                <App persistor={persistor} />
            </IntlProviderWrapper>
        </Provider>,
        document.getElementById('root')
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
