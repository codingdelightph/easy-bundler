import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/pkg-images/pkg-images.reducer'

test('attempt retrieving a single pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.pkgImage).toBe(null)
})

test('attempt retrieving a list of pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.pkgImages).toEqual([])
})

test('attempt updating a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.pkgImage).toEqual({ id: 1 })
})

test('success retrieving a list of pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.pkgImages).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.pkgImage).toEqual({ id: 1 })
})
test('success searching a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.pkgImages).toEqual({ id: 1 })
})
test('success deleting a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.pkgImage).toEqual(null)
})

test('failure retrieving a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.pkgImage).toEqual(null)
})

test('failure retrieving a list of pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.pkgImages).toEqual([])
})

test('failure updating a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.pkgImage).toEqual(INITIAL_STATE.pkgImage)
})
test('failure searching a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.pkgImages).toEqual([])
})
test('failure deleting a pkgImage', () => {
  const state = reducer(INITIAL_STATE, Actions.pkgImageDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.pkgImage).toEqual(INITIAL_STATE.pkgImage)
})
