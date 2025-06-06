import Store from './services/Store';

export const store = new Store({
  currentUser: {
    id: '',
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: ''
  },
  chatId: '',
  token: '',
  chats: [],
  messages: []
});
