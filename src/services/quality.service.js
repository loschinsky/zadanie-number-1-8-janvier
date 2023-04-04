import httpService from "./http.service";
const qualityEndpoint = "qual/";
const qualityService = {
    get: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    }
};

export default qualityService;
