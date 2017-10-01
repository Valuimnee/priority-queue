class Node {
	constructor(data, priority) {
		this.data=data;
		this.priority=priority;
		this.parent=this.left=this.right=null;
	}

	appendChild(node) {
        if (!this.left){
            node.parent=this;
            this.left = node;
        } else if (!this.right) {
            node.parent = this;
            this.right = node;
        }
    }


	removeChild(node) {
		if(node===this.left){
			node.parent=null;
			this.left=null;
		}else if(node===this.right){
			node.parent=null;
			this.right=null;
		}else throw Error("Parameter is not  child of current node!");
	}

	remove() {
		if(this.parent) {
			const self = this;
            this.parent.removeChild(self);
		}
	}

	swapWithParent() {
		if(!this.parent)
			return;
		var pp=this.parent.parent;
        var p=this.parent;
        if(p.parent)
			if(p.parent.left===p){
				p.parent.left=this;
			}else{
				p.parent.right=this;
			}

		this.parent.parent=this;
		var lp=p.left;
		var rp=p.right;
		var l=this.left;
		var r=this.right;

        if(lp===this){
			this.left=p;
			if(rp)
				rp.parent=this;
			this.right=rp;
		}else {
            this.right=p;
            if(lp)
            	lp.parent=this;
            this.left=lp;
        }
        p.left=l;
        if(l)
        	l.parent=p;
        p.right=r;
        if(r)
        	r.parent=p;

        this.parent=pp;
	}
}

module.exports = Node;
