const tpl = `
<div class="sp-message-items--main">
  <div class="sp-message-items">
    {{#each messages}}
      <div class="sp-message-items--item {{#if this.isMyMessage}}your{{/if}}">
      <span>{{#if this.isShowDate}}{{this.formattedDate}}{{/if}} {{this.formattedTime}}</span>
      <p>{{this.content}}</p>
      </div>
    {{/each}}
  </div>
</div>
`;

export default tpl;
