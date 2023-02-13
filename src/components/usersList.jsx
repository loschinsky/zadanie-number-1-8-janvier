import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
const UsersList = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [searchStatus, setSearchStatus] = useState("");
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookmark = (userId) => {
        const newUsers = users.map((user) =>
            user._id === userId ? { ...user, bookmark: !user.bookmark } : user
        );
        setUsers(newUsers);
    };
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
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleProffesionSelect = (item) => {
        setSearchStatus("");
        setSelectedProf(item);
    };
    const handleChange = ({ target }) => {
        setSelectedProf(undefined);
        setSearchStatus(target.value);
    };
    if (users) {
        const filteredUsers =
            selectedProf && selectedProf._id
                ? users.filter(
                      (user) =>
                          JSON.stringify(user.profession._id) ===
                          JSON.stringify(selectedProf._id)
                  )
                : searchStatus
                ? users.filter((user) =>
                      user.name
                          .toLowerCase()
                          .includes(searchStatus.toLowerCase())
                  )
                : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSearchStatus("");
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProffesionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <div>
                        <input
                            className="w-100"
                            placeholder="Search..."
                            value={searchStatus}
                            type="text"
                            onChange={handleChange}
                            onClick={clearFilter} 
                        ></input>
                    </div>
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
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
    }
    return "Загрузка...";
};

export default UsersList;
UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    onHandleDelete: PropTypes.func.isRequired,
    onHandleToggleBookmark: PropTypes.func.isRequired
};
