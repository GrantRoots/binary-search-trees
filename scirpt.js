#!/usr/bin/node

class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.array = array
        this.root = this.buildTree(array)
    }

    buildTree(array) {
        if (array.length <= 1) {
            return new Node(array[0])
        }
        let sortedArray = array.sort(function(a, b) {
            return a - b
        })
        //remove duplicates
        for (let i = 0; i < sortedArray.length; i++) {
            let current = sortedArray[i]
            let previous = sortedArray[i-1]
            if (current === previous) {
                sortedArray.splice(i, 1)
            }
        }
    
        //get middle value of array
        let middleValue = new Node(sortedArray[Math.floor(sortedArray.length / 2)])
    
        //get middle value of left
        let leftHalf = sortedArray.slice(0, Math.floor(sortedArray.length / 2))
        //get middle value of right repeat until done
        let rightHalf = sortedArray.slice(Math.floor(sortedArray.length / 2) + 1, sortedArray.length)
        //call recursively
        middleValue.left = this.buildTree(leftHalf)
        middleValue.right = this.buildTree(rightHalf)
    
        return middleValue
    }
    
    insert(value) {
        //insert duplicates?
        let currentNode = this.root
        while (value !== currentNode.data) {
            //go left
            if (value < currentNode.data) {
                if (currentNode.left === null) {
                    return currentNode.left = new Node(value)
                }
                currentNode = currentNode.left
            }
            //go right
            if (value > currentNode.data) {
                if (currentNode.right === null) {
                    return currentNode.right = new Node(value)
                }
                currentNode = currentNode.right
            }
        }
    }
    
    deleteItem(value) {
        //leaf
        if (value === root) {
    
        }
        if (value < root) {
    
        }
    
        //one child
    
    
        //two children
        //replace with next biggest
    }
    
    find(value) {
    
    }
    
    levelOrder(callback) {
    
    }
    
    inOrder(callback) {
    
    }
    
    preOrder(callback) {
    
    }
    
    postOrder(callback) {
    
    }
    
    height(node) {
    
    }
    
    depth(node) {
    
    }
    
    isBalanced() {
    
    }
    
    rebalance() {

    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

//testing

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
console.log(test.root)

prettyPrint(test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))

test.insert('2')
console.log(test.root)
prettyPrint(test.root)