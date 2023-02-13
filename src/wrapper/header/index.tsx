import { Button } from '../../components'
import './header.scss'

const Header = () => {
    return <div className="header">
        <img src='/assets/svgs/opdready-icon.svg' alt='opdready-icon' width={70} height={70} />
        <Button>Connect</Button>
    </div>
}

export default Header
