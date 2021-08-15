import React from 'react';
import './inputForm.css'

const InputForm = (props) => (
    <div className="forms">
        <input className="authorForm" type="text" placeholder="author"/>
        <input className="textForm" type="text" placeholder="text"/>
        <button className="sendBtn">Send</button>
    </div>
);

export default InputForm;