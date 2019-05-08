Component({
  properties: {

  },

  data: {
    showChatPopup: false
  },

  methods: {
    hidePopup: function () {
      this.setData({
        showChatPopup: !this.data.showChatPopup
      })
    },
    showPopup() {
      this.setData({
        showChatPopup: !this.data.showChatPopup
      })
    },
  }
})