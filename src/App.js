import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//! Componentes
import style from "./App.module.css";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav.jsx";
import About from "./components/About/About.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";
import Favorites from "./components/Favorites/Favorites";

function App() {
    const [characters, setCharacters] = useState([]);
    const [access, setAccess] = useState(false);
    //! Form
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function login(userData) {
        const { email, password } = userData;
        const URL = "http://localhost:3001/rickandmorty/login/";
        axios(URL + `?email=${email}&password=${password}`)
            .then(({ data }) => {
                const { access } = data;
                setAccess(data);
                access && navigate("/home");
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    useEffect(() => {
        !access && navigate("/");
    }, [access, navigate]);

    async function onSearch(id, setId) {
        try {
            const { data } = await axios(
                `http://localhost:3001/rickandmorty/character/${id}`
            );
            if (data.name && !characters.some((obj) => obj.id === data.id)) {
                setCharacters((oldChars) => [...oldChars, data]);
                setId("");
            } else {
                window.alert("¡Ya existen personajes con este ID!");
            }
        } catch (err) {
            window.alert(err.message);
        }
        // axios(`http://localhost:3001/rickandmorty/character/${id}`)
        //     .then(({ data }) => {
        //         if (
        //             data.name &&
        //             !characters.some((obj) => obj.id === data.id)
        //         ) {
        //             setCharacters((oldChars) => [...oldChars, data]);
        //             setId("");
        //         } else {
        //             window.alert("¡Ya existen personajes con este ID!");
        //         }
        //     })
        //     .catch((err) => {
        //         window.alert(err.message);
        //     });
    }

    const onClose = (id) => {
        setCharacters(characters.filter((c) => c.id !== parseInt(id)));
    };

    return (
        <div className={style.App}>
            {pathname !== "/" && <Nav onSearch={onSearch} />}
            <Routes>
                <Route path="/" element={<Form login={login} />} />

                <Route
                    path="/home"
                    element={
                        <Cards onClose={onClose} characters={characters} />
                    }
                />

                <Route path="/about" element={<About />} />

                <Route path="/detail/:id" element={<Detail />} />
                <Route
                    path="/favorites"
                    element={<Favorites onClose={onClose} />}
                />
            </Routes>
        </div>
    );
}

export default App;
