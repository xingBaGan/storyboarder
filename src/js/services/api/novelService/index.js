import { post } from '../index';

export const sendData = async (content) => {
  try {
    const response = await post('/split_text_into_chunks', { content });
    return response.data.chunks;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const generateImage = async (prompt) => {
  try {
    const response = await post('/generate_image', { prompt });
    return response.data.base64_image;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};
const fastApiUrl = 'http://127.0.0.1:8000';
export const generateBoardJson = async (boardData) => {
  try {
    const response = await post(`${fastApiUrl}/generate_novel_description`, { content: boardData });
    return response.data.novel_description;
  } catch (error) {
    console.error('Error generating board JSON:', error);
    throw error;
  }
};
