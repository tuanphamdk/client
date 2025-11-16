// //import axios library
// import axios from "axios";

// // define backend API endpoint (URL)
// // const backendUrl = "http://localhost:3000/api/vocabs/"
// const backendUrl = "https://gereng.onrender.com/api/vocabs"
// // const backendCloud = "https://mybackend.com"

// // declare function to call API
// export const viewAllVocabs = async()=>{
//     try{
//         const response = await axios.get(backendUrl);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }

// export const getAllVocabById = async(id)=>{
//     try{
//         const response = await axios.get(backendUrl + id);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }

// export const createNewVocab = async(payload)=>{
//     try{
//         const response = await axios.post(backendUrl, payload);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }

// export const deleteAllVocab = async()=>{
//     try{
//         const response = await axios.delete(backendUrl);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }

// export const updateVocab = async(id,word)=>{
//     try{
//         const response = await axios.put(backendUrl + id, word);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }

// export const deleteVocabById = async(id)=>{
//     try{
//         const response = await axios.delete(backendUrl + id);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }


// export const searchVocabByName = async(keyword)=>{
//     try{
//         const response = await axios.get(backendUrl + keyword);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }

// export const sortAsc = async()=>{
//     try{
//         const response = await axios.get(backendUrl);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }

// export const sortDesc = async()=>{
//     try{
//         const response = await axios.get(backendUrl);
//         return response.data;
//     } catch(err){
//         console.error(err);
//         return null;
//     }
// }

// // export const addNewWord = async (word) =>{
// //     try{
// //         const response = await axios.post(backendUrl, word);
// //         return response.data;
// //     } catch(err){
// //         console.error(err);
// //         return null;
// //     }
// // }


// // export const editWord = async(id,word) =>{
// //     try{
// //         const response = await axios.put(backendUrl + id,word);
// //         return response.data;
// //     }
// //     catch(err){
// //         console.error(err);
// //         return null;
// //     }
// // }

import axios from "axios";

// Base API URL
const backendUrl = "https://gereng.onrender.com/api";

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

// Search vocab by name
export const searchVocabByName = async (keyword) => {
  try {
    const response = await axios.get(`${backendUrl}/vocabs/search/${keyword}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Sort ascending
export const sortAsc = async () => {
  try {
    const response = await axios.get(`${backendUrl}/vocabs?sort=asc`);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Sort descending
export const sortDesc = async () => {
  try {
    const response = await axios.get(`${backendUrl}/vocabs?sort=desc`);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
