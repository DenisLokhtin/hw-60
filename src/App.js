import {useEffect, useState} from "react";
import InputForm from "./components/inputForm/inputForm";
import Post from "./components/post/Post";
import axios from "axios";
import './App.css';

function App() {
    const url = 'http://146.185.154.90:8000/messages';
    let interval = null

    const [posts, setPosts] = useState([]);
    const [authorInput, setAuthorInput] = useState("");
    const [textInput, setTextInput] = useState("");

    const changeAuthorInputValue = (value) => {
        setAuthorInput(value);
    };

    const changeTextInputValue = (value) => {
        setTextInput(value);
    };

    const getData = async () => {
        try {
            let data = null
            console.log('posts', posts)
            if (posts.length > 0) {
                console.log('> 0')
                data = await axios.get(url + '?datetime=' + posts[posts.length - 1]['datetime'])
            } else {
                data = await axios.get(url)
            }
            console.log(data)
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

    console.log('state' + posts[0])


    return (
        <div className="container">
            <div className="inner-container">
                <InputForm
                    setText={() => changeTextInputValue()}
                    setAuthor={() => changeAuthorInputValue()}
                    // add={() => addPost()}
                />
                {posts.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            author={post.author}
                            date={post.date}
                            text={post.text}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
