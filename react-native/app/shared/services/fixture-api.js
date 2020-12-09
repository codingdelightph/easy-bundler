export default {
  // Functions return fixtures

  // entity fixtures
  updateItemMaster: (itemMaster) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-itemmaster.json'),
    }
  },
  getItemMasters: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-itemmasters.json'),
    }
  },
  getItemMaster: (itemMasterId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-itemmaster.json'),
    }
  },
  deleteItemMaster: (itemMasterId) => {
    return {
      ok: true,
    }
  },
  searchItemMasters: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-itemmasters.json'),
    }
  },
  updateItemPackage: (itemPackage) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-itempackage.json'),
    }
  },
  getItemPackages: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-itempackages.json'),
    }
  },
  getItemPackage: (itemPackageId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-itempackage.json'),
    }
  },
  deleteItemPackage: (itemPackageId) => {
    return {
      ok: true,
    }
  },
  searchItemPackages: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-itempackages.json'),
    }
  },
  updateItemPackageDetail: (itemPackageDetail) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-itempackagedetail.json'),
    }
  },
  getItemPackageDetails: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-itempackagedetails.json'),
    }
  },
  getItemPackageDetail: (itemPackageDetailId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-itempackagedetail.json'),
    }
  },
  deleteItemPackageDetail: (itemPackageDetailId) => {
    return {
      ok: true,
    }
  },
  searchItemPackageDetails: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-itempackagedetails.json'),
    }
  },
  updatePkgImage: (pkgImage) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-pkgimage.json'),
    }
  },
  getPkgImages: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-pkgimages.json'),
    }
  },
  getPkgImage: (pkgImageId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-pkgimage.json'),
    }
  },
  deletePkgImage: (pkgImageId) => {
    return {
      ok: true,
    }
  },
  searchPkgImages: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-pkgimages.json'),
    }
  },
  updateUserProduct: (userProduct) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-userproduct.json'),
    }
  },
  updateUserProductImage: (userProductId, dataForm) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-userproduct-image.json'),
    }
  },
  getUserProducts: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-userproducts.json'),
    }
  },
  getUserProduct: (userProductId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-userproduct.json'),
    }
  },
  deleteUserProduct: (userProductId) => {
    return {
      ok: true,
    }
  },
  searchUserProducts: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-userproducts.json'),
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    }
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  getOauthInfo: () => {
    return {
      ok: true,
      data: require('../fixtures/get-oauth-info.json'),
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      }
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    }
  },
  updateAccount: () => {
    return {
      ok: true,
    }
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Password error',
      }
    }
  },
}
