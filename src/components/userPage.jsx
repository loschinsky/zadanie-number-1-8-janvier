import api from "../api";
import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MakeQuality from "./qualitie";
const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const handleReturn = () => {
        history.push("/users");
    };
    useEffect(() => {
        api.users.getById(userId).then((usersData) => setUser(usersData));
    }, []);
    if (user) {
        return (
            <>
                <div>
                    <div>{user.name}</div>
                    <div>{`Профессия :${user.profession.name}`}</div>
                    <div>{`rate ${user.rate}`}</div>
                    <div>
                        {user.qualities.map((q) => {
                            return (
                                <MakeQuality key={q._id} color={q.color} name={q.name}/>
                            );
                        })}
                    </div>
                    <div> {`completedMeetings ${user.completedMeetings}`}</div>
                </div>
                <button
                    onClick={() => {
                        handleReturn();
                    }}
                >
                    Вернуться к списку чуваков
                </button>
            </>
        );
    }
    return "Загрузка";
};

export default UserPage;
UserPage.propTypes = {
    userId: PropTypes.string
};
