import axios from 'axios';

// API 요청을 할 Clinet 생성 및 응답해줄 BackEnd url 정의
export const apiClient = axios.create({
    baseURL: 'http://10.100.203.39',
    // baseURL: 'http://localhost',
});

export const signInApi = async (formData) => {
    try {
        const response = await apiClient.post(`/members/signIn`, formData);
        return response;
    } catch (error) {
        return error;
    }
};

// 게시글 등록 api 정의
export const postArticle = async (formData) => {
    const response = await apiClient
        .post(`/article/new`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 멀티파트 파일을 보내야해서 따로 헤더 설정을 한 후 보내기
            },
        })
        .then((response) => {
            // const responseBody = response.data;
            // const { code } = responseBody;
            return response;
        })
        .catch((error) => {
            // const responseBody = error.response.data;
            // const { code } = responseBody;
            return error;
        });
    return response;
};

// 게시글 리스트 조회 api 정의
export const getArticleListToFindFriend = async () => {
    const response = await apiClient
        .get(`/article/findFriend-list`)
        .then((response) => {
            const responseBody = response.data;
            return responseBody;
        })
        .catch((error) => {
            return error;
        });
    return response;
};

// 게시글 리스트 조회 api 정의(메인페이지용 상위 9개)
export const getArticleListToMain = async () => {
    const response = await apiClient
        .get(`/article/main-list`)
        .then((response) => {
            const responseBody = response.data;
            return responseBody;
        })
        .catch((error) => {
            return error;
        });
    return response;
};

// 게시글 상세보기 api 정의
export const getArticleDetails = async (articleId) => {
    const response = await apiClient
        .get(`/article/${articleId}`)
        .then((response) => {
            const responseBody = response.data;
            return responseBody;
        })
        .catch((error) => {
            return error;
        });
    return response;
};

// 게시글 댓글작성 api 정의
export const postArticleReply = async (articleId, data) => {
    const response = await apiClient
        .post(`/article/${articleId}/reply`, data)
        .then((response) => {
            const responseBody = response.data;
            return responseBody;
        })
        .catch((error) => {
            return error;
        });
    return response;
};

// 게시글 댓글조회 api 정의
export const getArticleReplyList = async (articleId) => {
    const response = await apiClient
        .get(`/article/${articleId}/reply`)
        .then((response) => {
            const responseBody = response.data;
            return responseBody;
        })
        .catch((error) => {
            return error;
        });
    return response;
};
