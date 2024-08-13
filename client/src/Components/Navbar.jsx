

function Navbar(){
    return(
        <>
            <nav className="nav">
                <a href="/" className="site-title">Study Tracker</a>
                <ul>
                    <li className="active">
                        <a href="/">Home</a>
                    
                    </li>
                    <li className="active">
                        <a href="/history">My History</a>
                    </li>
                    <li className="active">
                        <a href="/about">About</a>
                    </li>
                </ul>

            </nav>
        </>
    )
}

export default Navbar