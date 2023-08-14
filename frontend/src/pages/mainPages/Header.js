import React, {useState} from "react";
import HeaderNavbar from "./HeaderNavbar";
import {BsCart2, BsFillPersonFill} from "react-icons/bs";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Header(props) {

    const [bookSearch, setBookSearch] = useState([]);
    const [search, setSearch] = useState("");

    const navi = useNavigate();

    // 검색값 변경
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const onClickSearch = (e) => {
        axios.get("http://localhost:8080/search", {
            params: {
                SearchType: "Title",
                SearchValue: search
            }
        })
            .then(res => {
                setBookSearch(res.data);
                console.log(res.data)
                navi("/view", {state: {value: search, data: res.data.item, total: res.data.totalResults}});
            })
            .catch(err => {
                alert("검색 실패")
            })
    }

    return (
        <header>
            <div className={'container my-3'}>
                <div className="d-flex align-items-end justify-content-between">
                    <a href={"/"}>
                        <img className={"headerLogo"} src="/image/logo.png" alt="home"/>
                    </a>

                    <div className={"d-flex align-items-end ps-5"}>
                        <input type={'search'} className={'form-control'} onChange={onChangeSearch}/>
                        <button type={'submit'} className={'btn search'} onClick={onClickSearch}>검색</button>
                    </div>

                    {(sessionStorage.getItem("id") &&
                        <div className={"d-flex align-items-center loginBtns"}>
                            <span>{sessionStorage.getItem("name")}님 안녕하세요 </span>
                            <button type={'button'} className={'btn'}><BsCart2 className={"my-auto"}/></button>
                            <button type={'button'} className={'btn'}><BsFillPersonFill/></button>
                        </div>) ||
                        (<div>
                        <a href="/Login" className={"text-decoration-none text-black"}>로그인</a>
                    </div>)}


                </div>
            </div>
            <HeaderNavbar/>
        </header>
    )
}

export default Header;