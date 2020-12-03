import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/item-master/item-master.reducer'

test('attempt retrieving a single itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.itemMaster).toBe(null)
})

test('attempt retrieving a list of itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.itemMasters).toEqual([])
})

test('attempt updating a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.itemMaster).toEqual({ id: 1 })
})

test('success retrieving a list of itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.itemMasters).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.itemMaster).toEqual({ id: 1 })
})
test('success searching a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.itemMasters).toEqual({ id: 1 })
})
test('success deleting a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.itemMaster).toEqual(null)
})

test('failure retrieving a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.itemMaster).toEqual(null)
})

test('failure retrieving a list of itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.itemMasters).toEqual([])
})

test('failure updating a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.itemMaster).toEqual(INITIAL_STATE.itemMaster)
})
test('failure searching a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.itemMasters).toEqual([])
})
test('failure deleting a itemMaster', () => {
  const state = reducer(INITIAL_STATE, Actions.itemMasterDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.itemMaster).toEqual(INITIAL_STATE.itemMaster)
})
