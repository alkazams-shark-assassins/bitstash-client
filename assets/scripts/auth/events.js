'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const filesAPI = require('../files/api')
const filesUI = require('../files/ui')

const onSignUp = function (event) {
  // we first define 'data' as the information that we get using 'getFormFields'.
  const data = getFormFields(this)
  // the line below is to prevent the page from reloading once the event is triggered.
  event.preventDefault()
  // if the 'password' provided doesn't equal the 'password_confirmation', it runs the 'signUpFailure'
  // function in the ui file.
  if (data.password !== data.password_confirmation) {
    return ui.signUpFailure()
  }
  // If the 'password' and 'password_confirmation' match, the 'data' is passed to the 'signUp' funtion
  // in the api file.
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
    // this clears the values of the input fields
  $('#sign-up').find('input:text, input:password, select, textarea').val('')
}

const onSignIn = function (event) {
  // we first define 'data' as the information that we get using 'getFormFields'.
  const data = getFormFields(this)
  // the line below is to prevent the page from reloading once the event is triggered.
  event.preventDefault()
  // The 'data' is passed to the 'signUp' funtion in the api file.
  api.signIn(data)
  // then runs the 'signInSuccess' function in the ui file.
    .then(ui.signInSuccess)
    // then it runs the 'getAllFiles' funtion in 'files/api' to retreive all of the user's files.
    .then(filesAPI.getAllFiles)
    // runs the 'getAllFilesSuccess' function in 'files/ui'.
    .then(filesUI.getAllFilesSuccess)
    // if the signIn fails, it runs 'signInFailure' in the ui file.
    .catch(ui.signInFailure)
    // this clears the values of the input fields
  $('#sign-in').find('input:text, input:password, select, textarea').val('')
}

const changePassword = function (event) {
  // we first define 'data' as the information that we get using 'getFormFields'.
  const data = getFormFields(this)
  // the line below is to prevent the page from reloading once the event is triggered.
  event.preventDefault()
  // we then pass the data to the 'changePassword' function in api file.
  api.changePassword(data)
    // if successfull, it runs the 'changePasswordSuccess' function in ui file.
    .then(ui.changePasswordSuccess)
    // if it fails, it runs the 'changePasswordFailure' funtion in ui file.
    .catch(ui.changePasswordFailure)
  $('#change-password').find('input:password, select, textarea').val('')
}

const signOut = function (event) {
  // the line below is to prevent the page from reloading once the event is triggered.
  event.preventDefault()
  // runs the 'signOut' function in api file.
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', changePassword)
  $('#sign-out').on('submit', signOut)
}

module.exports = {
  addHandlers
}
