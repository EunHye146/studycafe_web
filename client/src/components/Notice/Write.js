import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import User from '../common/User';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router';
import axios from 'axios';

const Spacer = styled.div`
  height : 3.5rem;
`;

const Wrapper = styled.div`
    margin-top : 80px;
    margin-bottom : 45px;
    text-align : center;
`;

const PostWrap = styled.div`
    display : inline-block;
    width : 80%;
    text-align : left;
`;

const Title = styled.div`
    font-size : 23px;
    font-weight : bold;
    margin-bottom : 10px;
    padding-left : 5%;
    padding-right : 5%;
    input {
        margin-left : 10px;
        width : 50%;
        font-size : 25px;
        padding : 5px;
        outline:none;
    }
`;

const Hr = styled.hr`
    color : lightgray;
    border-width : 1px 0px 0px 0px;
    opacity : 0.5;
    margin-bottom : 70px;
`;

const Body = styled.div`
    width : 100%;
    padding-left : 5%;
    padding-right : 5%;
    margin-bottom : 10px;
    textarea {
        margin-top : 10px;
        width : 90%;
        height : 400px;
        font-size : 20px;
        padding : 20px;
        outline:none;
    }
`;

const Button = styled.input`
    float : right;
    width : 70px;
    border : none;
    padding : 10px;
    font-size : 13px;
    background : gray;
    cursor : pointer;
    border-radius : 5px;
    &:hover {
        background : lightgray;
    }
`;

function Write({ history }) {
    const user = window.sessionStorage.getItem('id');

    if (!user) {
        alert('관리자 권한 페이지입니다.');
        history.push('/notice');
    }

    const upload = () => {
        const title = document.getElementById('title').value;
        const bodycont = document.getElementById('bodycont').value;

        let body = {
            title: title,
            body: bodycont
        }

        axios
        .post('/post', body)
        .catch(err => console.log(err));
        
        alert('게시물이 작성되었습니다.');
        history.push('/notice');
    }
    return (
        <>
            <Header/>
            <User/>
            <Spacer/>
            <Fade delay={500}>
            <Wrapper>
            <PostWrap>
                <form onSubmit={upload}>
                    <Title>제목 <input type="text" id="title" required/></Title>
                    <Hr/>
                    <Body>내용<br/><textarea id="bodycont" required/></Body>
                    <Button type="submit" value="올리기"/>
                </form>
            </PostWrap>
            </Wrapper>
            </Fade>
            <Footer/>
        </>
    );
}

export default withRouter(Write);