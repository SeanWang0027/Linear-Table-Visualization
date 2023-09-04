/**
 * 问题描述中的循环链表节点结构类
 * @param {num} id 仅作为画图的参考
 * @param {any} data 节点数据data
 * @param {DoubleNode} prev 上一个链表节点
 * @param {DoubleNode} next 下一个链表节点
 */
class DoubleNode{
	constructor(id,data,prev = null, next = null) {
		this.id = id
		this.data = data;
        this.prev = prev
		this.next = next;
	}
}

/**
 * 链表类
 */
class DoubleTable{
	constructor() {
		this.head = new DoubleNode(0, 'head', null,null); // 链表头节点
		this.length = 0; // 链表长度（节点数量）
		this.log=''// 操作记录
	}

	/**
	 * 生成链表
	 * @param {any} data 添加节点的data数据
	 * @returns 新节点对象
	 */
	initialize(length) {
		this.length = length;
		for(let j = 1;j<=this.length;++j){
			const newNode = new DoubleNode(j,0,this.head,this.head.next);
            if(this.head.next){
                this.head.next.prev = newNode
            }
			this.head.next = newNode;
		}
		return this.head
	}

	/**
	 * 查找节点
	 * @param {number} data  用户输入查找的data
	 */
	findNode(data){
		var node_ptr = this.head.next
		var count = 1
		while(node_ptr!=null){
			if(node_ptr.data==data){
				this.log+='\n\nIndex:'+count 
				return node_ptr.id
			}
			count += 1
			node_ptr = node_ptr.next
		}
		this.log+='\n\nElement Not Found'
		return 0
	}

	/**
	 * 修改节点
	 * @param {number} id 用户输入，链表直观第几个，不是链表的id
	 * @param {number} data 用户输入的数据
	 */
	modifyNode(id,data){
		if(id>this.length || id <= 0){
			this.log+='\n\nInvalid Index:' + id + ' Input!'
			return 0
		}
		else{
			this.log+='\n\nIndex：'+ id + ' Modified Successfully'
		}
		var node_ptr = this.head.next
		var count = 1
		while(count!=id){
			node_ptr = node_ptr.next
			count += 1
		}node_ptr
		node_ptr.data = data
		return node_ptr.id
	}

	/**
	 * 删除节点
	 * @param {number} id 用户输入，链表直观第几个，不是链表的id
	 */

	deleteNode(id){
		if(id>this.length || id <= 0){
			this.log+='\n\nInvalid Index:' + id + ' Input!'
			return
		}
		else{
			this.log+='\n\nIndex：'+ id + ' Deleted Successfully'
		}
		var node_ptr = this.head
		var count = 1
		while(count!=id){
			node_ptr = node_ptr.next;
			count += 1
		}
		if(node_ptr.next.next){
			node_ptr.next.next.prev = node_ptr
		}
		this.length--
		node_ptr.next = node_ptr.next.next;
	}

	/**
	 * 插入节点
	 * @param {number} data 用户输入
	 * @param {number} id 用户可输入，默认头节点插入 
	 */
	addNode(data,id=0){
		if(id>this.length || id < 0){
			this.log+='\n\nInvalid Index:' + id + ' Input!'
			return 0
		}
		else{
			this.log+='\n\nIndex：'+ id + ' Inserted Successfully'
		}
		this.length++
		var node_ptr = this.head
		var count = 0
		while(count!=id){
			node_ptr = node_ptr.next;
			count += 1
		}
		const newNode = new DoubleNode(this.length,data,node_ptr,node_ptr.next);
		if(newNode.next){
			newNode.next.prev = newNode
		}
		node_ptr.next = newNode
		return this.length
	}

	/**
	 * 用于展示链表结构
	 * @param {number} id 操作的节点id，用于标红
	 * @returns 遍历生成的数组和DOT格式字符串
	 */
	show(id = 0,is_default=true) {
		// 本质就是按照DOT格式拼接字符串
		console.log(id)
		if(this.length){
			if(is_default){
				id = this.head.next.id
			}
		}
		console.log(id)
		let DOT = ''
		for (let ln = this.head; ln; ln = ln.next){
			if(ln===this.head){
				DOT += 'node' + (ln.id) + '[' + (ln.id == id ? 'color="red",' : '') + 'label=\"' + 'head\"];\n';
				if(ln.next){
					DOT += "\"node" + (ln.id) + "\" -> \"node" + (ln.next.id) + "\";\n";
					DOT += "\"node" + (ln.next.id) + "\" -> \"node" + (ln.id) + "\";\n";
				}
				continue
			}
			DOT += 'node' + (ln.id) + '[' + (ln.id === id ? 'color="red",' : '') + 'label=\"' + 'data=' + ln.data  + '\"];\n';
			if (ln.next){
				DOT += "\"node" + (ln.id) + "\" -> \"node" + (ln.next.id) + "\";\n";
				DOT += "\"node" + (ln.next.id) + "\" -> \"node" + (ln.id) + "\";\n";
			}
		}
		// DOT += '}\n';
		console.log(DOT)
		return { DOT }
	}

	/**
	 * 将链表转为DOT格式用于显示图片
	 * @param {number} id 调用该函数时操作的id，用于标红
	 * @returns 生成的DOT格式字符串
	 */
	toDOT(id=0,is_default = true) {
		// return this.table.show().DOT;
		return 'digraph g {\nsplines="line";\nnode [shape = record, height = .1];\n' +  this.show(id,is_default).DOT + '}\n';
	}
}

