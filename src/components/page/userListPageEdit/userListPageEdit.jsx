import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/table/backButton";

import { useQualities } from "../../../hooks/useQualities";
import { useProffesions } from "../../../hooks/useProffesion";
import { useAuth } from "../../../hooks/useAuth";

const UserListPageEdit = () => {
    const history = useHistory();

    const { currentUser, updateUserData } = useAuth();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const { qualities } = useQualities();

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const { professions } = useProffesions();
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

        await updateUserData({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });

        history.push(`/users/${currentUser._id}`);
    };

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
};
export default UserListPageEdit;
