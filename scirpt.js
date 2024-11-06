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
        if (array.length === 1) {
            return new Node(array[0])
        }
        if (array.length === 0) {
            return null
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
            if (currentNode === null) {
                return 'not found'
            }
        }
        return 'duplicate'
    }
    
    deleteItem(value) {
        let current = this.root
        let previous = null
        while (value != current.data) {
            //left
            if (value < current.data) {
                previous = current
                current = current.left
            }
            //right
            if (value > current.data) {
                previous = current
                current = current.right
            }
            if (current === null) {
                return 'not found'
            }
        }
        //leaf
        if (current.left === null && current.right === null) {
            if (previous.right.data === value) {
                return previous.right = null
            }
            return previous.left = null
        }
    
        //one child
        //replace it with child
        //its parent points to its child
        if (current.left !== null && current.right === null) {
            if (previous.right === value) {
                return previous.right = current.left
            }
            return previous.left = current.left
        }

        if (current.right !== null && current.left === null) {
            if (previous.right === value) {
                return previous.right = current.right
            }
            return previous.left = current.right
        }
    
        //two children
        //replace with next biggest
        //far left of its right subtree
        //go right once then left as much as possible
        let smallestNode = current.right
        previous = null
        while (smallestNode.left !== null) {
            previous = smallestNode
            smallestNode = smallestNode.left
        }
        current.data = smallestNode.data
        previous.left = smallestNode.right
        return smallestNode = null
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

prettyPrint(test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))

test.insert('2')
prettyPrint(test.root)
test.deleteItem('3')
prettyPrint(test.root)