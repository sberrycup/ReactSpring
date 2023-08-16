import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";

function BoardUpdate(props) {

    const board = useParams();
    const [boardPk] = useState(board.boardPk);
    const [title, setTitle] = useState('');
    const [name, setName] = useState(sessionStorage.getItem("name"))
    const [id, setId] = useState(sessionStorage.getItem("id"))
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const navi = useNavigate();

    const onClickCategory = (e) => {
        setCategory(e.target.value);
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onClickList = (e) => {
        navi("/board")
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/board/${boardPk}`)
            .then(res => {
                setTitle(res.data.boardTitle);
                setName(res.data.boardWriterName);
                setContent(res.data.boardContent);
                setCategory(res.data.boardCategory);
            })
            .catch(err => {
                alert("BoardUpdate Loading Err")
            })
    }, [])

    // 수정
    const Update = () => {
        axios.put(`http://localhost:8080/board/${boardPk}`, null, {
            boardPk: boardPk,
        })
            .then(res => {
                navi('/board')
            })
    }

    return (
        <div>
            <Header />
            <div className={'container my-5'}>
                <div className={'row'}>
                    <div className={'col-sm-10 mx-auto'}>
                        <div>
                            <button type={'button'} className={'btn'} value={'일반'} onClick={onClickCategory}>일반</button>
                            <button type={'button'} className={'btn'} value={'독후감'} onClick={onClickCategory}>독후감</button>
                            <button type={'button'} className={'btn'} value={'공지/이벤트'} onClick={onClickCategory}>공지/이벤트</button>
                        </div>
                        <div className={'my-3'}>
                            <input type={'text'} className={'form-control'} value={title} onChange={onChangeTitle} placeholder={'글 제목을 입력하세요'}/>
                            <input type={'hidden'} className={'form-control'} value={name}/>
                            <input type={'hidden'} className={'form-control'} value={id}/>
                        </div>
                        <div className={'my-3'}>
                            <textarea className={'form-control'} rows={10} value={content} onChange={onChangeContent} placeholder={'글 내용을 입력하세요'}></textarea>
                        </div>
                        <div className={'d-flex'}>
                            <button type={'button'} className={'btn'} onClick={onClickList}>목록</button>
                            <button type={'button'} className={'btn'} onClick={Update}>글등록</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BoardUpdate;