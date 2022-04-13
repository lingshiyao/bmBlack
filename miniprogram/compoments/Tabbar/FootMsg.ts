Component({
    data: {}, methods: {
        goToVHtml(event: any) {
            ////////////////////console.log("goToVHtml:", event)
            const index = parseInt(event.currentTarget.dataset.index.toString());
            switch (index) {
                case 1: {
                    wx.navigateTo({
                        url: `/pages/PhoneVHTML?key=nft_intro`
                    })
                    break;
                }
                case 2: {
                    wx.navigateTo({
                        url: `/pages/PhoneVHTML?key=nft_how_get`
                    })
                    break;
                }
                case 3: {
                    wx.navigateTo({
                        url: `/pages/PhoneVHTML?key=nft_how_buy`
                    })
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }, properties: {}, observers: {}
});