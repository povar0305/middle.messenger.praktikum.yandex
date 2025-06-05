const tpl = `
  <div class="sp-chats">
    <div class="sp-chats__list">
      <div class="sp-chats__list--action">
        {{{action}}}
      </div>
      
      <div class="sp-chats__users">
      
      </div>
    </div>
    
    <div class="sp-chats__content">
      <div class="sp-chats__content--select">
        <p>
          Выберите чат чтобы отправить сообщение
        </p>
      </div>
      
      <form class="sp-chats__content--message">
      <div class="sp-chats__content--messages">
            
      </div>
      
        {{{message}}}
      </form>
    </div>
  </div>
`

export default tpl
