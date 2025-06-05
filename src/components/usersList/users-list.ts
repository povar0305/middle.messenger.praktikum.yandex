const tpl = `
<div class="sp-message">
  <div class="sp-message--wrapper">
    <div class="sp-input">
      <input
        class="sp-input_input"
        placeholder="Введите имя"
        name="new-user"
      >
    </div>
  </div>
 
 <div class="sp-message--users">
 Пользователи в чате:
   {{#each users}}
    <div class="sp-message--wrapper" data-id="{{this.id}}">
     {{#if this.avatar}}
      <div class="sp-message--avatar">
        <img src="https://ya-praktikum.tech/api/v2/resources/{{this.avatar}}" alt="">
      </div>
      {{/if}}
          
      {{#if this.display_name}}<h3>{{this.display_name}}</h3>{{/if}}

      <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
      </svg>
    </div>
   {{/each}}
  </div>
</div>
`;

export default tpl;
