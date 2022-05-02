const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.newNode = null;
  }
  root() {
    return this.newNode;
  }
  add(data) {
    const newNode = new Node(data);
    if (this.newNode === null) this.newNode = newNode;
    else this.addNode(this.newNode, newNode);
  }
  addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode;
      else this.addNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.addNode(node.right, newNode);
    }
  }
  has(data) {
    return this.find(data) ? true : false;
  }
  find(data) {
    return findItem(this.newNode, data);
    function findItem(node, data) {
      if (!node) return null;
      if (node.data === data) return node;

      return node.data <= data
        ? findItem(node.right, data)
        : findItem(node.left, data);
    }
  }
  remove(data) {
    this.newNode = deleteNode(this.newNode, data);
    function deleteNode(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      }
      if (data > node.data) {
        node.right = deleteNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = deleteNode(node.right, minFromRight.data);
        return node;
      }
    }
  }
  min() {
    let node = this.newNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }
  max() {
    let node = this.newNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}
module.exports = {
  BinarySearchTree,
};
