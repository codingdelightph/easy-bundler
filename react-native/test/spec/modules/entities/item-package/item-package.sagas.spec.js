import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getItemPackage,
  getItemPackages,
  updateItemPackage,
  deleteItemPackage,
  searchItemPackages,
} from '../../../../../app/modules/entities/item-package/item-package.sagas'
import ItemPackageActions from '../../../../../app/modules/entities/item-package/item-package.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getItemPackage(1)
  const step = stepper(getItemPackage(FixtureAPI, { itemPackageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getItemPackage(FixtureAPI, { itemPackageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getItemPackages()
  const step = stepper(getItemPackages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getItemPackages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateItemPackage({ id: 1 })
  const step = stepper(updateItemPackage(FixtureAPI, { itemPackage: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateItemPackage(FixtureAPI, { itemPackage: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchItemPackages()
  const step = stepper(searchItemPackages(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchItemPackages(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteItemPackage({ id: 1 })
  const step = stepper(deleteItemPackage(FixtureAPI, { itemPackageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteItemPackage(FixtureAPI, { itemPackageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageActions.itemPackageDeleteFailure()))
})
