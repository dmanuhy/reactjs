import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


//import hand-book from './Section/hand-book';
class About extends Component {

    render() {

        return (
            <>
                <div className='section-general section-about'>
                    <div className='about-header'>
                        Truyen thong noi gi ve Booking Care
                    </div>
                    <div className='about-content'>
                        <div className='content-left'>
                            <iframe
                                width="100%" height="400px"
                                src="https://www.youtube.com/embed/j4b7eOtIWxA?list=RDj4b7eOtIWxA"
                                title="《蠱》 | 官方正版MV【畫江湖之不良人 第4季 The Degenerate-Drawing Jianghu S4】"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className='content-right'>
                            <p>
                                唐朝末年，天下大亂，藩鎮割據，群雄並起。
                                據說黃巢叛軍攻陷長安之前，官府中的神秘組織——‘不良人’，
                                曾經執行過最後一次任務，然後便消失不見了，
                                幾乎與他們同時消失的，還有叛軍搜遍長安也未曾找到的國庫寶藏，
                                自此以後，江湖上便傳出一條謠言，在傳說中的龍泉劍上，隱藏著一個天大的秘密。
                                主人公李星雲為了幫助自己的同伴勇敢地踏入了從未曾涉足過的嬈疆十萬大山中。
                                為救出夥伴的父親，眾人攜手共進，不畏艱難險阻，屢次直面危險；
                                他們憑著團隊信任和強大的凝聚力為了部族百姓的生活安寧遠離戰亂而奮鬥。
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
