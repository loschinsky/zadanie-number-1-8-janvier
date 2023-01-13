import React from "react";
import MakeUser from "./user";

const MakeUsers = ({users, onHandleDelete, onHandleToggleBookmark}) => {
    
    return (
        <>
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
                            <MakeUser
                            key={user._id}
                            {...user}
                            onHandleToggleBookmark1={onHandleToggleBookmark}
                            onHandleDelete1={onHandleDelete}/>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default MakeUsers;
