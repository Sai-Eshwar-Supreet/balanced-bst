import { Tree } from './tree.js'

const tree = new Tree();

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const root = tree.buildTree(arr);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

console.log(tree.includes(6345));
console.log(tree.includes(-2));

tree.insert(10);
tree.insert(1);
tree.insert(1000000);
tree.insert(8000);
tree.insert(0);

prettyPrint(root);
tree.deleteItem(8);

console.log("====================================")
prettyPrint(root);

// console.log("==================================== Level order traversal")
// tree.levelOrderForEach(data => console.log(data));

// console.log("==================================== In order traversal")
// tree.inOrderForEach(data => console.log(data));

// console.log("==================================== Pre order traversal")
// tree.preOrderForEach(data => console.log(data));

// console.log("==================================== Post order traversal")
// tree.postOrderForEach(data => console.log(data));

console.log("Height of 324: ", tree.height(324));
console.log("Depth of 324: ", tree.depth(324));