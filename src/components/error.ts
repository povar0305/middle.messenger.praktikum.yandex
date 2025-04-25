const tpl = `
<div class="sp-error">
  <div class="sp-error--wrapper">
    <div class="sp-error--group">
      <h1 class="center">
        {{error}}
      </h1>

      <p>
        {{description}}
      </p>
    </div>


    {{>
      link
      text="Назад"
      href="/"
      class="sp-link--center"
    }}
  </div>
</div>
`;

export default tpl;
