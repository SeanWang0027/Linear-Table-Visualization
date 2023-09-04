/**
 * 给定一个区间，生成区间内所有整数的数组
 * @param {number} l 区间起点
 * @param {number} r 区间终点
 * @returns 生成的序列数组
 */
function getRange(l, r) {
    let arr = [];
    for (let i = l; i < r; ++i){
        arr.push(i);
    }
    return arr
}

/**
 * 随机生成一个具有树结构的线性表，其节点为题目要求的结构
 * @param {number} N 节点数范围
 * @param {number} MIN 节点数最小值
 * @returns 生成的线性表
 */
function getRandomTable(type,N = 9, MIN = 3) {
    const length = Math.floor(Math.random() * N + MIN) // 随机节点数量
    let ret;
    if(type==='SingleList'){
        ret = new LinearTable()
    }
    else if(type=='CircularList'){
        ret = new CircularTable()
    }
    else{
        ret = new DoubleTable()
    }
    ret.initialize(length)
    return ret
}

/**
 * 获得id所在标签的value值
 * @param {string} id 标签的id
 * @returns value值
 */
 function getValue(id) {
    return document.getElementById(id).value;
}

/**
 * 初始化SVG缩放
 */
 function initSVGZoom() {
	const svgElement = document.getElementById('tree-canvas').childNodes[6];
    svgPanZoom(svgElement, {controlIconsEnabled: true});
};

/**
 * @param {number} value 本次操作的值
 */
function drawList (value,is_default=true) {
    const vizData = list.toDOT(value,is_default);
    const treeCanvas = document.getElementById('tree-canvas');
    treeCanvas.innerHTML = Viz(vizData, "svg");
    initSVGZoom();
};

/**
 * 展示操作序列
 */
 function showInstrs() {
    const textArea = document.getElementById('text-operations');
     textArea.value = list.log;
     textArea.scrollTop = textArea.scrollHeight;
};

/**
 * 展示树的图像和操作的内容
 * @param {number} value 本次操作的值，用于标红
 */
function displayList(value,is_default = true) {
    // 调用2个函数完成相应功能
    drawList(value,is_default)
    showInstrs()
}

/**
 * 获取select下拉框的id内容，从而选择表的类型
 * 
 */
function getSelectValue() {
    const select = document.getElementById('table');
    type = select.value
    return type
}

/**
 * 调整按钮的状态
 * @param {string} id 按钮的ID
 * @param {boolean} disable 按钮是否禁用
 */
function toggleButton(id,disable) {
    document.getElementById(id).disabled = disable;
};

/**
 * 解锁按钮
 */
function enableButtons() {
    toggleButton('btn-edit-add', false);
    toggleButton('btn-edit-modify', false);
    toggleButton('btn-edit-del', false);
    toggleButton('btn-edit-find', false);
};

/**
 * 绑定初始化按钮的函数，用于初始化线性表和树
 * @param {boolean} isRand 是否初始化随机线性表
 */
function btnListInit(isRand) {
    type = getSelectValue()
    if(type==='select'){
        alert('Please Choose the Type of Your List!')
        return
    }
    if(type==='SingleList'){
        if (isRand) {
            list =getRandomTable(type)
        }
        else{
            list = new LinearTable()
        }
    }
    else if (type=='CircularList'){
        if (isRand) {
            list =getRandomTable(type)
        }
        else{
            list = new CircularTable()
        }
    }
    else{
        if (isRand) {
            list =getRandomTable(type)
        }
        else{
            list = new DoubleTable()
        }
    }
    // 初始化log
    if (isRand) {
        list.log+='Successfully Luanched A Random List!'
    } else {
        list.log+='Successfully Luanched A Blank List!'
    }
    displayList();
    enableButtons(); // 解锁按钮
};

/**
 * 绑定添加按钮的相关函数
 */
function btnListInsert() {
    const id = parseInt(getValue('input-id')), data = getValue('input-data');
    const newId = list.addNode(data,id); // 注意标红的id是新生成的id
    displayList(newId,false);
};

/**
 * 绑定修改按钮的相关函数
 */
 function btnListModify() {
    const id = parseInt(getValue('input-id')), data = getValue('input-data');
    red = list.modifyNode(id, data);
    displayList(red,false);
};

/**
 * 绑定删除按钮的相关函数
 */
function btnListDelete() {
    const id = parseInt(getValue('input-id')); // delete时不需要获取data
    list.deleteNode(id);
    displayList(0,false);
};

/**
 * 绑定查找按钮的相关函数
 */
function btnListFind() {
    const data = parseInt(getValue('input-data')); // delete时不需要获取data
    red = list.findNode(data);
    displayList(red,false);
};