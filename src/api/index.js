import axios from 'axios'

export const addAppointment = ({ name,phone,bao,kuan,price }) => {
  return axios.post('http://61.164.47.179:3000/appointment', {name,phone,bao,kuan,price}).then(
    (res) => {
      return res.data.output.msg
    },
    (err) => {
      console.log(err)
      return '预约失败。'
    }
  )
}
//localhost:9000 用于测试
