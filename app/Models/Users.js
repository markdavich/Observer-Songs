export default class Users{
  users = []
  isSandBox = false

  /**
   * @param {string} newUserName This is a 'string' that holds a new user name
   * @returns {true|false} TRUE If the user was added, FALSE if the user already exists
   */
  addUser(newUserName) {
    if (this.users.indexOf(newUserName) == -1) {
      this.users.push(newUserName)
      this.users.sort()
      return true
    }
    return false
  }

  get Template() {
    let template = ''
    this.users.forEach(user => {
      template += `<option value="${user}">${user}</option>`
    })
    return template
  }

  static Create(arrayOfSongsOrUsers, isSandBox) {
    let usersObj = new Users()

    usersObj.isSandBox = isSandBox
    
    if (isSandBox) {
      usersObj.users = this.users = [...new Set(arrayOfSongsOrUsers.map(song => song.user))].sort()
    } else {
      usersObj.users = arrayOfSongsOrUsers.sort()
    }

    return usersObj
  }

  copy() {
    return Users.Create(this.users, false)
  }
}