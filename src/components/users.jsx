
import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import MakeUser from "./user";
import PropTypes from "prop-types";

const MakeUsers = ({ users, onHandleDelete, onHandleToggleBookmark }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIngex) => {
        setCurrentPage(pageIngex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {count > 0 && (
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
                        {userCrop.map((user) => (
                            <MakeUser
                                key={user._id}
                                {...user}
                                onHandleToggleBookmark1={onHandleToggleBookmark}
                                onHandleDelete1={onHandleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            )}

            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};

export default MakeUsers;
MakeUsers.propTypes = {
    users: PropTypes.array.isRequired,
    onHandleDelete: PropTypes.func.isRequired,
    onHandleToggleBookmark: PropTypes.func.isRequired
};
