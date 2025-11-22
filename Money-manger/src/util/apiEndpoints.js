export const BASE_URL = "http://localhost:8080/api/v1.0";

export const API_ENDPOINT ={
    LOGIN :"/profile/login",
    REGISTER: "/profile/register",

    GET_USER_INFO : "/profile/public",

    GET_ALL_CATEGORIES : "/categories",
    SAVE_CATEGORIES : "/categories/save",

    GET_ALL_INCOME: "/income",
    CREATE_INCOME: "/income/add",
    DELETE_INCOME: "/income/",

    GET_ALL_EXPENSE: "/expense",
    CREATE_EXPENSE: "/expense/add",
    DELETE_EXPENSE: "/expense/",
}