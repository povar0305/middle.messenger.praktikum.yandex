const tpl = `
<div class="sp-profile">
  <div class="sp-profile_avatar">
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"/></g></svg>
     <h2 class="sp-header">
       Иван
     </h2>
  </div>

  <div class="sp-profile_group">
    <div class="sp-profile_setting">
      <p>
        Почта
      </p>

      <span>
        test@test.ru
      </span>
    </div>

    <div class="sp-profile_setting">
      <p>
        Логин
      </p>

      <span>
        test
      </span>
    </div>

    <div class="sp-profile_setting">
      <p>
        Имя
      </p>

      <span>
        Соня
      </span>
    </div>

    <div class="sp-profile_setting">
      <p>
        Фамилия
      </p>

      <span>
        Интересная
      </span>
    </div>

    <div class="sp-profile_setting">
      <p>
        Никнейм
      </p>

      <span>
        sonya_qwerty
      </span>
    </div>
  </div>

  <div class="sp-profile_group">
  {{{links}}}
  </div>
</div>
`;

export default tpl;
