import axios from 'axios';

export const createRule = async (ruleData) => {
  const response = await axios.post('http://localhost:5000/api/rules/create', ruleData);
  return response.data;
};

export const evaluateRule = async (evaluationData) => {
  const response = await axios.post('http://localhost:5000/api/rules/evaluate', evaluationData);
  return response.data;
};
