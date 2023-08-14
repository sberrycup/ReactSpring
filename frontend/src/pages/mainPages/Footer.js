import React from "react";

function Footer(props) {

    return (
        <div className={'border-top mt-5 py-5 px-5 bg-secondary bg-opacity-10 text-secondary d-flex justify-content-between'}>
            <div className={"mx-5 text-start"}>
                <span>Yoon Jang Ho (Team Leader)</span><br/>
                <span>Kim Dong Wook</span><br/>
                <span>Park Jun Seong</span><br/>
                <span>Park Jun Ho</span><br/>
            </div>

            <div className={"mx-5 text-end"}>
                <span>Busan IT Fullstack 505 Final Project</span><br/>
                <span>Made by Team1</span><br/><br/>
                <span>2023.07.31 - 2023.08.22</span><br/>
            </div>
        </div>
    )
}

export default Footer;