import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getUserProduct,
  getUserProducts,
  updateUserProduct,
  deleteUserProduct,
  searchUserProducts,
} from '../../../../../app/modules/entities/user-product/user-product.sagas'
import UserProductActions from '../../../../../app/modules/entities/user-product/user-product.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getUserProduct(1)
  const step = stepper(getUserProduct(FixtureAPI, { userProductId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProductActions.userProductSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getUserProduct(FixtureAPI, { userProductId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProductActions.userProductFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getUserProducts()
  const step = stepper(getUserProducts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProductActions.userProductAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getUserProducts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProductActions.userProductAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateUserProduct({ id: 1 })
  const step = stepper(updateUserProduct(FixtureAPI, { userProduct: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProductActions.userProductUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateUserProduct(FixtureAPI, { userProduct: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProductActions.userProductUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchUserProducts()
  const step = stepper(searchUserProducts(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProductActions.userProductSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchUserProducts(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProductActions.userProductSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteUserProduct({ id: 1 })
  const step = stepper(deleteUserProduct(FixtureAPI, { userProductId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProductActions.userProductDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteUserProduct(FixtureAPI, { userProductId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProductActions.userProductDeleteFailure()))
})
