import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/item-package/item-package.reducer'

test('attempt retrieving a single itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.itemPackage).toBe(null)
})

test('attempt retrieving a list of itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.itemPackages).toEqual([])
})

test('attempt updating a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.itemPackage).toEqual({ id: 1 })
})

test('success retrieving a list of itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.itemPackages).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.itemPackage).toEqual({ id: 1 })
})
test('success searching a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.itemPackages).toEqual({ id: 1 })
})
test('success deleting a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.itemPackage).toEqual(null)
})

test('failure retrieving a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.itemPackage).toEqual(null)
})

test('failure retrieving a list of itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.itemPackages).toEqual([])
})

test('failure updating a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.itemPackage).toEqual(INITIAL_STATE.itemPackage)
})
test('failure searching a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.itemPackages).toEqual([])
})
test('failure deleting a itemPackage', () => {
  const state = reducer(INITIAL_STATE, Actions.itemPackageDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.itemPackage).toEqual(INITIAL_STATE.itemPackage)
})
