import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./qualitie";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/quailities";

const Qualities = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(useSelector(getQualitiesLoadingStatus));

    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            {qualitiesList.map((item) => (
                <Quality key={item._id} {...item} />
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
