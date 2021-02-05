const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach(field => {
    if(field.val().trim() === "") {
      field.addClass("input-error");
      field.closest(".form__input-wrap").addClass("form__input-wrap--active");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}

$('.form').submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
  
  const modal = $("#modal");
  const content = modal.find(".modal__content");
  
  modal.removeClass("error-modal");
  $(".input-error").removeClass("input-error");
  $(".form__input-wrap--active").removeClass("form__input-wrap--active");
  $(".form__input--message--active").removeClass("form__input--message--active");

  const isValid = validateFields(form, [name, phone, comment, to]);
  
  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      }
    });

    request.done((data) => {
      content.text(data.message);
    });

    request.fail((data) => {
      const message = data.responseJSON.message;
        content.text(message);
        modal.addClass("error-modal");
    });

    request.always(() => {
      $.fancybox.open ({
        src: "#modal",
        type: "inline"
      });
    })
  }

})

$(".app-close-modal").click(e => {
  e.preventDefault();

  $.fancybox.close();
})

$(".form__input").focusin(function () {
  const inputWrap = $(this).closest(".form__input-wrap--active");
  $(".form__input--message--active").removeClass("form__input--message--active");
  if (inputWrap.length !== 0) {
    inputWrap.removeClass("form__input-wrap--active");
    inputWrap.find(".form__input--message").addClass("form__input--message--active");
  }
})