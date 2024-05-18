import axios from "axios";

export const getProvinces = () => {
    return axios.get("/region/provinces");
};

export const getRegencies = (provinceId) => {
    return axios.get(`/region/regencies/${provinceId}`);
};

export const getDistricts = (regencyId) => {
    return axios.get(`/region/districts/${regencyId}`);
};

export const getVillages = (districtId) => {
    return axios.get(`/region/villages/${districtId}`);
};
