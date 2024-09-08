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
