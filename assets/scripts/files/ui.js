'use strict'

const store = require('../store')
const indexFiles = require('../templates/index-files.handlebars')
const showFile = require('../templates/show-file.handlebars')
const emptyFileList = require('../templates/empty-file-list.handlebars')

// this function creates ui messages for the user.
const userMessageBox = function (xField, xText, xColor, xTime) {
  $(xField).text(xText)
  $(xField).css('color', xColor)
  setTimeout(() => {
    $(xField).text('')
  }, xTime)
}
// this function changes the date format for the 'date stored' in the file container to 'en-US' date format.
const formatDateUS = function (file, idToChange) {
  const createdDate = new Date(file.createdAt)
  const formatCreateDate = createdDate.toLocaleString('en-US')
  // console.log('formatCreateDate is:', formatCreateDate)
  $(idToChange + file.id).text(formatCreateDate)
}

const createFileSuccess = function (data) {
  // if the file is too big, the 'special_message' is displayed.
  if (data.special_message) {
    userMessageBox('.uiFeedback', data.special_message, '#bf6d20', 4000)
  } else {
    // if the file is not too big, it displays the success message.
    userMessageBox('.uiFeedback', 'Uploaded File!', '#630099')
    if (store.files.length === 0) {
      $('#files-display-container').html('')
    }
    store.files.push(data.file)
    const singleFileHTML = showFile({ file: data.file })
    $('#files-display-container').prepend(singleFileHTML)
    formatDateUS(data.file, '#created-time-')
    // file-name-input
  }
  // these clear the 'file-name-input' and 'upload-file-path'
  $('#file-name-input').val('')
  $('#upload-file-path').val('')
}

const createFileFailure = function () {
  // shows a 'file upload failed' message if the upload fails
  userMessageBox('.uiFeedback', 'File upload failed!', '#bf6d20', 6000)
}

const getAllFilesSuccess = function (data) {
  store.files = data.files
  // if the 'store' has any files, it displays the files in the 'files-display-container'
  if (store.files.length > 0) {
    const indexFilesHTML = indexFiles({ files: data.files })
    $('#files-display-container').html(indexFilesHTML)
    data.files.forEach(file => {
      // it reformats the date for each file
      formatDateUS(file, '#created-time-')
    })
  } else {
    // if there are no files, it displays the 'emptyFileList' handlebars template
    const defaultGreeting = emptyFileList()
    $('#files-display-container').html(defaultGreeting)
  }
}

const getAllFilesFailure = function (data) {
  // displays an error if getAllFiles fails
  userMessageBox('.uiFeedback', 'Error loading user files', '#bf6d20', 6000)
}

const updateFileSuccess = function (data) {
  // displays 'File changed!' if the file was updated succesfully.
  userMessageBox('.uiFeedback', 'File changed!', '#630099', 4000)
  // displays the newly changed file name and adds a caret.
  $('#name-' + data.file.id).html($('#' + data.file.id).val() + '<span class="caret"></span>')
  formatDateUS(data.file, '#created-time-')
}

const updateFileFailure = function (data) {
  // displays error if updateFile fails
  userMessageBox('.uiFeedback', 'Error updating file', '#bf6d20', 6000)
}

const deleteFileSuccess = function (data) {
  // displays message when file was deleted.
  userMessageBox('.uiFeedback', 'File was successfully deleted.', '#630099', 4000)
  // if there are no files, it displays the 'emptyFileList' handlebars template
  if (store.files.length === 0) {
    const defaultGreeting = emptyFileList()
    $('#files-display-container').html(defaultGreeting)
  }
}

const deleteFileFailure = function (data) {
  // displays and error if deleteFile fails
  userMessageBox('.uiFeedback', 'Error deleting file', '#bf6d20', 6000)
}

module.exports = {
  userMessageBox,
  createFileSuccess,
  createFileFailure,
  getAllFilesSuccess,
  getAllFilesFailure,
  updateFileSuccess,
  updateFileFailure,
  deleteFileSuccess,
  deleteFileFailure
}
