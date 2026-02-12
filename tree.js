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
}

export { Tree }