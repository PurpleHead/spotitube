class SpotifyService {
  constructor () {
    this.clientId = process.env.CLIENT_ID
  }

  login () {
    const redirectUri = 'http://localhost:9000'
    window.location.replace(`https://accounts.spotify.com/authorize?` +
    `response_type=code&client_id=${this.clientId}&redirect_uri=${redirectUri}`)
  }

}

export const spotifyService = new SpotifyService()
