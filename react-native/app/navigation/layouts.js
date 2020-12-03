import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import React from 'react'
import { Images } from '../shared/themes'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import StorybookScreen from '../../storybook'
import ItemMasterEntityScreen from '../modules/entities/item-master/item-master-entity-screen'
import ItemMasterEntityDetailScreen from '../modules/entities/item-master/item-master-entity-detail-screen'
import ItemMasterEntityEditScreen from '../modules/entities/item-master/item-master-entity-edit-screen'
import ItemPackageEntityScreen from '../modules/entities/item-package/item-package-entity-screen'
import ItemPackageEntityDetailScreen from '../modules/entities/item-package/item-package-entity-detail-screen'
import ItemPackageEntityEditScreen from '../modules/entities/item-package/item-package-entity-edit-screen'
import ItemPackageDetailEntityScreen from '../modules/entities/item-package-details/item-package-details-entity-screen'
import ItemPackageDetailEntityDetailScreen from '../modules/entities/item-package-details/item-package-details-entity-detail-screen'
import ItemPackageDetailEntityEditScreen from '../modules/entities/item-package-details/item-package-details-entity-edit-screen'
import PkgImageEntityScreen from '../modules/entities/pkg-images/pkg-images-entity-screen'
import PkgImageEntityDetailScreen from '../modules/entities/pkg-images/pkg-images-entity-detail-screen'
import PkgImageEntityEditScreen from '../modules/entities/pkg-images/pkg-images-entity-edit-screen'
import UserProductEntityScreen from '../modules/entities/user-product/user-product-entity-screen'
import UserProductEntityDetailScreen from '../modules/entities/user-product/user-product-entity-detail-screen'
import UserProductEntityEditScreen from '../modules/entities/user-product/user-product-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const STORYBOOK_SCREEN = 'nav.StorybookScreen'
export const ITEM_MASTER_ENTITY_SCREEN = 'nav.ItemMasterEntityScreen'
export const ITEM_MASTER_ENTITY_DETAIL_SCREEN = 'nav.ItemMasterEntityDetailScreen'
export const ITEM_MASTER_ENTITY_EDIT_SCREEN = 'nav.ItemMasterEntityEditScreen'
export const ITEM_PACKAGE_ENTITY_SCREEN = 'nav.ItemPackageEntityScreen'
export const ITEM_PACKAGE_ENTITY_DETAIL_SCREEN = 'nav.ItemPackageEntityDetailScreen'
export const ITEM_PACKAGE_ENTITY_EDIT_SCREEN = 'nav.ItemPackageEntityEditScreen'
export const ITEM_PACKAGE_DETAIL_ENTITY_SCREEN = 'nav.ItemPackageDetailEntityScreen'
export const ITEM_PACKAGE_DETAIL_ENTITY_DETAIL_SCREEN = 'nav.ItemPackageDetailEntityDetailScreen'
export const ITEM_PACKAGE_DETAIL_ENTITY_EDIT_SCREEN = 'nav.ItemPackageDetailEntityEditScreen'
export const PKG_IMAGE_ENTITY_SCREEN = 'nav.PkgImageEntityScreen'
export const PKG_IMAGE_ENTITY_DETAIL_SCREEN = 'nav.PkgImageEntityDetailScreen'
export const PKG_IMAGE_ENTITY_EDIT_SCREEN = 'nav.PkgImageEntityEditScreen'
export const USER_PRODUCT_ENTITY_SCREEN = 'nav.UserProductEntityScreen'
export const USER_PRODUCT_ENTITY_DETAIL_SCREEN = 'nav.UserProductEntityDetailScreen'
export const USER_PRODUCT_ENTITY_EDIT_SCREEN = 'nav.UserProductEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT,
        },
      },
      center: {
        stack: {
          id: 'center',
          children: [
            {
              component: {
                name: LAUNCH_SCREEN,
                options: {
                  topBar: {
                    title: {
                      text: 'Welcome!',
                      color: Colors.snow,
                    },
                    leftButtons: [
                      {
                        id: 'menuButton',
                        icon: Images.menuIcon,
                        testID: 'menuButton',
                        color: Colors.snow,
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
}

let lastAppState = 'active'
function handleAppStateChange(nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount() {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL(event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/') // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3) // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log('Sending to Register Page')
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

function registerComponentWithRedux(SCREEN_NAME, Component) {
  Navigation.registerComponent(
    SCREEN_NAME,
    () => (props) => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    ),
    () => Component,
  )
}

// registers screens (except the launch screen) as lazily loaded
function registerScreensLazily() {
  Navigation.setLazyComponentRegistrator((componentName) => {
    switch (componentName) {
      case LAUNCH_SCREEN:
        registerComponentWithRedux(LAUNCH_SCREEN, LaunchScreen)
        break
      case STORYBOOK_SCREEN:
        Navigation.registerComponent(STORYBOOK_SCREEN, () => StorybookScreen)
        break
      case LOGIN_SCREEN:
        registerComponentWithRedux(LOGIN_SCREEN, LoginScreen)
        break
      case REGISTER_SCREEN:
        registerComponentWithRedux(REGISTER_SCREEN, RegisterScreen)
        break
      case FORGOT_PASSWORD_SCREEN:
        registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, ForgotPasswordScreen)
        break
      case CHANGE_PASSWORD_SCREEN:
        registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, ChangePasswordScreen)
        break
      case SETTINGS_SCREEN:
        registerComponentWithRedux(SETTINGS_SCREEN, SettingsScreen)
        break
      case DRAWER_CONTENT:
        registerComponentWithRedux(DRAWER_CONTENT, DrawerContent)
        break
      case ENTITIES_SCREEN:
        registerComponentWithRedux(ENTITIES_SCREEN, EntitiesScreen)
        break
      case ITEM_MASTER_ENTITY_SCREEN:
        registerComponentWithRedux(ITEM_MASTER_ENTITY_SCREEN, ItemMasterEntityScreen)
        break
      case ITEM_MASTER_ENTITY_DETAIL_SCREEN:
        registerComponentWithRedux(ITEM_MASTER_ENTITY_DETAIL_SCREEN, ItemMasterEntityDetailScreen)
        break
      case ITEM_MASTER_ENTITY_EDIT_SCREEN:
        registerComponentWithRedux(ITEM_MASTER_ENTITY_EDIT_SCREEN, ItemMasterEntityEditScreen)
        break
      case ITEM_PACKAGE_ENTITY_SCREEN:
        registerComponentWithRedux(ITEM_PACKAGE_ENTITY_SCREEN, ItemPackageEntityScreen)
        break
      case ITEM_PACKAGE_ENTITY_DETAIL_SCREEN:
        registerComponentWithRedux(ITEM_PACKAGE_ENTITY_DETAIL_SCREEN, ItemPackageEntityDetailScreen)
        break
      case ITEM_PACKAGE_ENTITY_EDIT_SCREEN:
        registerComponentWithRedux(ITEM_PACKAGE_ENTITY_EDIT_SCREEN, ItemPackageEntityEditScreen)
        break
      case ITEM_PACKAGE_DETAIL_ENTITY_SCREEN:
        registerComponentWithRedux(ITEM_PACKAGE_DETAIL_ENTITY_SCREEN, ItemPackageDetailEntityScreen)
        break
      case ITEM_PACKAGE_DETAIL_ENTITY_DETAIL_SCREEN:
        registerComponentWithRedux(ITEM_PACKAGE_DETAIL_ENTITY_DETAIL_SCREEN, ItemPackageDetailEntityDetailScreen)
        break
      case ITEM_PACKAGE_DETAIL_ENTITY_EDIT_SCREEN:
        registerComponentWithRedux(ITEM_PACKAGE_DETAIL_ENTITY_EDIT_SCREEN, ItemPackageDetailEntityEditScreen)
        break
      case PKG_IMAGE_ENTITY_SCREEN:
        registerComponentWithRedux(PKG_IMAGE_ENTITY_SCREEN, PkgImageEntityScreen)
        break
      case PKG_IMAGE_ENTITY_DETAIL_SCREEN:
        registerComponentWithRedux(PKG_IMAGE_ENTITY_DETAIL_SCREEN, PkgImageEntityDetailScreen)
        break
      case PKG_IMAGE_ENTITY_EDIT_SCREEN:
        registerComponentWithRedux(PKG_IMAGE_ENTITY_EDIT_SCREEN, PkgImageEntityEditScreen)
        break
      case USER_PRODUCT_ENTITY_SCREEN:
        registerComponentWithRedux(USER_PRODUCT_ENTITY_SCREEN, UserProductEntityScreen)
        break
      case USER_PRODUCT_ENTITY_DETAIL_SCREEN:
        registerComponentWithRedux(USER_PRODUCT_ENTITY_DETAIL_SCREEN, UserProductEntityDetailScreen)
        break
      case USER_PRODUCT_ENTITY_EDIT_SCREEN:
        registerComponentWithRedux(USER_PRODUCT_ENTITY_EDIT_SCREEN, UserProductEntityEditScreen)
        break
      // ignite-jhipster-navigation-registration-needle
      default:
        break
    }
  })
}

export function registerScreensAndStartApp() {
  registerScreensLazily()

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow,
          },
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow,
        },
        background: {
          color: Colors.background,
        },
      },
      sideMenu: {
        left: {
          enabled: false,
        },
      },
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: LOGIN_SCREEN,
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
          },
        },
      ],
    },
  })

export const registerScreen = () =>
  Navigation.push('center', {
    component: {
      name: REGISTER_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Sign Up',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const forgotPasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: FORGOT_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Forgot Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const changePasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: CHANGE_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Change Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const settingsScreen = () =>
  Navigation.push('center', {
    component: {
      name: SETTINGS_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Settings',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const entitiesScreen = () =>
  Navigation.push('center', {
    component: {
      name: ENTITIES_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Entities',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const storybookScreen = () => {
  Navigation.push('center', {
    component: {
      name: STORYBOOK_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Storybook',
            color: Colors.snow,
          },
        },
      },
    },
  })
}

export const itemMasterEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: ITEM_MASTER_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'ItemMasters',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'itemMasterCreateButton',
            },
          ],
        },
      },
    },
  })

export const itemMasterEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ITEM_MASTER_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'ItemMasters',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const itemMasterEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ITEM_MASTER_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'ItemMasters',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const itemPackageEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: ITEM_PACKAGE_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'ItemPackages',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'itemPackageCreateButton',
            },
          ],
        },
      },
    },
  })

export const itemPackageEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ITEM_PACKAGE_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'ItemPackages',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const itemPackageEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ITEM_PACKAGE_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'ItemPackages',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const itemPackageDetailEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: ITEM_PACKAGE_DETAIL_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'ItemPackageDetails',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'itemPackageDetailCreateButton',
            },
          ],
        },
      },
    },
  })

export const itemPackageDetailEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ITEM_PACKAGE_DETAIL_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'ItemPackageDetails',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const itemPackageDetailEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ITEM_PACKAGE_DETAIL_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'ItemPackageDetails',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const pkgImageEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: PKG_IMAGE_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'PkgImages',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'pkgImageCreateButton',
            },
          ],
        },
      },
    },
  })

export const pkgImageEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: PKG_IMAGE_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'PkgImages',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const pkgImageEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: PKG_IMAGE_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'PkgImages',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const userProductEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: USER_PRODUCT_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'UserProducts',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'userProductCreateButton',
            },
          ],
        },
      },
    },
  })

export const userProductEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: USER_PRODUCT_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'UserProducts',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const userProductEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: USER_PRODUCT_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'UserProducts',
            color: Colors.snow,
          },
        },
      },
    },
  })
// ignite-jhipster-navigation-method-needle
