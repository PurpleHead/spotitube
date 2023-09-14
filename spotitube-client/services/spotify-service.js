import { router } from '../router'

const ACCOUNTS_URI = 'https://accounts.spotify.com'
// const API_URL = 'https://api.spotify.com'
const REDIRECT_URI = 'http://localhost:9000'
const CLIENT_ID = process.env.CLIENT_ID

class SpotifyService {
  async requestAuthorizationCode () {
    const state = this.generateRandomString(16)
    const codeVerifier = this.generateRandomString(128)
    const codeChallenge = await this.generateCodeChallenge(codeVerifier)
    const urlParams = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    })

    localStorage.setItem('code_verifier', codeVerifier)
    window.location.replace(`${ACCOUNTS_URI}/authorize?${urlParams.toString()}`)
  }

  async requestAccessToken (authCode) {
    const codeVerifier = localStorage.getItem('code_verifier')
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier
    })

    await fetch(`${ACCOUNTS_URI}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }).then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status)
      }
      return response.json()
    })
      .then(data => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
      })
      .catch(error => {
        console.error('Error:', error)
      }).finally(() => {
      // Remove code from Url params:
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.delete('code')
        searchParams.delete('state')
        router.updateUrlParams(searchParams)
      })
  }

  // From https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
  generateRandomString (length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  // From https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
  async generateCodeChallenge (codeVerifier) {
    function base64encode (string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)

    return base64encode(digest)
  }
}

export const spotifyService = new SpotifyService()
