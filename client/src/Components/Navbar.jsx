

function Navbar(){
    return(
        <>
            <nav className="nav">
                <h4 className="site-title">Study Tracker</h4>
                <ul>
                    <li className="active">
                        <a href="/study">Study</a>
                    
                    </li>
                    <li className="active">
                        <a href="/history">My History</a>
                    </li>
                    <li className="active">
                        <a href="/about">About</a>
                    </li>
                </ul>
                <p>Logged user: {sessionStorage.getItem('user')}</p>
                <p className="logout">
                    <a href="/">Logout</a>
                </p>

            </nav>
        </>
    )
}

export default Navbar