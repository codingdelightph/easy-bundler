// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const getOauthInfo = () => api.get('api/auth-info')
  const getOauthIssuerInfo = (issuerUrl) => api.get(`${issuerUrl}/.well-known/openid-configuration`)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    })

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    )

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getItemMaster = (itemMasterId) => api.get('api/item-masters/' + itemMasterId)
  const getItemMasters = (options) => api.get('api/item-masters', options)
  const createItemMaster = (itemMaster) => api.post('api/item-masters', itemMaster)
  const updateItemMaster = (itemMaster) => api.put('api/item-masters', itemMaster)
  const deleteItemMaster = (itemMasterId) => api.delete('api/item-masters/' + itemMasterId)
  const searchItemMasters = (query) => api.get('api/_search/item-masters', { query: query })

  const getItemPackage = (itemPackageId) => api.get('api/item-packages/' + itemPackageId)
  const getItemPackages = (options) => api.get('api/item-packages', options)
  const createItemPackage = (itemPackage) => api.post('api/item-packages', itemPackage)
  const updateItemPackage = (itemPackage) => api.put('api/item-packages', itemPackage)
  const deleteItemPackage = (itemPackageId) => api.delete('api/item-packages/' + itemPackageId)
  const searchItemPackages = (query) => api.get('api/_search/item-packages', { query: query })

  const getItemPackageDetail = (itemPackageDetailId) => api.get('api/item-package-details/' + itemPackageDetailId)
  const getItemPackageDetails = (options) => api.get('api/item-package-details', options)
  const createItemPackageDetail = (itemPackageDetail) => api.post('api/item-package-details', itemPackageDetail)
  const updateItemPackageDetail = (itemPackageDetail) => api.put('api/item-package-details', itemPackageDetail)
  const deleteItemPackageDetail = (itemPackageDetailId) => api.delete('api/item-package-details/' + itemPackageDetailId)
  const searchItemPackageDetails = (query) => api.get('api/_search/item-package-details', { query: query })

  const getPkgImage = (pkgImageId) => api.get('api/pkg-images/' + pkgImageId)
  const getPkgImages = (options) => api.get('api/pkg-images', options)
  const createPkgImage = (pkgImage) => api.post('api/pkg-images', pkgImage)
  const updatePkgImage = (pkgImage) => api.put('api/pkg-images', pkgImage)
  const deletePkgImage = (pkgImageId) => api.delete('api/pkg-images/' + pkgImageId)
  const searchPkgImages = (query) => api.get('api/_search/pkg-images', { query: query })

  const getUserProduct = (userProductId) => api.get('api/user-products/' + userProductId)
  const getUserProducts = (options) => api.get('api/user-products', options)
  const createUserProduct = (userProduct) => api.post('api/user-products', userProduct)
  const updateUserProduct = (userProduct) => api.put('api/user-products', userProduct)  
  //const updateUserProductImage = (userProduct, dataForm) => api.put('api/user-products-image', userProduct, dataForm,  {headers:{"Content-Type": "multipart/form-data"}})  
  const updateUserProductImage = (formData) => api.put('api/user-products-image', formData)  
  const deleteUserProduct = (userProductId) => api.delete('api/user-products/' + userProductId)
  const searchUserProducts = (query) => api.get('api/_search/user-products', { query: query })
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createItemMaster,
    updateItemMaster,
    getItemMasters,
    getItemMaster,
    deleteItemMaster,
    searchItemMasters,

    createItemPackage,
    updateItemPackage,
    getItemPackages,
    getItemPackage,
    deleteItemPackage,
    searchItemPackages,

    createItemPackageDetail,
    updateItemPackageDetail,
    getItemPackageDetails,
    getItemPackageDetail,
    deleteItemPackageDetail,
    searchItemPackageDetails,

    createPkgImage,
    updatePkgImage,
    getPkgImages,
    getPkgImage,
    deletePkgImage,
    searchPkgImages,

    createUserProduct,
    updateUserProduct,
    updateUserProductImage,
    getUserProducts,
    getUserProduct,
    deleteUserProduct,
    searchUserProducts,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    getOauthInfo,
    getOauthIssuerInfo,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
