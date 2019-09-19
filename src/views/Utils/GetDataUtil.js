/**
 * 获取列表数据
 * @param num 当前页
 * @param component 当前组件
 * @param url
 * @param listName 响应数据中列表数据的键名
 */
export function getTableData(values, component, url, listName) {
  // 获取用户接口
  // this.axios.post(this.myIp + "Manage/getUserList",
  // 获取账号接口
  // this.axios.post(this.myIp + "Manage/getAccountList",
  // 获取权限接口
  // this.axios.post(this.myIp + "Manage/getRoleList",
  // this.axios.post(this.myIp + "Manage/getPermissionList",
  console.log('第'+values)
  component.axios.post(component.myIp + url,
    component.Qs.stringify(
      values
    )).then(response => {
    //  处理数据，将数据布置到组件上
    console.log(response.data)
    component.total = response.data.data.count
    component.tableData = response.data.data[listName]
  }).catch(error=>{
    console.log(error)
  })
}

/**
 * 添加数据
 * @param component 当前组件
 * @param url
 * @param data 表单数据
 * @returns {Promise<AxiosResponse<T>>} 返回promise
 */
export function addData (component, url, data) {
  return component.axios.post(component.myIp + url,
    component.Qs.stringify(data)
    )
}