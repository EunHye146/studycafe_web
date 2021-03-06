import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import emailjs from 'emailjs-com';
import styled from 'styled-components';

require('dotenv').config();


let service_id = process.env.REACT_APP_SERVICE_ID;
let template_id = process.env.REACT_APP_TEMPLATE_ID;
let user_id = process.env.REACT_APP_USER_ID;

const Background = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    z-index : 999;
    background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
    position : fixed;
    top : 50%;
    left : 50%;
    width : 650px;
    transform : translate(-50%,-50%);
    border-radius : 7px;
    background : #fafafa;        
    border : 2px solid gray;
    box-shadow : 5px 5px 5px #7d7d7d;
    @media screen and (max-width: 768px) {
        width : 100%;
        height : 100%;
        padding-top : 5rem;
    }
`;

const Title = styled.div`
    font-size : 30px;
    font-weight : bold;
    padding-top : 3rem;
    text-align : center;
`;

const Close = styled.div`
    font-size : 70px;
    transform: rotate(45deg);
    cursor : pointer;
    position : absolute;
    top : 0.1rem;
    right : 1.1rem;
    font-weight : 300;
    @media screen and (max-width: 768px) {
        top : 5.5rem;
    }
`;

const Form = styled.form`
    text-align : center;
    padding : 50px;
`;

const Table = styled.table`
    display : inline-block;
    text-align : left;
    input {
        width : 200px;
    }
    td {
        padding : 5px;
    }
`;

const Button = styled.input`
    width : 120px;
    height : 40px;
    background : black;
    border : none;
    border-radius : 5px;
    color : white;
    margin-top : 20px;
    cursor : pointer;
    &:hover {
        background : gray;
    }
`;

const ByteInfo = styled.span`
    font-size : 12px;
    margin-left : 5px;
`;

function JoinModal( {closeModal, history}) {
    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = '';
          window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
      }, []);
      const form = useRef();

      const sendEmail = (e) => {
        e.preventDefault();
        form.current.button.disabled = true;
        emailjs.sendForm(service_id, template_id, form.current, user_id)
          .then((result) => {
              alert('???????????? ????????? ?????????????????????.');
              closeModal();
          }, (error) => {
              alert('????????? ?????????????????????. ????????? ??????????????????.');
          });
          
      };
      // Byte ??? ?????? ??????
    
    const checkByte = (e) => {
        var str = e.target.value;
        var str_len = e.target.value.length;

        var rbyte = 0;
        var rlen = 0;
        var one_char = "";
        var str2 = "";


        for (var i=0; i<str_len; i++) {
            one_char = str.charAt(i);
            if(escape(one_char).length > 4) {
                rbyte += 2;                                         //??????2Byte
            }else{
                rbyte++;                                            //?????? ??? ????????? 1Byte
            }
            if(rbyte <= 1000) {
                rlen = i+1;                                          //return??? ????????? ??????
            }
        }
        if (rbyte > 1000) {
            // alert("?????? "+(maxByte/2)+"??? / ?????? "+maxByte+"?????? ?????? ????????? ??? ????????????.");
            alert("??????????????? ?????? " + 1000 + "byte??? ????????? ??? ????????????.")
            str2 = str.substr(0,rlen);                                  //????????? ?????????
            e.target.value = str2;
        }
        else {
            document.getElementById('byteInfo').innerText = rbyte;
        }
    }
    return (
        <>
            <Background>
                <Modal>
                <Title>????????????</Title><Close onClick={closeModal}>+</Close>
                <Form ref={form} onSubmit={sendEmail}>
                    <Table>
                        <tr>
                            <td><label>??????</label></td>
                            <td><input type="text" name="name" required/></td>
                        </tr>
                        <tr>
                            <td><label>?????????</label></td>
                            <td><input type="tel" name="tel" placeholder="010-" required/></td>
                        </tr>
                        <tr>
                            <td><label>????????????</label></td>
                            <td><input type="text" name="area" placeholder="?????? ?????? ??????"/></td>
                        </tr>
                        <tr>
                            <td><label>????????????</label></td>
                            <td><textarea name="message" cols="30" rows="5" onKeyUp={checkByte}/><ByteInfo><span id="byteInfo">0</span>/1000bytes</ByteInfo></td>
                        </tr>
                    </Table><br/>
                    <Button type="submit" name="button" value="????????????" />
                </Form>
                </Modal>
            </Background>
        </>
    );
}

export default withRouter(JoinModal);

