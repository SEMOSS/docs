const { visit } = require('unist-util-visit');

module.exports = function remarkEnvInject() {
  return function transformer(tree) {
    visit(tree, 'text', (node) => {
      if (typeof node.value !== 'string') {
        return;
      }

      node.value = node.value.replace(/%%([A-Z0-9_]+)%%/g, (match, token) => {
        const value = process.env[token];
        return value !== undefined ? value : match;
      });
    });
  };
};
