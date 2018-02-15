'use strict'

const store = require('../store')

const createFileSuccess = function (data) {
  $('#uiFeedback').text('Uploaded file!')
  $('#uiFeedback').css('color', 'green')
  console.log('JSON from succesful AJAX:', data)
}

const createFileFailure = function () {
  $('#uiFeedback').text('File upload failed!')
  $('#uiFeedback').css('color', 'red')
}

const getAllFilesSuccess = function (data) {
  console.log(data)
}

const getAllFilesFailure = function (error) {
  console.log(error)
}

const getOneFileSuccess = function (data) {
  console.log(data)
}

const getOneFileFailure = function (error) {
  console.log(error)
}

const updateFileSuccess = function (data) {
  console.log(data)
}

const updateFileFailure = function (error) {
  console.log(error)
}

const deleteFileSuccess = function (data) {
  console.log(data)
}

const deleteFileFailure = function (error) {
  console.log(error)
}

module.exports = {
  createFileSuccess,
  createFileFailure,
  getAllFilesSuccess,
  getAllFilesFailure,
  getOneFileSuccess,
  getOneFileFailure,
  updateFileSuccess,
  updateFileFailure,
  deleteFileSuccess,
  deleteFileFailure
}

//
// createFile,
// getAllFiles,
// getOneFile,
// updateFile,
// deleteFile
