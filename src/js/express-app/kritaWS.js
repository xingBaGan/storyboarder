const EventEmitter = require('events')
const WebSocket = require('ws')
const log = require('../shared/storyboarder-electron-log')

class KritaWebSocketServer extends EventEmitter {
  constructor () {
    super()
    // 创建WebSocket服务器
    this.wss = new WebSocket.Server({ port: 3006 });

    // 监听连接事件
    this.wss.on('connection', (ws) => {
      this.logInfo('KritaWS: 新连接建立');

      // 监听消息事件
      ws.on('message', (message) => {
        this.logInfo('KritaWS: 收到消息' + message);
        // 将消息广播给所有连接的客户端
        this.wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });

      ws.on('close', () => {
        this.logInfo('KritaWS: 连接断开');
      });
    });
  }

  // 自定义日志方法
  logInfo(message) {
    log.info(message);
    console.log(message, '\n');
  }
}

module.exports = KritaWebSocketServer