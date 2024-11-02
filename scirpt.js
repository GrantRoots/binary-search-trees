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
        this.root = buildTree()
    }
}

function buildTree(array) {
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
    
    console.log(sortedArray[Math.floor(sortedArray.length / 2)])

    //get middle value of left
    let leftHalf = sortedArray.slice(0, Math.floor(sortedArray.length / 2))
    //get middle value of right repeat until done
    let rightHalf = sortedArray.slice(Math.floor(sortedArray.length / 2) + 1, sortedArray.length)
    //call recursively
    middleValue.left = buildTree(leftHalf)
    middleValue.right = buildTree(rightHalf)

    return middleValue
}

function insert(value) {
    //goes to leaf
}

function deleteItem(value) {
    //leaf

    //one child

    //two children
    //replace with next biggest
}

function find(value) {

}

function levelOrder(callback) {

}

function inOrder(callback) {

}

function preOrder(callback) {

}

function postOrder(callback) {

}

function height(node) {

}

function depth(node) {

}

function isBalanced() {

}

function rebalance() {

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

prettyPrint(buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
console.log(testArr.sort(function(a, b) {
    return a - b
}))