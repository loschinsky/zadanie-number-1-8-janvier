import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();
export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(error);
        }
    }, [error]);
    useEffect(() => {
        getQualitiesList();
    }, []);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getQuality(id) {
        return qualities.find((p) => p._id === id);
    }
    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();

            setQualities(content);
            console.log("надо глянуть в каком виде они приходят", content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {!isLoading ? children : <h1>Qualities Loading...</h1>}
        </QualityContext.Provider>
    );
};
QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
