const crypto = require("crypto");
const digest = str =>
  crypto
    .createHash("md5")
    .update(str)
    .digest("hex");

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions;

  if (node.context && node.context.repository) {
    if (node.context.repository.readme) {
      const textNode = {
        id: `${node.id}-MarkdownBody`,
        parent: node.id,
        internal: {
          type: `GithubMarkdownRemark`,
          mediaType: "text/markdown",
          content: node.context.repository.readme.text,
          contentDigest: digest(node.context.repository.readme.text)
        }
      };

      createNode(textNode);

      createNodeField({
        node,
        name: "markdownBody___NODE",
        value: textNode.id
      });
    }
  }
  return;
};
