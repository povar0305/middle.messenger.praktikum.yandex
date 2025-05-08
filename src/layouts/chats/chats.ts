const tpl = `
  <div class="sp-chats">
    <div class="sp-chats__list">
      <div class="sp-chats__list--action">
        {{{action}}}
      </div>
      
      <div class="sp-chats__users">
        {{{list}}}      
      </div>
    </div>
    
    <div class="sp-chats__content">
      <span class="sp-chats__content--select">Выберите чат чтобы отправить сообщение</span>
      
      <form class="sp-chats__content--message">
        {{{message}}}
      </form>
    </div>
  </div>
`

export default tpl
