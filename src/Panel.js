import React from 'react';
import 'bulma/css/bulma.css';
import './Panel.css';

function Panel(props) {
    return (
        <nav className="panel">
            <div className="panel-block">
                <p className="control has-icons-left">
                    <input className="input" type="text" placeholder="Search" />
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                </p>
            </div>

            {props.list.map((each, index) => (

                < a className="panel-block" >

                    <span key={index}>{each}</span>
                    <div className="buttons-container">
                        <button className="button is-primary" onClick={() => props.addSurvey(each, props.whichEmployeeIsSelected)}>Add</button>
                        {props.hasRemoveButton ?
                            <button className="button is-primary" onClick={() => props.removeSurvey(each, props.whichEmployeeIsSelected)}>Remove</button> :
                            ""}
                    </div>

                </a>
            )
            )}



        </nav >
    )
}

export default Panel;