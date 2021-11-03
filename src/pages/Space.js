import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../components/common/NewHeader';
import Footer from '../components/common/Footer';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import Slick from 'react-slick';
import a1 from '../imgs/cafezone1.jpg';
import a2 from '../imgs/highpart.JPG';
import a3 from '../imgs/studyroomA.JPG';
import a4 from '../imgs/mainImg3.png';
import a5 from '../imgs/highpart.JPG';
import MainAbout from '../components/main/MainAbout';

const Wrapper = styled.div`
    padding-top : 3.5rem;
    padding-bottom : 50px;
    background : green;
`;


const Category = styled(Responsive)`
    background: lightgray;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width : 50%;
    height: 3rem;
    margin-top : 30px;
    margin-bottom : 30px;
    border-radius : 3px;
    ul {
        display: flex;
        list-style: none;
        justify-content: space-around;
        padding-left : 0px;
        width: 100%;
    }
    @media screen and (max-width: 768px) {
        width : 90%;
    }
    .cate {
        color : gray;
        cursor : pointer;
        font-size : 13px;
    }
    #first {
        color : black;
        font-size : 15px;
        font-weight : bold;
    }
`;

const ImgWrap = styled(Responsive)`
    background : brown;
`;

const MainSlide = styled.div`
    position : relative;
`;

const MainImg = styled.div`
    width : 50%;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width : 80%;
    }
`;

const SubImgsSlide = styled.div`
    width : 80%;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width : 90%;
    }
`;

const SubImg = styled.img`

`;

const PrevButton = styled.button`
    position : absolute;
    top : 50%;
    left : 0;
    transform : translateY(-50%);
    width : 100px;
`;
const NextButton = styled.button`
    position : absolute;
    top : 50%;
    right : 0;
    transform : translateY(-50%);
    width : 100px;
`;


function Space() {
    const [mainSlick, setMainSlick] = useState(null);
    const [pagingSlick, setPagingSlick] = useState(null);
    const mainSlickRef = useRef(null);
    const pagingSlickRef = useRef(null);

    useEffect(() => { setMainSlick(mainSlickRef.current); setPagingSlick(pagingSlickRef.current); }, []);

    const mainSettings =
    {
        dots: false,
        arrows: false, 
        infinite: true, 
        slidesToShow: 1, 
        slidesToScroll: 1, 
    };

    const pagingSettings = 
    {
        dots: false, 
        arrows: false, 
        centerMode: true, 
        slidesToShow: 3, 
        swipeToSlide: true, 
        focusOnSelect: true, 
    };

    const onClickPrev = useCallback((ref) => () => ref.current.slickPrev(), []); 
    const onClickNext = useCallback((ref) => () => ref.current.slickNext(), []);

    const [cate1, setCate1] = useState(true);
    const [cate2, setCate2] = useState(false);
    const [cate3, setCate3] = useState(false);
    const [cate4, setCate4] = useState(false);
    const [cate5, setCate5] = useState(false);


    var cate = document.getElementsByClassName('cate');
    const categoryClick = (e) => {
        for (var i= 0; i<cate.length ; i++) {
            cate[i].style.fontSize = "13px";
            cate[i].style.color = "gray";
            cate[i].style.fontWeight = "normal";
        }
        e.target.style.fontSize = "15px";
        e.target.style.color = "black";
        e.target.style.fontWeight = "bold";
    }
    return (
        <>
            <Header/>
            <Wrapper>
            <Category>
                <ul>
                    <li className="cate" id="first" onClick={categoryClick}>내부</li>
                    <li className="cate" onClick={categoryClick}>스터디카페</li>
                    <li className="cate" onClick={categoryClick}>스터디룸</li>
                    <li className="cate" onClick={categoryClick}>카페존</li>
                    <li className="cate" onClick={categoryClick}>기타</li>
                </ul>
            </Category>
            <ImgWrap>
            <MainSlide>
            <MainImg>
            <Slick ref={mainSlickRef} asNavFor={pagingSlick} {...mainSettings}>
            <img src={a1}/>
            <img src={a2}/>
            <img src={a3}/>
            <img src={a4}/>
            <img src={a5}/>
            </Slick>
            </MainImg>
            <PrevButton onClick={onClickPrev(mainSlickRef)}>이전</PrevButton>
            <NextButton onClick={onClickNext(mainSlickRef)}>후</NextButton>
            </MainSlide>
            <SubImgsSlide>
            <Slick ref={pagingSlickRef} asNavFor={mainSlick} {...pagingSettings}>
            <SubImg src={a1}/>
            <SubImg src={a2}/>
            <SubImg src={a3}/>
            <SubImg src={a4}/>
            <SubImg src={a5}/>
            </Slick>
            </SubImgsSlide>
            </ImgWrap>
            </Wrapper>
            <Footer/>
        </>
    );
}

export default Space;