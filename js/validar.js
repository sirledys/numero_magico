$(document).ready(function() {
  function validateFirstName() {
    const $input = $('#register-first-name')
    if ($input[0].value.length >= 4 && $input[0].value.length <= 50) {
      $input.removeClass('is-invalid').addClass('is-valid');
      return true;
    }
    $input.removeClass('is-valid').addClass('is-invalid');
    return false;
  }

  function validateLastName() {
    const $input = $('#register-last-name')
    if ($input[0].value.length >= 4 && $input[0].value.length <= 50) {
      $input.removeClass('is-invalid').addClass('is-valid');
      return true;
    }
    $input.removeClass('is-valid').addClass('is-invalid');
    return false;
  }

  function validateEmail() {
    const $input = $('#register-email')
    if ($input[0].value.length >= 3 && $input[0].value.includes('@')) {
      $input.removeClass('is-invalid').addClass('is-valid');
      return true;
    }
    $input.removeClass('is-valid').addClass('is-invalid');
    return false;
  }

  function validatePassword() {
    const $input = $('#register-password')
    if ($input[0].value.length >= 6) {
      $input.removeClass('is-invalid').addClass('is-valid');
      return true;
    }
    $input.removeClass('is-valid').addClass('is-invalid');
    return false;
  }

  function validatePasswordConfirm() {
    const $input = $('#register-password');
    const $inputConfirm = $('#register-password-confirm');
    if ($inputConfirm[0].value === $input[0].value && $inputConfirm[0].value.length >= 6) {
      $inputConfirm.removeClass('is-invalid').addClass('is-valid');
      return true;
    }
    $inputConfirm.removeClass('is-valid').addClass('is-invalid');
    return false;
  }

  function validateForms() {
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();
    validatePasswordConfirm();
  }

  $('#register-first-name').on('input', function() {
    validateFirstName();
  })

  $('#register-last-name').on('input', function() {
    validateLastName();
  })

  $('#register-email').on('input', function() {
    validateEmail();
  })

  $('#register-password').on('input', function() {
    validatePassword();
    $('#register-password-confirm')[0].value = '';
  })

  $('#register-password-confirm').on('input', function() {
    validatePasswordConfirm();
  })

  $('.register-form form').on('submit', function(event) {
    event.preventDefault();
    validateForms();

    if (validateFirstName() === true && validateLastName() === true && validateEmail() === true && validatePassword() === true && validatePasswordConfirm() === true) {
      const userData = $(this).serializeArray();

      localStorage.setItem("mdbAdminUserFirstName", userData[0].value);
      localStorage.setItem("mdbAdminUserLastName", userData[1].value);
      localStorage.setItem("mdbAdminUserEmail", userData[2].value);
      localStorage.setItem("mdbAdminUserPass", userData[3].value);
      location.reload();
    }
  })

  $('.delete-user').on('click', () => {
    localStorage.clear();
    location.reload();
  })

  if (localStorage.mdbAdminUserEmail) {
    $('.register-form').hide();
    $('.logout-form').show();
    $('.logged-user-message').html(`You have been registered as <strong>${localStorage.mdbAdminUserFirstName} ${localStorage.mdbAdminUserLastName}</strong>!`);
  }

});