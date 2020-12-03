import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getPkgImage,
  getPkgImages,
  updatePkgImage,
  deletePkgImage,
  searchPkgImages,
} from '../../../../../app/modules/entities/pkg-images/pkg-images.sagas'
import PkgImageActions from '../../../../../app/modules/entities/pkg-images/pkg-images.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getPkgImage(1)
  const step = stepper(getPkgImage(FixtureAPI, { pkgImageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getPkgImage(FixtureAPI, { pkgImageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getPkgImages()
  const step = stepper(getPkgImages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getPkgImages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updatePkgImage({ id: 1 })
  const step = stepper(updatePkgImage(FixtureAPI, { pkgImage: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updatePkgImage(FixtureAPI, { pkgImage: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchPkgImages()
  const step = stepper(searchPkgImages(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchPkgImages(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deletePkgImage({ id: 1 })
  const step = stepper(deletePkgImage(FixtureAPI, { pkgImageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deletePkgImage(FixtureAPI, { pkgImageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PkgImageActions.pkgImageDeleteFailure()))
})
