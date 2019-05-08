const db = wx.cloud.database()
const messages = db.collection('messages')
var mydata = new Array
var found = new Array

Page({
  data:{
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    isLiked: false,
    isFold: true,
    dataset: [],
    dataset2: [],
    dataset3: [],
    searchContent: '',
    searchRes: []
  },

  onLoad: function () {
    var that = this;
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })

    messages.orderBy('date', 'desc').where({}).get({
      success: res=>{
        mydata = res.data
        for(var i = 0; i < mydata.length; i++){
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset: mydata,
        })
      }
    })

    messages.orderBy('numLiked', 'desc').where({}).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset2: mydata,
        })
      }
    })
  },

  onPullDownRefresh: function () {
    messages.orderBy('date', 'desc').where({}).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset: mydata
        })
      }
    })
    wx.stopPullDownRefresh()
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } 
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  tapLike(e){
    this.setData({
      isLiked: !this.data.isLiked,
    })
    wx.cloud.callFunction({
      name: 'updateNumLiked',
      data:{
        id: e.target.id,
      },
      success: function(res){
        console.log(res)
      },
      fail: console.error
    })
    this.onLoad()
  },

  showComment(e){
    this.setData({
      isFold: !this.data.isFold,
    })
  },

  getTime: function (date1) {
    var date2 = new Date();
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var time = timestamp - date1 / 1000;
    var day = Math.floor(time / 86400);
    var hour = Math.floor(time % 86400 / 3600);
    var minute = Math.floor(time % 86400 % 3600 / 60);
    //console.log(day, hour, minute)
    var output = '';
    if (day != 0) {
      output = day + ' day ago';
    } else if (day == 0 && hour != 0) {
      output = hour + ' hour ago';
    } else if (day == 0 && hour == 0 && minute != 0) {
      output = minute + ' minutes ago';
    }
    return output
  },

  sortLove: function(e){
        messages.orderBy('date', 'desc').where({
      isLove: true,
    }).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset3: mydata,
        })
      }
    })
    this.onLoad()
  },

  sortLife: function (e) {
    messages.orderBy('date', 'desc').where({
      isLife: true,
    }).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset3: mydata,
        })
      }
    })
    this.onLoad()
  },

  sortGame: function (e) {
    messages.orderBy('date', 'desc').where({
      isGame: true,
    }).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset3: mydata,
        })
      }
    })
    this.onLoad()
  },

  sortStudy: function (e) {
    messages.orderBy('date', 'desc').where({
      isStudy: true,
    }).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset3: mydata,
        })
      }
    })
    this.onLoad()
  },

  goReportPage: function (e)
  {
    wx.navigateTo({
      url: '/pages/reportpage/reportpage',
    })
  },

  getContent: function(e)
  {
    this.setData({
      searchContent: e.detail.value
    })
  },

  search: function(e)
  {
    console.log(this.data.searchContent)
    for(let i=0; i < mydata.length; i++){
      if(mydata[i].message.indexOf(this.data.searchContent)>= 0){
        found.push(mydata[i])
      }
    }
    this.setData({
      searchRes: found
    })
    found = []
    console.log(this.data.searchRes)
  }
})