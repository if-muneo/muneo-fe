import api from "./axios.ts";

// ✅ 자동 리프레시 인터셉터
api.interceptors.response.use(
    res => res,
    async error => {

        // 세션 id 확인

        return Promise.reject(error);
    }
);
