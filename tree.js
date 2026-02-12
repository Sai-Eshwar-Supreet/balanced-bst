import { Node } from "./node.js";

class Tree{
    #root;

    constructor(array){
        array = [...array].sort((a, b) => a - b);

        array = this.#removeDuplicates(array);

        this.#root = this.#buildTreeRec(array, 0, array.length - 1);
    }

    #removeDuplicates(array){
        const newArr = [];
        let prev = null;
        for(let val of array){
            if(val === prev){
                continue;
            }
            newArr.push(val);
            prev = val;
        }

        return newArr;
    }

    #buildTreeRec(array, start, end){

        if(start > end) return null;

        const mid = start + Math.floor((end - start) / 2);

        const root = new Node(array[mid]);

        root.leftNode = this.#buildTreeRec(array, start, mid - 1);
        root.rightNode = this.#buildTreeRec(array, mid + 1, end);

        return root;
    }

    #getNode(node, value){
        if(!node) return undefined;

        if(node.data === value) return node;
        if(value < node.data) return this.#getNode(node.leftNode, value);
        return this.#getNode(node.rightNode, value);
    }

    includes(value){
        return !!this.#getNode(this.#root, value);
    }

    #insertRec(node, value){
        if(node === null){
            node = new Node(value);
        }
        else if(value < node.data){
            node.leftNode = this.#insertRec(node.leftNode, value);
        }
        else if(value > node.data){
            node.rightNode = this.#insertRec(node.rightNode, value);
        }

        return node;
    }

    insert(value){
        this.#root = this.#insertRec(this.#root, value);
    }

    #getSuccessor(node){
        while(node !== null && node.leftNode !== null){
            node = node.leftNode;
        }

        return node;
    }

    #deleteItemRec(node, value){
        if(node === null){
            return node;
        }

        if(value < node.data){
            node.leftNode = this.#deleteItemRec(node.leftNode, value);
        }
        else if( value > node.data){
            node.rightNode = this.#deleteItemRec(node.rightNode, value);
        }
        else{
            if(node.leftNode === null){
                return node.rightNode;
            }
            else if(node.rightNode === null){
                return node.leftNode;
            }
            else{
                const successor = this.#getSuccessor(node.rightNode);
    
                node.data = successor.data;
                node.rightNode = this.#deleteItemRec(node.rightNode, successor.data);
            }
        }
        return node;
    }

    deleteItem(value){
        this.#root = this.#deleteItemRec(this.#root, value);
    }

    levelOrderForEach(callback){
        if(!callback){
            throw Error("Callback is required");
        }

        if(!this.#root) return;

        let queue = [];
        let currentIndex = 0;

        queue.push(this.#root);

        while(currentIndex < queue.length){
            const node = queue[currentIndex];
            currentIndex ++;

            callback(node.data);

            if(!!node.leftNode) queue.push(node.leftNode)
            if(!!node.rightNode) queue.push(node.rightNode)
        }
    }

    #inOrderForEachRec(node, callback){
        if(!callback){
            throw Error("Callback is required");
        }
        if(node === null) return;

        this.#inOrderForEachRec(node.leftNode, callback);
        callback(node.data);
        this.#inOrderForEachRec(node.rightNode, callback);
    }

    inOrderForEach(callback){
        this.#inOrderForEachRec(this.#root, callback);
    }

    #preOrderForEachRec(node, callback){
        if(!callback){
            throw Error("Callback is required");
        }
        if(node === null) return;

        callback(node.data);
        this.#preOrderForEachRec(node.leftNode, callback);
        this.#preOrderForEachRec(node.rightNode, callback);
    }

    preOrderForEach(callback){
        this.#preOrderForEachRec(this.#root, callback);
    }

    #postOrderForEachRec(node, callback){
        if(!callback){
            throw Error("Callback is required");
        }
        if(node === null) return;

        this.#postOrderForEachRec(node.leftNode, callback);
        this.#postOrderForEachRec(node.rightNode, callback);
        callback(node.data);
    }

    postOrderForEach(callback){
        this.#postOrderForEachRec(this.#root, callback);
    }

    #getHeightRec(node){
        if(node === null) return -1;
        const leftHeight =  1 + this.#getHeightRec(node.leftNode); 
        const rightHeight = 1 + this.#getHeightRec(node.rightNode); 

        return Math.max(leftHeight, rightHeight);
    }

    height(value){
        const node = this.#getNode(this.#root, value);

        if(!node) return undefined;

        return this.#getHeightRec(node);
    }

    depth(value){
        let depth = 0;
        let temp = this.#root;


        while(temp != null){
            if(temp.data === value) return depth;
            depth++;

            if(value < temp.data) temp = temp.leftNode;
            else if(value > temp.data) temp = temp.rightNode;
        }

        return undefined;
    }

    #isBalancedRec(node){
        if(node === null) return {balanced: true, height: -1};

        const left = this.#isBalancedRec(node.leftNode);
        const right = this.#isBalancedRec(node.rightNode);

        const balanced = right.balanced && left.balanced && (Math.abs(left.height - right.height) <= 1)
        const height = 1 + Math.max(left.height, right.height);

        return {balanced, height};
    }

    isBalanced(){
        return this.#isBalancedRec(this.#root).balanced;
    }

    rebalance(){
        const arr = [];
        this.inOrderForEach(data => arr.push(data));
        this.#root = this.#buildTreeRec(arr, 0, arr.length - 1);
    }
}

export { Tree }