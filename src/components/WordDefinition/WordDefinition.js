import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./WordDefinition.css";
import ClipLoader from "react-spinners/ClipLoader";

const WordDefinition = () => {
    const { word } = useParams();
    const navigate = useNavigate();
    const [newWord, setNewWord] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ error: false, response: null });

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((response) => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((data) => {
                setData({ error: false, response: [...data] });
                setLoading(false);
            })
            .catch(() => {
                setData({ error: true, response: [] });
                setLoading(false);
            });
    }, [word]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/${newWord}`);
    };

    const playAudio = () => {
        const audio = document.querySelector("#audio");
        audio.play();
    };

    return (
        <>
            {loading ?
                <ClipLoader
                    size={50}
                    color={"#2c304b"}
                    loading={loading}
                />
                :
                <div className="bodyDictionary">
                    <form className="searchBox" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Try it here..."
                            onChange={(e) => setNewWord(e.target.value)}
                            value={newWord}
                        />
                        <button type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </form>
                    {data.response &&
                    <div className="wordBox">
                        {!data.error ?
                            <>
                                <div className="wordTitle">
                                    <h1>{data.response[0]?.word}</h1>
                                    <span>
                                        [{data.response[0]?.phonetics[0].text}]
                                    </span>
                                    {data.response &&
                                    <audio id="audio">
                                        <source src={data.response[0].phonetics[0].audio}/>
                                    </audio>
                                    }
                                    <button onClick={playAudio}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-play-circle-fill"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="wordMeanings">
                                    <ul>
                                        {data.response[0]?.meanings.map((e) => (
                                            <li key={data.response[0]?.meanings.indexOf(e)}>
                                                    <span className="liNumber">
                                                        {data.response[0]?.meanings.indexOf(e) + 1}
                                                    </span>
                                                <div className="wordDefinition">
                                                    <em>{e.partOfSpeech}</em>{" "}
                                                    <span className="wordWord">
                                                        {e.definitions[0].definition}
                                                    </span>
                                                    <span className="wordExample">
                                                            {e.definitions[0].example}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                            :
                            <p className="errorBox">
                                Sorry pal, we couldn't find definitions for the word you were looking for
                            </p>
                        }
                    </div>
                    }
                </div>
            }
        </>
    );
};

export default WordDefinition;
