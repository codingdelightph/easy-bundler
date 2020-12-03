import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getItemPackageDetail,
  getItemPackageDetails,
  updateItemPackageDetail,
  deleteItemPackageDetail,
  searchItemPackageDetails,
} from '../../../../../app/modules/entities/item-package-details/item-package-details.sagas'
import ItemPackageDetailActions from '../../../../../app/modules/entities/item-package-details/item-package-details.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getItemPackageDetail(1)
  const step = stepper(getItemPackageDetail(FixtureAPI, { itemPackageDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getItemPackageDetail(FixtureAPI, { itemPackageDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getItemPackageDetails()
  const step = stepper(getItemPackageDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getItemPackageDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateItemPackageDetail({ id: 1 })
  const step = stepper(updateItemPackageDetail(FixtureAPI, { itemPackageDetail: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateItemPackageDetail(FixtureAPI, { itemPackageDetail: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchItemPackageDetails()
  const step = stepper(searchItemPackageDetails(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchItemPackageDetails(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteItemPackageDetail({ id: 1 })
  const step = stepper(deleteItemPackageDetail(FixtureAPI, { itemPackageDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteItemPackageDetail(FixtureAPI, { itemPackageDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemPackageDetailActions.itemPackageDetailDeleteFailure()))
})
