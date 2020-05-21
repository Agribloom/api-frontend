// $(function () {
//     let swt = ['#signin', "#signup", "#reset"];
//     let search = location.search.replace(/[=?]+/g, '#').match(/#\w+/g),
//     found = search.map(it=>swt.indexOf(it));
//     if (found !== -1) {
//         search = swt[search];
//         let target = $(search) ? $(search) : $('#signin');
//         if (target) {
//             $('.active').removeClass('active');
//             target.addClass('active');
//         }
//     }
// });

function bindPasswordReveal () {
    $('input[type="password"] + .input-group-append').each(function () {
        $(this).on('mousedown touchstart', function () {
            $(this)
                .prev()
                .attr('type', 'text')
        })
        $(this).on('mouseup touchend', function () {
            $(this)
                .prev()
                .attr('type', 'password')
        })
    })
}

function showErrorAlert () {
    $('.alert-form-error:not(.d-block)')
        .removeClass('d-none')
        .addClass('d-block')
}

function hideErrorAlert () {
    $('.alert-form-error')
        .removeClass('d-block')
        .addClass('d-none')
}

function bindInputFocusListener () {
    $('form .form-control')
        .bind('focus', function () {
            $(this)
                .closest('.form-group')
                .addClass('focused')
        })
        .bind('blur', function () {
            $(this)
                .closest('.form-group')
                .removeClass('focused')
        })
}

function bindInputErrorHandler () {
    $('form .form-control')
        .bind('invalid', function (e) {
            showErrorAlert()
            $(this)
                .closest('.form-group')
                .addClass('has-error')
        })
        .bind('change', function (e) {
            if ($(this).is(':valid')) {
                $(this)
                    .closest('.form-group')
                    .addClass('is-valid')
            }

            if ($(this).is(':invalid')) {
                showErrorAlert()
                $(this)
                    .closest('.form-group')
                    .addClass('has-error')
            }
        })
        .bind('keyup', function () {
            $(this)
                .closest('.form-group')
                .removeClass('has-error')
        })
}

function bindPasswordResetForm () {
    $('form.reset-password-form').on('submit', function (e) {
        e.preventDefault()
        $('.reset-form')
            .removeClass('d-block')
            .addClass('d-none')
        $('.reset-confirmation').addClass('d-block')
    })
}

function bindSwitchForm () {
    $('.switch').on('click', function (e) {
        e.preventDefault()
        $('.active').removeClass('active')
        let target = $(e.target.dataset.target)
        $(target).addClass('active')
    })
}

window.addEventListener('load', function () {
    bindPasswordResetForm()
    bindPasswordReveal()
    bindInputFocusListener()
    bindInputErrorHandler()
    bindSwitchForm()
})
