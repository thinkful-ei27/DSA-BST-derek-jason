'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }

    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    }

    else if (key < this.key && this.left) {
      return this.left.find(key);
    }

    else if (key > this.key && this.right) {
      return this.right.find(key);
    }

    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }

      else if (this.left) {
        this._replaceWith(this.left);
      }

      else if (this.right) {
        this._replaceWith(this.right);
      }

      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }

  }
}


// this function has a quadratic time complexity with O(n^2)
function findHeight(tree, counter = 0) {
  if (tree === null) {
    return counter;
  }
  else {
    let leftCounter = findHeight(tree.left, counter + 1);
    let rightCounter = findHeight(tree.right, counter + 1);
    return leftCounter >= rightCounter ? leftCounter : rightCounter;
  }
}

/*
    3
   / \
   1  4
  / \ / \
 6  9 2  5
 /
 7 
*/
const nonSearchTree = {
  key: 3,
  left: {
    key: 1,
    left: {
      key: 6,
      left: {
        key: 7,
        left: null,
        right: null
      },
      right: null
    },
    right: {
      key: 9,
      left: null,
      right: null
    }
  },
  right: {
    key: 4,
    left: {
      key: 2,
      left: null,
      right: null
    },
    right: {
      key: 5,
      left: null,
      right: null
    }
  }
};

const isBst = biTree => {
  if (biTree.left === null && biTree.right === null) {
    return true;
  }
  if (biTree.left === null) {
    return biTree.key < biTree.right.key ? isBst(biTree.right) : false;
  } else if (biTree.right === null) {
    return biTree.left.key < biTree.key ? isBst(biTree.left) : false;
  } else if (biTree.left.key < biTree.key < biTree.right.key) {
    return isBst(biTree.left) && isBst(biTree.right);
  } else {
    return false;
  }
};

function createSortedArray(tree, sortedArray = []) {
  if (tree.left === null && tree.right === null) {
    return [tree.key];
  }
  else if (tree.right === null) {
    return [...sortedArray, ...createSortedArray(tree.left), tree.key];
  }
  else if (tree.left === null) {
    return [...sortedArray, tree.key, ...createSortedArray(tree.right)];
  }
  else {
    return [...sortedArray, ...createSortedArray(tree.left), tree.key, ...createSortedArray(tree.right)];
  }
}

const thirdLargest = tree => {
  const sortedArr = createSortedArray(tree);
  return sortedArr[sortedArr.length - 3];
};

const findMinandMaxDistance = (tree, distance = 0, minDistance = 0, maxDistance = 0) => {
  if (tree.left === null && tree.right === null) {
    if (distance > maxDistance) { maxDistance = distance; }
    if (distance < minDistance) { minDistance = distance; }
    return { minDistance, maxDistance };
  }
  else if (tree.right === null) {
    return isBalanced(tree.left, distance + 1, minDistance, maxDistance);
  }
  else if (tree.left === null) {
    return isBalanced(tree.right, distance + 1, minDistance, maxDistance);
  }
  else {
    return isBalanced(tree.left, distance + 1, minDistance, maxDistance);
  }
};
const isBalanced = (tree, distance = 0, minDistance = 0, maxDistance = 0) => {
};

function main() {
  const BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);
  // console.log(BST);
  // console.log(findHeight(BST));
  //console.log(isBst(BST));
  //console.log(isBst(nonSearchTree));
  console.log(thirdLargest(BST));
}

main();