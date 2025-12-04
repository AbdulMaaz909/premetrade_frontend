import axios from 'axios';

// Prefer NEXT_PUBLIC_BASE_URL (exposed to browser in Next.js). Fall back to BASE_URL or literal.
const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

//creating an axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

/** Interceptor for requests sent from the application: 
retrieve the Access Token from localStorage and 
add it to every API request made using the axios instance.
*/
axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token') || '';

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function onFulfilled(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function onRejected(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // If token is invalid/expired, force logout and redirect to login
        try {
            const response = error?.response;
            const message = response?.data?.message || "";

            if (response && response.status === 401) {
                const lower = String(message).toLowerCase();
                const indicatesInvalidToken =
                    lower.includes("invalid") || lower.includes("expired") || lower.includes("token");

                if (indicatesInvalidToken && typeof window !== "undefined") {
                    // clear token and redirect to login page
                    try {
                        localStorage.removeItem("token");
                    } catch (e) {
                        // ignore
                    }
                    // navigate to app root (login)
                    window.location.href = "/";
                }
            }
        } catch (e) {
            // ignore interceptor errors
            console.error("axios interceptor error:", e);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;