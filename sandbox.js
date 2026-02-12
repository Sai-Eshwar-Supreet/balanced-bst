import { Tree } from './tree.js'

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
console.log("Is Balance: ", tree.isBalanced());

console.log(tree.includes(6345));
console.log(tree.includes(-2));

tree.insert(10);
tree.insert(1);
tree.insert(1000000);
tree.insert(8000);
tree.insert(0);
tree.insert(2);
tree.insert(2);
tree.insert(-1);

tree.prettyPrint();
tree.deleteItem(8);

console.log("Is Balance: ", tree.isBalanced());

tree.rebalance();
console.log("====================================")
tree.prettyPrint();

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