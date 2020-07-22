import 'express-async-errors'

import { db, errorHandler } from '@geisa/common'
import bodyParser from 'body-parser'
import express from 'express'
import { createServer, Server } from 'http'
import SocketIo from 'socket.io'
import { Tedis } from 'tedis'

import { typeOrmConfig } from './config/typeorm.config'
import { PORT_APP, PORT_REDIS, URL_REDIS } from './constants'
import { indexRouter } from './modules/connected-mesin/routes'
import { MesinStatusService } from './modules/connected-mesin/services/mesin-status.service'
import { indexGetRequestRouter } from './modules/get-request/routes'
import { indexHandleCmdRouter } from './modules/handle-cmd/routes'
import { postRequestDataRouter } from './modules/handle-data/routes/post'
import { indexHandshakeRouter } from './modules/handshake/routes'
import { SocketEvents } from './modules/types/socket-events.types'

export class AdmsServer {
  private _app: express.Application;
  private _server: Server;
  private _socketIo: SocketIo.Server;
  private _tedis: Tedis;
  private _clientConnected: number;

  constructor() {
    this._clientConnected = 0;
    this._app = express();
    this._server = createServer(this._app);
    this.initApp();
    this.initSocket();
    this.initRedis();
  }

  private initApp(): void {
    this._app.use(bodyParser.text());
    this._app.use(indexHandshakeRouter);
    this._app.use(indexGetRequestRouter);
    this._app.use(postRequestDataRouter);
    this._app.use(indexHandleCmdRouter);

    this._app.use(indexRouter);

    this._app.use(errorHandler);
  }

  private initSocket(): void {
    this._socketIo = SocketIo(this._server);
  }

  private initRedis(): void {
    this._tedis = new Tedis({
      host: URL_REDIS,
      port: PORT_REDIS,
    });
  }

  async listen(): Promise<void> {
    try {
      await db.createConnection(typeOrmConfig);

      await MesinStatusService.resetMesinStatus();
      this._server.listen(PORT_APP, () => {
        console.log(`Listening on port ${PORT_APP}`);
      });

      // this._socketIo.on(SocketEvents.CONNECT, (_socket: SocketIo.Socket) => {
      //   console.log('Web socket up & running');
      // });

      this._socketIo.on('connection', (socket: SocketIo.Socket) => {
        console.log('a user connected');
        this._clientConnected++;
        this.tedis.incr('users');

        socket.on(SocketEvents.DISCONNECT, () => {
          console.log('user disconnected');
          this._clientConnected--;
          this.tedis.decr('users');
        });
      });
    } catch (e) {
      console.error(e.message);
      throw new Error('Cannot connect to source, exiting');
    }
  }

  get app(): express.Application {
    return this._app;
  }

  get tedis(): Tedis {
    return this._tedis;
  }

  get socketIo(): SocketIO.Server {
    return this._socketIo;
  }

  get clientConnected(): number {
    return this._clientConnected;
  }
}
