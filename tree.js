import { Node } from "./node.js";

class Tree{
    #root;

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


    buildTree(array){
        array.sort((a, b) => a - b);

        array = this.#removeDuplicates(array);

        this.#root =  this.#buildTreeRec(array, 0, array.length - 1);

        return this.#root;
    }

    #includesRec(node, value){
        if(!node) return false;
        if(node.data === value) return true;

        return this.#includesRec(node.leftNode, value) || this.#includesRec(node.rightNode, value);
        
    }

    includes(value){
        return this.#includesRec(this.#root, value);
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
}

export { Tree }