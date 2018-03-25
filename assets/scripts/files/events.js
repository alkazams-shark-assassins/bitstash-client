'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onCreateFile = function (event) {
  // this is to prevent the page from reloading once the function is called
  event.preventDefault()
  // this defines the data that we get from FormData as 'data'
  const data = new FormData(event.target)
  // here we pass the 'data' defined above to the createFile function in api
  api.createFile(data)
  // if the 'createFile' function runs succesfully, we run 'createFileSuccess'
  // in ui file. If 'createFile' fails, we run 'createFileFailure'
    .then(ui.createFileSuccess)
    .catch(ui.createFileFailure)
}

const onGetAllFiles = function (event) {
  // this is to prevent the page from reloading once the function is called
  event.preventDefault()
  // this defines the data that we get from FormData as 'data'
  const data = getFormFields(event.target)
  // here we pass the 'data' defined above to the 'getAllFiles' function in api
  api.getAllFiles(data)
  // if the 'getAllFiles' function runs succesfully, we run 'getAllFilesSuccess'
  // in ui file. If 'getAllFiles' fails, we run 'getAllFilesFailure'
    .then(ui.getAllFilesSuccess)
    .catch(ui.getAllFilesFailure)
}

const onGetOneFile = function (event) {
  // this is to prevent the page from reloading once the function is called
  event.preventDefault()
  // this defines the data that we get from FormData as 'data'
  const data = getFormFields(event.target)
  // here we pass the 'data' defined above to the 'getOneFile' function in api
  api.getOneFile(data)
  // if the 'getOneFile' function runs succesfully, we run 'getOneFileSuccess'
  // in ui file. If 'getOneFile' fails, we run 'getOneFileFailure'
    .then(ui.getOneFileSuccess)
    .catch(ui.getOneFileFailure)
}

const searchForFile = function (fileDataObj) {
  let foundObject
  // here we are searching for a file in the 'store' and returning it as 'foundObject'
  store.files.find(element => {
    if (element.id === fileDataObj.id) {
      foundObject = element
    }
  })
  return foundObject
}

const onUpdateFile = function (event) {
  event.preventDefault()
  // here we are creating an empty object for the 'searchObject'. This is the existing object in the store
  // that we are updating.
  const searchObject = {}
  // here we are adding an 'id' key value pair with the value being the id of the file container that we click on.
  searchObject.id = $(this).data('file-id')
  // here we are defining 'fileData' as the result of invoking the 'searchForFile' function when passing it the 'searchObject'
  const fileData = searchForFile(searchObject)

  // This the new name for the file
  const newName = $('#' + searchObject.id).val()
  // If there is a newName, we set it to the 'file_name' of the 'fileData' object.
  if (newName) {
    fileData.file_name = newName
    // we the pass the 'fileData' to the 'updateFile' function in api.
    api.updateFile(fileData)
      .then(ui.updateFileSuccess)
      .catch(ui.updateFileFailure)
  } else {
    // if there is no 'newName', show then run 'updateFileFailure' function in ui.
    event.preventDefault()
    // ui.userMessageBox('.uiFeedback', 'Please provide a new name!', 'red')
    ui.updateFileFailure()
  }
}

const onDeleteFile = function (event) {
  event.preventDefault()
  // here we are defining 'deleteFileId' as the 'file-id' of the file container whose 'delete' button we click on.
  const deleteFileId = $(this).data('file-id')
  // we then remove this file container from the DOM
  $('#container-' + deleteFileId).remove()
  // we then locate the 'itemToDelete' in the 'store' using 'find'
  const itemToDelete = function (fileId) {
    let foundObject
    store.files.find(element => {
      if (element.id === fileId) {
        foundObject = element
      }
    })
    // we then find the 'indexOfFile' from the 'files' array in the 'store', then 'splice' it to remove it.
    const indexOfFile = store.files.indexOf(foundObject)
    store.files.splice(indexOfFile, 1)
  }
  // we then call on the 'deleteFile' function in api and pass it the 'deleteFileId'.
  api.deleteFile(deleteFileId)
    .then(dummyData => itemToDelete(deleteFileId))
    .then(ui.deleteFileSuccess)
    .catch(ui.deleteFileFailure)
}

const addHandlers = function () {
  $('#multipart-form-data').on('submit', onCreateFile)
  $('#files-display-container').on('click', '.update-file-btn', onUpdateFile)
  $('#files-display-container').on('click', '.remove-file-btn', onDeleteFile)
}

module.exports = {
  addHandlers
}
