import WebClient from 'web-client-starter'
import {initWebClient} from '../../src/services/webClient'
import type {Toast} from '../../src/hooks'

jest.mock('../../src/hooks/useToast')

describe('WebClient Test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return webclient', () => {
    const webClient = initWebClient(jest.fn() as unknown as Toast)

    expect(webClient).toStrictEqual(WebClient)
  })
})
