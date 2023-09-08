import { router } from "./router"
import { AppHome } from "./src/home"
import { AppOther } from "./src/other"

appendScript('/src/home.js')
appendScript('/src/other.js')

router.defineComponent('app-home', AppHome)
router.defineComponent('app-other', AppOther)

router.onPageLoad()

function appendScript (name) {
    let element = document.createElement('script')
    element.setAttribute("src", name)
    element.setAttribute("type", "module")
    document.head.appendChild(element)
}