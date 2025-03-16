const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5133/api';

export const apiRequest = async (endpoint, method = 'GET', data = null, auth = false) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (auth) {
        const token = localStorage.getItem("token");
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};

// Login Function
export const login = async (email, password) => {
    const response = await apiRequest("auth/login", "POST", { email, password });
    if (response.token) {
        localStorage.setItem("token", response.token);
        return response.user;
    }
    throw new Error("Invalid credentials");
};

// Fetch Profile Function
export const getProfile = async () => {
    return await apiRequest("auth/profile", "GET", null, true);
};
