import { router } from './router'
import { AppHome } from './src/home'
import { AppOther } from './src/other'

const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.APP_ID)

router.defineComponent('app-home', AppHome)
router.defineComponent('app-other', AppOther)

router.onPageLoad()
