import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserListPageEdit = () => {
    const { userId } = useParams();

    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    console.log(data);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        API.users.getById(userId).then((user) => {
            setData((prev) => ({
                ...prev,
                ...user,
                qualities: user.qualities.map((qual) => ({
                    label: qual.name,
                    value: qual._id
                })),
                profession: user.profession._id
            }));
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
    }, []);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.users.update(userId, {
            ...data,
            professions: getProfessionById(data.profession),
            qualities: getQualities(data.qualities)
        });
    };

    if (data._id && qualities && professions) {
        return (
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
                    options={qualities}
                    defaultValue={data.qualities}
                    onChange={handleChange}
                    name="qualities"
                    label="Выберите ваши качества"
                />
                <SelectField
                    label="Выбери свою профессию"
                    name="profession"
                    options={professions}
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
        );
    } else {
        return <h1>Loading</h1>;
    }
};
export default UserListPageEdit;
