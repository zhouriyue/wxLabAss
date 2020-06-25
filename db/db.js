function getSysUser() {
  var sysUser = wx.getStorageSync('sysUser');
  wx.setStorageSync('sysUser', sysUser)
  return sysUser;
}
function setSysUser(sysUser) {
  wx.setStorageSync('sysUser', sysUser)
}

module.exports = { //必须在这里暴露接口，以便被外界访问，不然就不能访问
  getSysUser: getSysUser,
  setSysUser:setSysUser
}