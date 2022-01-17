let defaultCity = '上海'
// 当使用到localStorage时，都建议使用try..catch包裹，避免有些用户关闭了localStorage的功能，导致整个项目代码崩溃
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default {
  city: defaultCity
}
