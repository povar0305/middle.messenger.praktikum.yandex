import env from "../../utilits/env.ts";
import {store} from "../../store.ts";
import {TMessage} from "../Store.ts";

export interface IMessageWebSocketConnect {
  userId: number|string|null;
  chatId: number|string|null;
  token: number|string|null;
}

export interface IMessageWebSocketGet {
  offset: number
}

class MessageController {
  private _ws!: WebSocket;
  private _userId!: number|string|null;
  private _chatId!: number|string|null;
  private _token!: string|number|null;
  private _ping!: unknown;

  constructor() {
    this._handleOpen = this._handleOpen.bind(this);
    this._handleMassage = this._handleMassage.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  private _addEvents() {
    this._ws.addEventListener('open', this._handleOpen);
    this._ws.addEventListener('message', this._handleMassage);
    this._ws.addEventListener('error', (evt) => {
      this._handleError(evt as ErrorEvent);
    });
    this._ws.addEventListener('close', this._handleClose);
  }

  private _removeEvents() {
    this._ws.removeEventListener('open', this._handleOpen);
    this._ws.removeEventListener('message', this._handleMassage);
    this._ws.removeEventListener('error', (evt) => {
      this._handleError(evt as ErrorEvent);
    });
    this._ws.removeEventListener('close', this._handleClose);
  }

  private _handleOpen() {
    this.getMessages({ offset: 0 });
    this._ping = setInterval(() => {
      this._ws.send('');
    }, 10000);
  }

  private _handleMassage(evt: MessageEvent) {
    const data = JSON.parse(evt.data);
    if (Array.isArray(data)) {
      if (!data.length) {
        store.setState({ messages: [] });
      } else if (data[0].id === 0) {
        store.setState({ messages: data });
      } else {
        const message = store.state.messages as TMessage[]
        const messages:TMessage[] = [
          ...message,
          ...data,
        ] as TMessage[];
        store.setState({ messages });
      }
    } else if (typeof data === 'object' && data.type === 'message') {
      const messageArray = store.state.messages as TMessage[]

      const messages = [data, ...messageArray];
      store.setState({ messages });
    }
  }

  private _handleError(evt: ErrorEvent) {
    console.log('💬 _handleError', evt.message);
  }

  private _handleClose(evt: CloseEventInit) {
    this._removeEvents();
    if (evt.code === 1006) {
      this._reconnection();
    }
  }

  private _reconnection() {
    this.connect({
      userId: this._userId,
      chatId: this._chatId as number,
      token: this._token,
    });
  }

  public connect(options: IMessageWebSocketConnect) {
    this._userId = options.userId;
    this._chatId = options.chatId;
    this._token = options.token;
    this._ws = new WebSocket(`${env.HOST_WS}/chats/${options.userId}/${options.chatId}/${options.token}`);
    this._addEvents();
  }

  public getMessages(options: IMessageWebSocketGet) {
    this._ws.send(JSON.stringify({
      type: 'get old',
      content: options.offset.toString()||"0",
    }));
  }

  public leave() {
    clearInterval(this._ping as number);
    this._ws.close();
    this._removeEvents();
  }

  public sendMessage(message: string) {
    this._ws.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }
}

export default MessageController;
