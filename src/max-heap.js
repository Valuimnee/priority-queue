const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root=null;
		this.parentNodes=[];
		this.empty=true;
		this.lenght=0;
	}

	push(data, priority) {
		var node=new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(!this.root)
			return;
		var detached=this.detachRoot();
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		--this.lenght;
		if(this.lenght===0){
			this.empty=true;
		}
		return detached.data;
	}

	detachRoot() {
		var ret=this.root;
		if(this.parentNodes[0]===this.root)
			this.parentNodes.shift();
		this.root=null;
		return ret;
	}


	restoreRootFromLastInsertedNode(detached) {
		if(this.parentNodes.length===0)
			return;
		this.root=this.parentNodes[this.parentNodes.length-1];
		this.parentNodes.pop();
		if(this.root.parent!==detached){
			var index=this.parentNodes.indexOf(this.root.parent);
			if(index===-1)
				this.parentNodes.unshift(this.root.parent);
		}
		this.root.remove();
		if(!(detached.left&&detached.right)){
			this.parentNodes.unshift(this.root);
		}
		if(detached.left){
			this.root.left=detached.left;
			detached.left.parent=this.root;
		}
        if(detached.right){
            this.root.right=detached.right;
            detached.right.parent=this.root;
        }
	}

	size() {
		return this.lenght;
	}

	isEmpty() {
		return this.empty;
	}

	clear() {
		this.root=null;
		this.parentNodes=[];
		this.empty=true;
		this.lenght=0;
	}

	insertNode(node) {
		if(!this.root){
			this.root=node;
			this.empty=false;
		}else{
			this.parentNodes[0].appendChild(node);
			if(this.parentNodes[0].left&&this.parentNodes[0].right)
				this.parentNodes.shift();
		}
        this.parentNodes.push(node);
        ++this.lenght;
    }

	shiftNodeUp(node) {
		if(node.parent&&(node.priority>node.parent.priority)){
			var index=this.parentNodes.indexOf(node.parent);
			var nodeIndex=this.parentNodes.indexOf(node);
			if(~index)
				this.parentNodes[index]=node;
			if(~nodeIndex)
				this.parentNodes[nodeIndex]=node.parent;
			if(this.root===node.parent)
				this.root=node;
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if(!node)
			return;
		var doSwap=false;
		var l=true;
		//var swapNode=null;
		if(node.left&&node.right) {
            var maxPriority = node.left.priority>= node.right.priority?node.left.priority: node.right.priority;
            if (node.priority <= maxPriority) {
            	doSwap=true;
				if (node.left.priority === maxPriority){}

					//swapNode = node.left;
				else l=false;
					//swapNode = node.right;
        	}
		}else if(node.left&&(node.priority<=node.left.priority)){
			doSwap=true;
			//swapNode=node.left;
		}else if(node.right&&(node.priority<=node.right.priority)){
            doSwap=true;
            l=false;
            //swapNode=node.right;
        }
        if(doSwap)
        if(l){
            var index=this.parentNodes.indexOf(node.left);
            var nodeIndex=this.parentNodes.indexOf(node);
            if(~index)
                this.parentNodes[index]=node;
            if(~nodeIndex)
                this.parentNodes[nodeIndex]=node.left;
            if(this.root===node)
                this.root=node.left;
            node.left.swapWithParent();
            this.shiftNodeDown(node);
        }else{
            var index=this.parentNodes.indexOf(node.right);
            var nodeIndex=this.parentNodes.indexOf(node);
            if(~index)
                this.parentNodes[index]=node;
            if(~nodeIndex)
                this.parentNodes[nodeIndex]=node.right;
            if(this.root===node)
                this.root=node.right;
            node.right.swapWithParent();
            this.shiftNodeDown(node);
        }
	}
}

module.exports = MaxHeap;
