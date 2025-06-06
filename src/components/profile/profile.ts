const tpl = `
<div class="sp-profile">
{{{arrow}}}
  <div class="sp-profile_avatar">
    <img data-name="avatar" src="" alt="">
  </div>

  <div class="sp-profile_group">
    <div class="sp-profile_setting">
      <p>
        Почта
      </p>

      <span data-name="email">
        test@test.ru
      </span>
    </div>

    <div class="sp-profile_setting">
      <p>
        Логин
      </p>

      <span data-name="login">
      </span>
    </div>

    <div class="sp-profile_setting">
      <p>
        Имя
      </p>

      <span data-name="first_name">
      </span>
    </div>

    <div class="sp-profile_setting">
      <p>
        Фамилия
      </p>

      <span data-name="second_name">
      </span>
    </div>

    <div class="sp-profile_setting">
      <p>
        Никнейм
      </p>

      <span data-name="display_name">
      </span>
    </div>
  </div>

  <div class="sp-profile_group">
  {{{links}}}
  </div>
</div>
`;

export default tpl;
