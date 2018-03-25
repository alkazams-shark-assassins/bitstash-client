'use strict'

const filesUi = require('../files/ui')
const store = require('../store')

const signUpSuccess = function (data) {
  filesUi.userMessageBox('.uiFeedback', 'Successfully signed up!', '#630099', 4000)
}

const signUpFailure = function (data) {
  $('.uiFeedback').text('Sign up failed!')
  $('.uiFeedback').css('color', '#bf6d20')
}

const signInSuccess = function (data) {
  filesUi.userMessageBox('.uiFeedback', 'Successfully signed in!', '#630099', 4000)
  store.user = data.user

  // set hidden user._id attribute to send with form data to API
  $('#hidden-user-id').attr('value', store.user._id)
  // adds the user's email address to the span with id of 'user-email-id' in index.html
  $('#user-email-id').text(store.user.email)
  // hides the jumbotron with class of 'landing-content' in index.html
  $('.landing-content').hide()
  // shows the div with class of 'signed-in-content' in index.html.
  $('.signed-in-content').show()
  return store.user
}

const signInFailure = function (data) {
  $('.uiFeedback').text('Sign in failed!')
  $('.uiFeedback').css('color', '#bf6d20')
}

const changePasswordSuccess = function (data) {
  filesUi.userMessageBox('.uiFeedback', 'Changed password!', '#630099', 4000)
}

const changePasswordFailure = function (data) {
  filesUi.userMessageBox('.uiFeedback', 'Error changing password!', '#630099', 6000)
}

const signOutSuccess = function () {
  filesUi.userMessageBox('.uiFeedback', 'Signed out!', '#630099', 4000)
  // sets store.user to 'null'
  store.user = null
  // sets store.files to 'null'
  store.files = null
  // empties out the 'files-display-container'
  $('#files-display-container').empty()
  // hides the div with class of 'signed-in-content' in index.html.
  $('.signed-in-content').hide()
  // shows the jumbotron with class of 'landing-content' in index.html
  $('.landing-content').show()
  // this removes the user-id from the hidden field in upload form.
  $('#hidden-user-id').attr('value', '')
  // clears the 'file-name-input'
  $('#file-name-input').val('')
  // clears the 'upload-file-path'
  $('#upload-file-path').val('')
}

const signOutFailure = function () {
  $('.uiFeedback').text('Failed signing out!')
  $('.uiFeedback').css('color', '#bf6d20')
}

// on document ready, hide `.signed-in-content` <div>
$(() => {
  $('.signed-in-content').hide()
})

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
