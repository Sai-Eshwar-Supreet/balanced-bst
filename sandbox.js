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

prettyPrint(root);
tree.deleteItem(8);

console.log("====================================")
prettyPrint(root);