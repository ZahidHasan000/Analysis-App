import http from "../utilities/http.common";

const create = data => http.post("/add", data);

const UserDataService = {
    create
};

export default UserDataService;