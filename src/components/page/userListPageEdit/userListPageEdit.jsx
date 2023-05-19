import React, { useEffect, useState } from "react";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/table/backButton";
import { useSelector } from "react-redux";

import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/quailities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
const UserListPageEdit = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const { currentUser, updateUserData } = useAuth();

    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        await updateUserData({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });

        history.push(`/users/${currentUser._id}`);
    };
    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        return getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
    };
    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    if (data) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                options={qualitiesList}
                                defaultValue={data.qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                name="profession"
                                options={professionsList}
                                value={data.profession}
                                onChange={handleChange}
                                defaultOption="выбирите"
                            />
                            <RadioField
                                name="sex"
                                label="Выберите ваш пол"
                                value={data.sex}
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                onChange={handleChange}
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                // disabled={!isValid}
                            >
                                Изменить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return "Loading...";
    }
};
export default UserListPageEdit;
