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
        console.log('Making request to:', `${API_BASE_URL}/${endpoint}`);
        console.log('With options:', options);
        
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
        console.log('Response status:', response.status);
        
        // Log the raw response text
        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText} - ${responseText}`);
        }

        // Try to parse the response as JSON
        let jsonData;
        try {
            jsonData = JSON.parse(responseText);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            throw new Error('Invalid JSON response from server');
        }

        return jsonData;
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};

// Login Function
export const loginUser = async (loginData) => {
    try {
        const url = `${API_BASE_URL}/api/auth/login`;
        const requestBody = {
            email: loginData.email,
            password: loginData.password
        };
        
        console.log('Login Request:', {
            url: url,
            body: requestBody
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            throw new Error(`Login failed: ${response.statusText} (${response.status}) - ${errorText}`);
        }

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        return data;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

// Registration Function
export const registerUser = async (userData) => {
    try {
        console.log('Attempting to register with data:', userData); // Debug log

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        console.log('Registration response status:', response.status); // Debug log

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Registration error response:', errorText);
            throw new Error(`Registration failed: ${errorText}`);
        }

        const data = await response.json();
        console.log('Registration success response:', data);
        return data;
    } catch (error) {
        console.error('Registration error:', error);
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
    try {
        const userData = JSON.parse(localStorage.getItem('user'));
        
        // Format the date properly
        const formattedDate = new Date(appointmentData.date).toISOString().split('T')[0];
        
        // Enhanced appointment data structure
        const formattedData = {
            userId: userData.user.Id,
            doctorId: appointmentData.doctorId, // Now getting from selected doctor
            serviceId: appointmentData.serviceId, // Added service ID
            appointmentDate: formattedDate,
            appointmentTime: appointmentData.time,
            serviceType: appointmentData.service,
            status: "Scheduled"
        };

        console.log('Submitting appointment data:', formattedData);

        const response = await apiRequest("appointments", "POST", formattedData, true);
        
        if (response.success) {
            console.log('Appointment created successfully:', response);
            return {
                message: "Appointment has been scheduled successfully. A confirmation email will be sent shortly.",
                appointment: response.data
            };
        }
        
        return response;
    } catch (error) {
        console.error("Appointment creation error details:", error);
        throw new Error("Failed to create appointment. Please try again.");
    }
};

// Fetch Doctors Function
export const getDoctors = async () => {
    return await apiRequest("doctors", "GET", null, true);
};

//  appointment history
export const getAppointmentHistory = async (userId) => {
    try {
        const response = await apiRequest(`appointments/history/${userId}`, "GET", null, true);
        return response;
    } catch (error) {
        console.error("Failed to fetch appointment history:", error);
        throw error;
    }
};
