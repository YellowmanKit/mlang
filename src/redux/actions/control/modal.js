export const confirm = (message, onConfirm, onCancel) =>{
  return {
    type: 'confirm',
    payload: { message: message, onConfirm: onConfirm, onCancel: onCancel }
  }
}

export const message = (message) =>{
  return {
    type: 'message',
    payload: message
  }
}

export const showModalButton = () =>{
  return {
    type: 'showModalButton',
  }
}

export const hideModal = () =>{
  return {
    type: 'hideModal',
  }
}

export const audioHint = (message) =>{
  return {
    type: 'message',
    payload: [
      'Recording function is not autherized! '+
      'Please exit mlang then go to "Setting" to turn on "Allow Access to Microphone" for the respective web browser then restart the device! '+
      '(Google Chrome for Android device, Safari for ios device)! '+
      'Also avoid to use "Add to Home Screen" function and access https://mlang.social by web browser directly! ',
      '錄音功能未獲授權! '+
      '請離開mlang並到「設定」確保所用瀏覽器的「允許使用麥克風」功能已被點選，然後重啟裝置 '+
      '(Android 裝置請用 Google Chrome, ios 裝置請用 Safari)! '+
      '請避免使用捷徑並直接以瀏覽器訪問 https://mlang.social 之網址! ',
      '录音功能未获授权! '+
      '请离开mlang并到「设定」确保所用浏览器的「允许使用麦克风」功能已被点选，然后重启装置 '+
      '(Android 装置请用 Google Chrome, ios 装置请用 Safari)! '+
      '请避免使用捷径并直接以浏览器访问 https://mlang.social 之网址! ',
    ]
  }
}
