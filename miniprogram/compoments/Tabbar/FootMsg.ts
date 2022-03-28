Component({
    data: {}, methods: {
        goToVHtml(event: any) {
            const index = event.currentTarget.dataset.index;
            this.triggerEvent('goToVHtml', index);
        }
    }, properties: {}, observers: {}
});