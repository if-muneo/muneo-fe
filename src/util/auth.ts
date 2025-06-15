import api from "./axios.ts";
import { useNavigate } from 'react-router-dom';

api.interceptors.response.use(
    res => res,
    async error => {
        if (error.response?.status === 401) {
            // 인증 실패 시 로그인 페이지로 리다이렉트
            const navigate = useNavigate();
            navigate('/');
        }

        return Promise.reject(error);
    }
);
