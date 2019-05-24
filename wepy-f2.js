// wepy-f2.js
import Renderer from './lib/renderer';
import F2 from './lib/f2';
// 适配小程序的事件机制
F2.Util.addEventListener = function (source, type, listener) {
  source.addListener(type, listener);
};

F2.Util.removeEventListener = function (source, type, listener) {
  source.removeListener(type, listener);
};

F2.Util.createEvent = function (event, chart) {
  const type = event.type;
  let x = 0;
  let y = 0;
  const touches = event.touches;
  if (touches && touches.length > 0) {
    x = touches[0].x;
    y = touches[0].y;
  }

  return {
    type,
    chart,
    x,
    y
  };
};

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasId: {
      type: String,
      value: 'wepy-f2'
    },
    width: {
      type: Number,
      value: 400
    },
    height: {
      type: Number,
      value: 400
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    init: function(callback, data) {
      const version = wx.version.version.split('.').map(n => parseInt(n, 10));
      const isValid = version[0] > 1 || (version[0] === 1 && version[1] > 9)
        || (version[0] === 1 && version[1] === 9 && version[2] >= 91);
      if (!isValid) {
        console.error('微信基础库版本过低，需大于等于 1.9.91。');
        return;
      }
      const ctx = wx.createCanvasContext(this.data.canvasId, this); // 获取小程序上下文
      const canvas = new Renderer(ctx);
      this.canvas = canvas;
      const query = wx.createSelectorQuery().in(this);
      query.select('.wepy-f2').boundingClientRect(res => {
        if (typeof callback === 'function') {
          this.chart = callback(canvas, res.width, res.height, data);
        }
      }).exec();
    },
    touchStart(e) {
       if (this.canvas) {
         this.canvas.emitEvent('touchstart', [e]);
       }
    },
    touchMove(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchmove', [e]);
      }
    },
    touchEnd(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchend', [e]);
      }
    },
    press(e) {
      if (this.canvas) {
        this.canvas.emitEvent('press', [e]);
      }
    }
  }
})
