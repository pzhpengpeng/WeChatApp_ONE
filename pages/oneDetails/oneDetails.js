// pages/oneDetails/oneDetails.js
let {
  requestData,
  postFormId
} = require('../../utils/util.js');
let dayjs = require('../..//miniprogram_npm/dayjs/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen: false,
    title: "一个图文",
    loading: true,
    id: 0,
    oneInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
    this.getOneDetails(this.data.id);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.oneInfo.forward,
      imageUrl: "https:" + this.data.oneInfo.img_url
    }
  },
  postFormId,
  handleChangeMenusOpen(e) {
    this.setData({
      isOpen: e.detail
    })
  },
  getOneDetails(e) {
    let id = typeof e === "object" ? e.target.dataset.id : e;
    if (!id) return false;
    this.setData({
      loading: true
    })
    requestData(`/api/one/${id}`).then(d => {
      setTimeout(_ => {
        wx.setNavigationBarTitle({
          title: d.volume + " - ONE · 一个"
        })
        d['day'] = dayjs(d.post_date).format('DD');
        d['date'] = dayjs(d.post_date).format('MMM.YYYY');
        this.setData({
          oneInfo: d,
          loading: false
        })
      }, 500);
    })
  }
})