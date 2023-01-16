
import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import MakeUser from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const MakeUsers = ({ users: allUsers, onHandleToggleBookmark, onHandleDelete }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handlePageChange = (pageIngex) => {
        setCurrentPage(pageIngex);
    };

    const handleProffesionSelect = item => {
        setSelectedProf(item);
    };
    const filteredUsers = selectedProf && selectedProf._id
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items = {professions}
                        onItemSelect ={handleProffesionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick = {clearFilter}
                    >
                Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default MakeUsers;
MakeUsers.propTypes = {
    users: PropTypes.array.isRequired,
    onHandleDelete: PropTypes.func.isRequired,
    onHandleToggleBookmark: PropTypes.func.isRequired
};
