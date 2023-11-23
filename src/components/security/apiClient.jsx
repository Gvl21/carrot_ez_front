import axios from 'axios';

// API 요청을 할 Clinet 생성 및 응답해줄 BackEnd url 정의
export const apiClient = axios.create({
    baseURL: 'http://10.100.203.39',
});

export const signInApi = async (formData) => {
    try {
        const response = await apiClient.post(`/members/signIn`, formData);
        return response;
    } catch (error) {
        return error;
    }
};
