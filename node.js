class Node{
    data;
    leftNode;
    rightNode;

    constructor(data){
        this.data = data;
        this.leftNode = this.rightNode = null;
    }
}

export { Node }