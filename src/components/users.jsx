import React, { useState } from "react";
import api from "../api"
import MakeUser from "./user";

const MakeUsers = () => {
    
    return (
        <>
            <h2>
                <span
                    className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
                >
                    {users.length > 0
                        ? `${users.length + " " + renderPhrase(users.length)} с тобой сегодня`
                        : "Никто с тобой не тусанет"}
                </span>
            </h2>

            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <MakeUser/>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default MakeUsers;
