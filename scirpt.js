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
                previous.right = null
                return
            }
            previous.left = null
            return
        }
    
        //one child
        //replace it with child
        //its parent points to its child
        if (current.left !== null && current.right === null) {
            if (previous.right === value) {
                previous.right = current.left
                return
            }
            previous.left = current.left
            return
        }

        if (current.right !== null && current.left === null) {
            if (previous.right === value) {
                previous.right = current.right
                return
            }
            previous.left = current.right
            return
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
        smallestNode = null
        return
    }
    
    find(value) {
        let current = this.root
        while (value !== current.data) {
            //left
            if (value < current.data) {
                current = current.left
            }
            //right
            if (value > current.data) {
                current = current.right
            }
            if (current === null) {
                return 'not found'
            }
        }
        return current
    }
    
    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw Error('Callback Required')
        }
        let queue = []
        let current = this.root
        queue.push(current)
        while (queue.length > 0) {
            //call callback on queue[0]?
            callback(queue[0].data)
            if (current.left) {
                queue.push(current.left)
            }
            if (current.right) {
                queue.push(current.right)
            }
            queue.shift()
            current = queue[0]
        }
    }
    
    inOrder(callback) {
        //does recursion even work
        if (typeof callback !== 'function') {
            throw Error('Callback Required')
        }
        //left - root - right
        let current = this.root
        function recursive(current) {
            if (current.left !== null) {
                recursive(current.left)
            }
            callback(current.data)
            if (current.right !== null) {
                recursive(current.right)
            }
        }
        recursive(current)
    }
    
    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw Error('Callback Required')
        }
        //root - left - right
        let current = this.root
        function recursive(current) {
            callback(current.data)
            if (current.left !== null) {
                recursive(current.left)
            }
            if (current.right !== null) {
                recursive(current.right)
            }
        }
        recursive(current)
    }
    
    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw Error('Callback Required')
        }
        //left - right - root
        let current = this.root
        function recursive(current) {
            if (current.left !== null) {
                recursive(current.left)
            }
            if (current.right !== null) {
                recursive(current.right)
            }
            callback(current.data)
        }
        recursive(current)
    }
    
    height(node) {
        let current = this.find(node)
        function checkSides (current) {
            if (current === null) {
                return 0
            }
            let leftHeight = checkSides(current.left)
            let rightHeight = checkSides(current.right)

            return Math.max(leftHeight, rightHeight) + 1
        }
        return checkSides(current)
    }
    
    depth(node) {
        let current = this.find(node)
        let depthRoot = this.root
        let depth = 0
        while (depthRoot.data !== current.data) {
            //if root is more go left
            if (depthRoot.data > current.data) {
                depthRoot = depthRoot.left
                depth++
            }
            if (depthRoot.data < current.data) {
                depthRoot = depthRoot.right
                depth++
            }
        }
        return depth
    }
    
    isBalanced() {
        let leftTree = this.root.left
        let rightTree = this.root.right
        let leftHeight = this.height(leftTree.data)
        let rightHeight = this.height(rightTree.data)

        // if height is bigger by 2 return false
        if (leftHeight > rightHeight) {
            if (leftHeight > rightHeight + 1) {
                return false
            }
        }
        if (leftHeight < rightHeight) {
            if (leftHeight + 1 < rightHeight) {
                return false
            }
        }
        return true
    }
    
    rebalance() {
        // put all node.data in array
        let allNodes = []
        function pushNodes(x) {
            allNodes.push(x)
        }
        this.inOrder(pushNodes)
        console.log(allNodes)

        //run them in buildTree and update root
        this.root = this.buildTree(allNodes)
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

// prettyPrint(test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))

//test.insert(2)
// prettyPrint(test.root)
// console.log('inserted')

// test.deleteItem(3)
prettyPrint(test.root)
// console.log('deleted')

//console.log(test.find(7), 'find')

// let testArr = []
// function testFunc(x) {
//     testArr.push(x)
//     console.log(testArr)
// }
// test.inOrder(testFunc)
// test.preOrder(testFunc)
// test.postOrder(testFunc)

//console.log(test.height(7), 'height')
//console.log(test.depth(7), 'depth')
//console.log(test.isBalanced())

test.insert(91)
test.insert(92)
test.insert(93)
test.insert(94)
test.insert(95)
test.insert(96)
console.log(prettyPrint(test.root))

console.log(test.height(8), 'height')

console.log(test.isBalanced(), 'is balanced')
test.rebalance()
console.log(prettyPrint(test.root))