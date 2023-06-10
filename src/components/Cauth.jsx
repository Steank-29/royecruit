export const Clogin = (token) => {
    localStorage.setItem('companydatatoken', token)
  }
  
  export const Clogout = () => {
    localStorage.removeItem('companydatatoken')
    window.location.href = window.location.origin + '/'
}
  
  export const CgetToken = () => {
    return localStorage.getItem('companydatatoken')
  }
  
  export const iCsAuthenticated = () => {
    const token = CgetToken()
    return token !== null && token !== undefined
  }
  
  export const CgetAuthHeaders = () => {
    const token = CgetToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }