const tpl = `
<div class="sp-input">
  <input
    class="sp-input_input"
    type="{{type}}"
    name="{{name}}"
    placeholder="{{placeholder}}"
{{#if required}}required{{/if}}
    data-validator="{{validator}}"
    accept="{{accept}}"
  >
  
  <span>
    {{error}}
  </span>
</div>`;

export default tpl;
