/**
 * Created by Administrator on 2016/3/25.
 */
/*
 getClass(className) ��ȡ����
 className   ָ��������
 */
function getClass(className, range) {
    var range = range ? range : document;
    if (range.getElementsByClassName) {
        return range.getElementsByClassName(className);
    } else {
        var all = range.getElementsByTagName("*");
        var newarr = [];
        for (var i = 0; i < all.length; i++) {
            if (all[i].className == className) {
                newarr.push(all[i]);
            }
        }
        return newarr;

    }
}


//��ȡԪ���ı�
//getContent��obj,[val]��
//obj ����
//[val]����

function getContent(obj, val) {
    if (obj.textContent) {
        if (val === undefined) {
            return obj.textContent;
        } else {
            obj.textContent = val;

        }
    } else {
        if (val === undefined) {
            return obj.innerText;

        } else {
            obj.innerText = val;
        }
    }
}

//����ʽ�Ĳ���  getStyle��obj��attr�� ��ȡ��ʽ
//              obj  ָ���Ķ���
//              attr ����
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
}


/*
 ��ȡ
 #one
 .one
 div
 <div>
 ֮��ı�ǩ����
 */

function $(selecter, ranges) {
    if (typeof selecter == "string") {
        var ranges = ranges ? ranges : document;
        var first = selecter.charAt(0);
        if (first == "#") {
            return ranges.getElementById(selecter.substring(1));
        }
        else if (first == ".") {
            return getClass(selecter.substring(1), ranges);
        }
        else if (/^[a-z][a-z1]{0,10}$/.test(selecter)) {
            return ranges.getElementsByTagName(selecter);
        } else if (/^<[a-z][a-z1]{0,10}>$/.test(selecter)) {
            return document.createElement(selecter.slice(1, -1));
        }
    } else if (typeof  selecter == "function") {
        addEvent(window, "load", selecter);
    }
}


/*
 ��ȡ�������Ԫ��
 getChilds()obj,type
 obj ��Ԫ��
 type true ��ȡ��Ԫ�������Ԫ�ؽڵ����������ı�
 false ֻ��ȡԪ�������Ԫ�ؽڵ�
 */
function getChilds(obj, type) {
    var type = type ? type : false;
    var childs = obj.childNodes;
    var temp = [];

    if (type === false) {
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1) {
                temp.push(childs[i]);
            }
        }
    } else if (type === true) {
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1 || (childs[i].nodeType == 3 && !(/^\s+$/.test(childs[i].nodeValue)))) {
                temp.push(childs[i]);
            }
        }
    }
    return temp;

}


/*
 getFirst()
 */
function getFirst(obj) {
    return getChilds(obj)[0];
}

/*
 getLast()
 */
function getLast(obj) {
    return getChilds(obj)[getChilds[obj].length - 1];
}

/*
 getNum
 */
function getNum(obj, num) {
    return getChilds(obj)[num];
}


/*
 getNext(obj,type)
 obj ����
 type true ʶ����������ı�
 false �����ı�
 */
function getNext(obj, type) {
    var type = type ? type : false;
    var next = obj.nextSibling;
    if (type === false) {
        if (!next) {
            return false;
        }
        while (next.nodeType == 3 || next.nodeType == 8) {
            next = next.nextSibling;
            if (!next) {
                return false;
            }

        }
    } else if (type === true) {
        if (!next) {
            return false;
        }
        while ((next.nodeType == 3 && /^\s+$/.test(next.nodeValue)) || next.nodeType == 8) {
            next = next.nextSibling;
            if (!next) {
                return false;
            }

        }

    }

    return next;

}

/*
 insertAfter(obj,next,type)
 obj Ҫ����Ķ���
 next Ҫ�����λ��
 type true ʶ����������ı�
 false �����ı�
 */

function insertAfter(obj, next, type) {
    var type = type ? type : false;
    var pos = getNext(next, type);
    var parent = next.parentNode;
    if (!pos) {
        parent.appendChild(obj);
    } else {
        parent.insertBefore(obj, pos);
    }
}

/*
 ����¼�
 addEvent��obj,type,fn��
 obj ����
 type �¼�����
 fn ������
 */

function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + type, fn);
    }
}

/*
 ɾ���¼�
 removeEvent��obj,type,fn��
 obj ����
 type �¼�����
 fn ������
 */
function removeEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.removeEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj.detachEvent("on" + type, fn);
    }
}




