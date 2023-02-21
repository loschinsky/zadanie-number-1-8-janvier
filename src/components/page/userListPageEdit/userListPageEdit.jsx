import React, { useEffect, useState } from "react";
import api from "../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserListPageEdit = () => {
    const [data, setData] = useState({
        name: "",
        e-mail: "",
        profession: "",
        sex: "male",
        qualities: [],
        
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="name"
            />
            <TextField
                label="Электронная почта"
                name="e-mail" 
            />
            <SelectField
                label="Выбери свою профессию"
                name="profession"
            />
            <RadioField
                name="sex"
                label="Выберите ваш пол"
            />
            <MultiSelectField
                name="qualities"
                label="Выберите ваши качества"
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Изменить
            </button>
        </form>
    );
};

export default UserListPageEdit;
