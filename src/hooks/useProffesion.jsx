import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import proffesionService from "../services/proffesion.service";
import { toast } from "react-toastify";
const ProffesionContext = React.createContext();
export const useProffesions = () => {
    return useContext(ProffesionContext);
};
export const ProffesionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        getProfessionsList();
    }, []);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }
    async function getProfessionsList() {
        try {
            const { content } = await proffesionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <ProffesionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProffesionContext.Provider>
    );
};

ProffesionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
