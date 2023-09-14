import { NavLink, useNavigate} from "react-router-dom"
import "../styles/nav.css"

export default function Nav() {

    const navigate = useNavigate()
    console.log('nav')

    return (
        <div>
            {
                localStorage.getItem('token') ? <div style={{ height: '3rem', display: 'flex', paddingRight: '7rem', alignItems: 'center', gap: '2rem', justifyContent: 'flex-end', background:'none' }}>
                <NavLink to={'/chat'} id="nav1"  className="navItem" style={{ textAlign: 'center', fontWeight: "bolder" ,textDecoration:'none' }}>Chat</NavLink>
                <NavLink to={'/friends'} id="nav2"  className="navItem" style={{ textAlign: 'center', fontWeight: "bolder", textDecoration:'none', color:'black' }}>Friends</NavLink>
                <div id="nav3"  className="navItem" style={{ textAlign: 'end', fontWeight: "bolder", textDecoration:'none', color:'black', cursor:'pointer' }} onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.setItem('logoutFlag', 'true');
                    navigate('/')
                    
                }}>Logout</div>
            </div>: <div></div>
}

            
        </div>

        


    )
}