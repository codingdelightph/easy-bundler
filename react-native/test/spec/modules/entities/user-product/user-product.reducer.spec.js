import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/user-product/user-product.reducer'

test('attempt retrieving a single userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.userProduct).toBe(null)
})

test('attempt retrieving a list of userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.userProducts).toEqual([])
})

test('attempt updating a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})

test('attempt updating a userProduct image', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductImageRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})

test('attempt searching a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.userProduct).toEqual({ id: 1 })
})

test('success retrieving a list of userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.userProducts).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.userProduct).toEqual({ id: 1 })
})
test('success searching a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.userProducts).toEqual({ id: 1 })
})
test('success deleting a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.userProduct).toEqual(null)
})

test('failure retrieving a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.userProduct).toEqual(null)
})

test('failure retrieving a list of userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.userProducts).toEqual([])
})

test('failure updating a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.userProduct).toEqual(INITIAL_STATE.userProduct)
})
test('failure searching a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.userProducts).toEqual([])
})
test('failure deleting a userProduct', () => {
  const state = reducer(INITIAL_STATE, Actions.userProductDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.userProduct).toEqual(INITIAL_STATE.userProduct)
})
