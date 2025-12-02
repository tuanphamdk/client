
import axios from "axios";



// export const backendUrl = "http://localhost:3000/api";
export const backendUrl = 'https://server-zk3w.onrender.com/api';

    axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



// Get all vocabs
export const viewAllVocabs = async () => {
  try {
    const response = await axios.get(`${backendUrl}/vocabs`);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  } 
};

// Get vocab by ID
export const getAllVocabById = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}/vocabs/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Create vocab
export const createNewVocab = async (payload) => {
  try {
    const response = await axios.post(`${backendUrl}/vocabs`, payload);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Delete all vocabs
export const deleteAllVocab = async () => {
  try {
    const response = await axios.delete(`${backendUrl}/vocabs`);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Update vocab
export const updateVocab = async (id, word) => {
  try {
    const response = await axios.put(`${backendUrl}/vocabs/${id}`, word);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Delete vocab by ID
export const deleteVocabById = async (id) => {
  try {
    const response = await axios.delete(`${backendUrl}/vocabs/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/login`, { email, password });
    return response.data; // { token, user }
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Register
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/register`, { username, email, password });
    return { data: response.data }; 
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      return { error: err.response.data.error };
    }
    return { error: "Unknown error occurred." };
  }
};

export const testVocab = async (mode = "english-to-german", limit = 5) => {
  try {
    const response = await axios.get(`${backendUrl}/vocabs/test-vocab`, {
      params: { mode, limit },
    });
    return response.data; // { requested, returned, mode, vocabs: [...] }
  } catch (err) {
    console.error(err);


    if (err.response?.data?.error) {
      return { error: err.response.data.error };
    }

    return { error: "Failed to load test words. Please try again later." };
  }
};



export const testMultipleChoice = async (mode = "english-to-german", limit = 5) => {
  try {
    const response = await axios.get(`${backendUrl}/vocabs/test-mcq`, {
      params: { mode, limit },
    });
    return response.data;
  } catch (err) {
    console.error(err);


    if (err.response && err.response.data && err.response.data.error) {
      return { error: err.response.data.error };
    }

    return { error: "Cannot start test. Please try again later." };
  }
};




