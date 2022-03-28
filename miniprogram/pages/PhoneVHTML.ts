import {request} from "../api/Api";

const NULL: any = null;

Page({
    data: {
        text: "", title: "", options: NULL
    }, async getContent() {
        const content = await request.content({key: this.data.options.key.toString()});
        if (content) {
            const e = content;
            let text_fc6dabc4: any = this.data.text;
            text_fc6dabc4 = e.body;
            this.setData({
                'text': text_fc6dabc4
            });
            let title_8c7d40d5: any = this.data.title;
            title_8c7d40d5 = e.title;
            this.setData({
                'title': title_8c7d40d5
            });
            wx.setNavigationBarTitle({
                title: this.data.title
            })
        }
    }, goToVHtml(index: number) {
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
    }, properties: {}, onLoad(options) {
        this.setData({
            'options': options
        })
        this.getContent();
    }, observers: {}
});