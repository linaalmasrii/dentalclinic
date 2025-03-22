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

// Registration Function
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }

        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};

// Fetch Profile Function
export const getProfile = async () => {
    return await apiRequest("auth/profile", "GET", null, true);
};

// Fetch Patient History Function
export const getPatientHistory = async (email) => {
    return await apiRequest(`patient-history/${email}`, "GET", null, true);
};

// Create Appointment Function
export const createAppointment = async (appointmentData) => {
    return await apiRequest("appointments", "POST", appointmentData, true);
};

// Fetch Doctors Function
export const getDoctors = async () => {
    return await apiRequest("doctors", "GET", null, true);
};

const API_URL = "http://localhost:5133/api/auth";

export const loginUser = async (loginData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};

export const register = async (userData) => {
    // Registration logic
};
