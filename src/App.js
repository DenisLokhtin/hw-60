import {useEffect, useState} from "react";
import InputForm from "./components/inputForm/inputForm";
import Post from "./components/post/Post";
import axios from "axios";
import './App.css';

function App() {
    const url = 'http://146.185.154.90:8000/messages';
    let interval = null

    const [posts, setPosts] = useState([]);
    const [authorInput, setAuthorInput] = useState('');
    const [textInput, setTextInput] = useState('');

    const changeAuthorInputValue = (value) => {
        setAuthorInput(value);
    };

    const changeTextInputValue = (value) => {
        console.log(value)
        setTextInput(value);
    };

    const getData = async () => {
        try {
            let data = null
            if (posts.length > 0) {
                data = await axios.get(url + '?datetime=' + posts[posts.length - 1]['datetime'])
            } else {
                data = await axios.get(url)
            }
            if (data.data.length > 0) {
                setPosts((prev) => {
                    return [...prev].concat(data.data);
                })
                clearInterval(interval)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        interval = setInterval(async () => {
            await getData()
        }, 3000);
    }, [posts]);

    const addPost = async () => {
        console.log('click')
        const data = new URLSearchParams();
        data.set('message', textInput);
        data.set('author', authorInput);
        await axios.post(url, data);
        setTextInput('')
    }

    return (
        <div className="container">
            <div className="inner-container">
                <InputForm
                    setText={(value) => changeTextInputValue(value)}
                    setAuthor={(value) => changeAuthorInputValue(value)}
                    add={() => addPost()}
                    text={textInput}
                    author={authorInput}
                />
                {posts.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            author={post.author}
                            date={post.datetime}
                            text={post.message}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
