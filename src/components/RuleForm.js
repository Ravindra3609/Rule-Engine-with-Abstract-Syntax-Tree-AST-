import React, { useState } from 'react';
import { createRule, evaluateRule } from '../api/ruleApi';

const RuleForm = () => {
  const [rule, setRule] = useState({ name: '', ruleString: '' });
  const [evaluationData, setEvaluationData] = useState({ ruleId: '', data: '' });
  const [result, setResult] = useState(null);

  const handleCreateRule = async () => {
    const response = await createRule(rule);
    console.log(response);
  };

  const handleEvaluateRule = async () => {
    const response = await evaluateRule(evaluationData);
    setResult(response.result);
  };

  return (
    <div>
      <h2>Create Rule</h2>
      <input 
        type="text" 
        placeholder="Rule Name" 
        value={rule.name} 
        onChange={e => setRule({ ...rule, name: e.target.value })} 
      />
      <textarea 
        placeholder="Rule String" 
        value={rule.ruleString} 
        onChange={e => setRule({ ...rule, ruleString: e.target.value })} 
      />
      <button onClick={handleCreateRule}>Create Rule</button>

      <h2>Evaluate Rule</h2>
      <input 
        type="text" 
        placeholder="Rule ID" 
        value={evaluationData.ruleId} 
        onChange={e => setEvaluationData({ ...evaluationData, ruleId: e.target.value })} 
      />
      <textarea 
        placeholder="Evaluation Data (JSON)" 
        value={evaluationData.data} 
        onChange={e => setEvaluationData({ ...evaluationData, data: e.target.value })} 
      />
      <button onClick={handleEvaluateRule}>Evaluate Rule</button>

      {result !== null && <p>Result: {result ? 'True' : 'False'}</p>}
    </div>
  );
};

export default RuleForm;
