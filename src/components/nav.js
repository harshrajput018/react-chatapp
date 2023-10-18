import { NavLink, useNavigate} from "react-router-dom"

import "../styles/nav.css"

export default function Nav() {

    const navigate = useNavigate();
    console.log('nav')

    return (
        <div>
            {
                localStorage.getItem('token') ? <div className="navbar" style={{ height: '10vh', display: 'flex',padding:'0rem 4rem 0rem 2rem', alignItems: 'center' }}>
                <h1 style={{flex:'12'}} >TICKLE</h1>
                <NavLink to={'/chat'} id="nav1"  className="navItem" style={{ textAlign: 'center' ,textDecoration:'none', flex:'1' }}>Chat</NavLink>
                <NavLink to={'/friends'} id="nav2"  className="navItem" style={{ textAlign: 'center', textDecoration:'none', flex:'1' }}>Friends</NavLink>
                <NavLink to={'/'}  id="nav3"  className="navItem" style={{ flex:'1',textAlign: 'center', textDecoration:'none', cursor:'pointer' }} onClick={()=>{
                    
                    localStorage.removeItem('token');
                    localStorage.setItem('logoutFlag', 'true');
                }}>Logout</NavLink>
            </div>: <div></div>
}

            
        </div>

        


    )
}