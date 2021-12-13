import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [parent, setParent] = useState("");
    const [data, setData] = useState({
        path: "",
        files: [],
    });

    useEffect(() => {
        fetch("http://localhost:8000")
            .then((res) => res.json())
            .then(
                (result) => {
                    setParent("");
                    setData(result);
                },
                (error) => {}
            );
    }, []);

    const clickHandler = (event) => {
        event.preventDefault();
        fetch(
            "http://localhost:8000/?path=" + event.target.attributes.href.value
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    let linkArr = result.path.split("/");
                    linkArr.pop();
                    setParent(linkArr.join("/"));
                    setData(result);
                },
                (error) => {}
            );
    };

    return (
        <div className="file-manager">
            <div>
                <a href={parent} onClick={clickHandler}>
                    LEVEL UP
                </a>
            </div>
            <div className="current-level">
                current: {data.path === "" ? "/" : data.path}
            </div>
            <ul className="folder-list">
                {data.files.map((e) => {
                    if (e.dir) {
                        return (
                            <li key={e.name}>
                                <a
                                    href={data.path + "/" + e.name}
                                    onClick={clickHandler}
                                >
                                    {e.name.toUpperCase()}
                                </a>
                            </li>
                        );
                    } else {
                        return <li key={e.name}>{e.name}</li>;
                    }
                })}
            </ul>
        </div>
    );
}

export default App;
