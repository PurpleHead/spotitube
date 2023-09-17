import { router } from './router'
import { spotifyService } from './services/spotify-service'
import { AppHome } from './src/home'
import { AppOther } from './src/other'

const dotenv = require('dotenv')
dotenv.config()

router.defineComponent('app-home', AppHome)
router.defineComponent('app-other', AppOther)

router.onPageLoad()
spotifyService.init()
