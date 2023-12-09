import type {Dispatch} from 'react'
import React, {useContext} from 'react'
import {act, render} from '@testing-library/react'
import StoreProvider, {GlobalContext} from '@/store/configureStore'
import type {TRootActions, TRootState} from '@/typing/store'
import {rootState} from '@/store'
import {siteBuilder} from '../builders/stateBuilder'

describe('Configure Store Test', () => {
  beforeEach(jest.resetAllMocks)
  afterEach(jest.resetAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(
      <StoreProvider>
        <div />
      </StoreProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('should give the initial State', () => {
    let store: {state: TRootState; dispatch: Dispatch<TRootActions>}

    function TestComponent() {
      store = useContext(GlobalContext)!
      return null
    }

    const {container} = render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    )

    expect(container).toMatchSnapshot()
    expect(store!.state).toStrictEqual(rootState)
  })

  it('should update State on dispatch call', () => {
    let store: {state: TRootState; dispatch: Dispatch<TRootActions>}

    function TestComponent() {
      store = useContext(GlobalContext)!
      return null
    }

    const {container} = render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    )

    expect(container).toMatchSnapshot()
    expect(store!.state).toStrictEqual(rootState)

    expect(store!.state.site.title).toStrictEqual('Cloud')
    const site = siteBuilder({title: 'updated Title'})
    act(() => {
      store.dispatch({type: 'SITE_UPDATE_STATE', payload: {site}})
    })
    expect(store!.state.site.title).toStrictEqual('updated Title')
  })
})
