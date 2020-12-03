import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/item-package-details/item-package-details.reducer'

test('attempt retrieving a single itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.itemPackageDetail).toBe(null)
})

test('attempt retrieving a list of itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.itemPackageDetails).toEqual([])
})

test('attempt updating a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.itemPackageDetail).toEqual({ id: 1 })
})

test('success retrieving a list of itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.itemPackageDetails).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.itemPackageDetail).toEqual({ id: 1 })
})
test('success searching a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.itemPackageDetails).toEqual({ id: 1 })
})
test('success deleting a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.itemPackageDetail).toEqual(null)
})

test('failure retrieving a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.itemPackageDetail).toEqual(null)
})

test('failure retrieving a list of itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.itemPackageDetails).toEqual([])
})

test('failure updating a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.itemPackageDetail).toEqual(INITIAL_STATE.itemPackageDetail)
})
test('failure searching a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.itemPackageDetails).toEqual([])
})
test('failure deleting a itemPackageDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDetailDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.itemPackageDetail).toEqual(INITIAL_STATE.itemPackageDetail)
})
