export class LinkNode<T> {
    next?: LinkNode<T>;
    pre?: LinkNode<T>;
    value?: T;
    constructor({
        next,
        pre,
        value,
    }: {
        next?: LinkNode<T>;
        pre?: LinkNode<T>;
        value?: T;
    }) {
        this.next = next;
        this.value = value;
        this.pre = pre;
    }
}

export class DoublyLink<T> {
    head?: LinkNode<T>;
    tail?: LinkNode<T>;
    constructor() {}
    pushFrond(val: T) {
        if (this.head === undefined) {
            this.head = new LinkNode({
                value: val,
            });
            this.tail = this.head;
        } else {
            this.head.pre = new LinkNode({
                value: val,
                next: this.head,
            });
            this.head = this.head.pre;
        }
        return this.head;
    }

    pushEnd(val: T) {
        if (this.tail === undefined) {
            this.tail = new LinkNode({
                value: val,
            });
            this.head = this.tail;
        } else {
            this.tail.next = new LinkNode({
                value: val,
                pre: this.tail,
            });
            this.tail = this.tail.next;
        }
        return this.tail;
    }

    popFrond(): T | undefined {
        if (this.head === undefined) {
            return undefined;
        } else {
            const result = this.head.value;
            this.head = this.head.next;
            if (this.head !== undefined) this.head.pre = undefined;
            else {
                this.tail = this.head;
            }
            return result;
        }
    }

    popEnd(): T | undefined {
        if (this.tail === undefined) {
            return undefined;
        } else {
            const result = this.tail.value;
            this.tail = this.tail.pre;
            if (this.tail !== undefined) this.tail.next = undefined;
            else {
                this.head = this.tail;
            }
            return result;
        }
    }

    remove(node: LinkNode<T>) {
        if (node.pre !== undefined) {
            node.pre.next = node.next;
        } else {
            this.head = node.next;
            if (this.head === undefined) {
                this.tail = this.head;
            }
        }
        if (node.next !== undefined) {
            node.next.pre = node.pre;
        } else {
            this.tail = node.pre;
            if (this.tail === undefined) {
                this.head = this.tail;
            }
        }
    }

    destory() {
        let p = this.head;
        let l: LinkNode<T>;
        while (p !== undefined) {
            l = p;
            p = p.next;
            l.pre = undefined;
            l.next = undefined;
        }
        this.head = undefined;
        this.tail = undefined;
    }
}
