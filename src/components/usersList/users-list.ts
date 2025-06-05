const tpl = `
<div class="sp-message">
{{#each users}}
  <div class="sp-message--wrapper" data-id="{{this.id}}">
   {{#if this.avatar}}
    <div class="sp-message--avatar">
      <img src="https://ya-praktikum.tech/api/v2/resources/{{this.avatar}}" alt="">
    </div>
    {{/if}}
        
    {{#if this.display_name}}<h3>{{this.display_name}}</h3>{{/if}}
  </div>
 {{/each}}
 
 <div class="sp-message--wrapper">  
   <button class="sp-button">Добавить пользователя</button>
 </div>
</div>
`;

export default tpl;
