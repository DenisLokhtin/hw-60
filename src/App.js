import {useEffect, useState} from "react";
import InputForm from "./components/inputForm/inputForm";
import Post from "./components/post/Post";
import axios from "axios";
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [authorInput, setAuthorInput] = useState("");
    const [textInput, setTextInput] = useState("");

    const changeAuthorInputValue = (value) => {
        setAuthorInput(value);
    };

    const changeTextInputValue = (value) => {
        setTextInput(value);
    };

    useEffect(() => {
        let lastDate = '';

    }, [page]);

    return (
        <div className="container">
            <div className="inner-container">
                <InputForm add={() => addPost}/>
                {posts.map((post, index) => {
                    return <Post key={index} author={post.author} date={post.date} text={post.data}/>
                })}
            </div>
        </div>
    );
}

export default App;
