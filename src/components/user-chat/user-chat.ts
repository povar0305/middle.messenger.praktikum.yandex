const tpl = `
{{#each chats}}
<div class="sp-user-chat" data-id="{{this.id}}">
    <div class="sp-user-chat--info">
        {{#if this.title}}<h3>{{this.title}}</h3>{{/if}}
        {{#if this.message}}<p>{{this.message}}</p>{{/if}}
    </div>
    
      {{#if this.unread_count}}<span>{{this.unread_count}}</span>{{/if}}
     </div>
 
 {{/each}}
`

export default  tpl
