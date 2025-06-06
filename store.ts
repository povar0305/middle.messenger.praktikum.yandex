import Store from './services/Store';

export const store = new Store({
  currentUser: {
    id: ''
  },
  chatId: null,
  token: null,
  chats: [],
  messages: []
});
