import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'http://192.168.253.142:3001/login',
    method: 'post',
    data
  })
}
export function postGrade(data) {
  return request({
    url: 'http://192.168.253.142:3001/teacher/postGrade',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-element-admin/user/info',
    url: 'http://192.168.253.142:3001/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getGrade(id) {
  console.log(`id====${id}`)
  return request({
    url: 'http://192.168.253.142:3001/users/getGrade',
    method: 'get',
    params: { id: id }
  })
}
export function getAllGrade() {
  return request({
    url: 'http://192.168.253.142:3001/admin/',
    method: 'get'
  })
}
export function getAllStudent() {
  return request({
    url: 'http://192.168.253.142:3001/admin/queryAllStudent',
    method: 'get'
  })
}

export function postQuestion(id) {
  console.log(`id===${id}`)
  return request({
    url: 'http://192.168.253.142:3001/users/postQuestion',
    method: 'post',
    params: { gradeID: id }
  }
  )
}
export function verifyGrade(id) {
  console.log(`id===${id}`)
  console.log(id.length)
  var pa = ''
  for (var i = 0; i < id.length; i++) {
    pa += id[i] + ','
  }
  console.log(pa)
  return request({
    url: 'http://192.168.253.142:3001/admin/checkGrade',
    method: 'get',
    params: { gradeID: pa }
  }
  )
}
export function getStudentInformation(id) {
  console.log(id)
  return request({
    url: 'http://192.168.253.142:3001/getUserInformation',
    method: 'get',
    params: { id: id }
  })
}
export function postStudentInformation(data) {
  console.log(data)
  return request({
    url: 'http://192.168.253.142:3001/postStudentInformation',
    method: 'post',
    params: data
  })
}

export function createStudent(data) {
  console.log(data)
  return request({
    url: 'http://192.168.253.142:3001/admin/createStudent',
    method: 'post',
    data
  })
}
export function newdoc(data) {
  return request({
    method: 'post',
    url: 'http://192.168.253.142:3001/upload',
    data: data
  })
}
