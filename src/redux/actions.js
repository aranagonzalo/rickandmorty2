import { ADD_FAV } from "./action-types";
import { REMOVE_FAV } from "./action-types";
import { FILTER } from "./action-types";
import { ORDER } from "./action-types";
import { CLOSE_FAV } from "./action-types";
import axios from "axios";

export const addFav = (character) => {
    const endpoint = "http://localhost:3001/rickandmorty/fav";
    return async (dispatch) => {
        const { data } = await axios.post(endpoint, character);
        return dispatch({
            type: ADD_FAV,
            payload: data,
        });
    };
};

export const removeFav = (id) => {
    const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
    return async (dispatch) => {
        const { data } = await axios.delete(endpoint);
        return dispatch({
            type: REMOVE_FAV,
            payload: data,
        });
    };
};

export const filterCards = (gender) => {
    return {
        type: FILTER,
        payload: gender,
    };
};

export const orderCards = (orden) => {
    return {
        type: ORDER,
        payload: orden,
    };
};

export const closeFavorites = (id) => {
    return {
        type: CLOSE_FAV,
        payload: id,
    };
};
