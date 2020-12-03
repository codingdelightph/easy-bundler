import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getItemMaster,
  getItemMasters,
  updateItemMaster,
  deleteItemMaster,
  searchItemMasters,
} from '../../../../../app/modules/entities/item-master/item-master.sagas'
import ItemMasterActions from '../../../../../app/modules/entities/item-master/item-master.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getItemMaster(1)
  const step = stepper(getItemMaster(FixtureAPI, { itemMasterId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getItemMaster(FixtureAPI, { itemMasterId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getItemMasters()
  const step = stepper(getItemMasters(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getItemMasters(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateItemMaster({ id: 1 })
  const step = stepper(updateItemMaster(FixtureAPI, { itemMaster: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateItemMaster(FixtureAPI, { itemMaster: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchItemMasters()
  const step = stepper(searchItemMasters(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchItemMasters(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteItemMaster({ id: 1 })
  const step = stepper(deleteItemMaster(FixtureAPI, { itemMasterId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteItemMaster(FixtureAPI, { itemMasterId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemMasterActions.itemMasterDeleteFailure()))
})
