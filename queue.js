const queue = {
    items: [],
    operation: undefined,
    currentItem: undefined,
    currentIndex: -1,
    init: function (items, operation, finished) {
        if (operation) {
            this.operation = operation;
        }
        if (items) {
            if (items instanceof Array) {
                items.forEach((element) => this.items.push(element));
            } else {
                this.items.push(items);
            }
        }
        if (this.items && this.items.length > 0) {
            this.nextItem();
        }
        this.finished = finished;
    },
    nextItem: function () {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.currentItem = this.items[this.currentIndex];
            console.log(this.currentItem);
            this.process();
        } else {
            if (this.finished) {
                this.finished();
            }
        }
    },
    process: function () {
        if (this.operation) {
            this.operation(this.currentItem, () => {
                this.nextItem();
            });
        }
    }
};
module.exports = queue;