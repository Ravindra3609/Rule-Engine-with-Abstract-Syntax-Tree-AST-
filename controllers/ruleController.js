const Rule = require('../models/Rule');

// Helper to create AST from rule string
function parseRuleString(ruleString) {
  // Parse the string and return a Node object representing AST
  // Simplified version
  return new Rule.Node({
    type: 'operator',
    left: null,
    right: null,
    value: ruleString
  });
}

// Create a new rule
exports.createRule = async (req, res) => {
  try {
    const { name, ruleString } = req.body;
    const astRoot = parseRuleString(ruleString);

    const rule = new Rule({ name, root: astRoot });
    await rule.save();

    res.status(201).json({ success: true, rule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Evaluate rule
exports.evaluateRule = (req, res) => {
  const { ruleId, data } = req.body;

  Rule.findById(ruleId).populate('root').exec((err, rule) => {
    if (err || !rule) return res.status(404).json({ success: false, message: "Rule not found" });

    const result = evaluateAST(rule.root, data);
    res.json({ result });
  });
};

// Recursively evaluate the AST against the data
function evaluateAST(node, data) {
  if (node.type === 'operand') {
    // Evaluate the condition (e.g., "age > 30")
    return eval(`${data[node.value.key]} ${node.value.operator} ${node.value.value}`);
  } else {
    // Recursively evaluate left and right for operators
    const leftEval = evaluateAST(node.left, data);
    const rightEval = evaluateAST(node.right, data);
    if (node.value === 'AND') return leftEval && rightEval;
    if (node.value === 'OR') return leftEval || rightEval;
  }
}
