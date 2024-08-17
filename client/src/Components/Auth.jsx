import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  

  sessionStorage.clear()
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enteredInvalidCred, setEnteredInvalidCred] = useState(false)  
  const [emailExists, setEmailExists] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEmailExists(false)
    setPasswordMatch(true)
    setEnteredInvalidCred(false)
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setPasswordMatch(true)
    setEmailExists(false)
    e.preventDefault();
    if(!isLogin){
      if (!user || !email || !password) {
        alert('Please fill out all fields correctly.');
        return;
      }
      else if(!isLogin && password !== confirmPassword){
        setPasswordMatch(false)
        return
      }
    }
    else{
      if(!email || !password){
        alert('Please fill out all fields correctly.');
        return;
      }
    }

    if(isLogin)
      loginAPI(email, password)
    signupAPI(user, email, password)
  };

  const loginAPI = async (email, password) => {
    setEnteredInvalidCred(false)
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}api/v1/auth/login`, {
            email: email,
            password: password
        })
        setEnteredInvalidCred(false)
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('user', res.data.user.username)
        navigate('/study')
    }
    catch(error){
        setEnteredInvalidCred(true)
    }   
  }

  const signupAPI = async (user, email, password) => {
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}api/v1/auth/register`, {
          username: user,
          email: email,
          password: password
      })
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('user', res.data.user.username)
      navigate('/study')
      setEmailExists(false)
  }
  catch(error){
      setEmailExists(true)
  }   
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
      {!isLogin && (<input
          type="text"
          placeholder="Username"
          minLength={3}
          maxLength={16}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={styles.input}
        />)}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {isLogin && enteredInvalidCred && (
            <p style={styles.invalidcred}>Wrong email or password</p>
        )}
        {!isLogin && (
          <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          />
        )}

        {!isLogin && emailExists && (
          <p style={styles.invalidcred}>An account with this email already exists</p>
        )
        }
        {!isLogin && !emailExists && !passwordMatch && (
          <p style={styles.invalidcred}>Passwords don't match</p>
        )}
        
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button onClick={toggleAuthMode} style={styles.toggleButton}>
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </button>
      <button onClick={()=>loginAPI("guest@mail.com", "123456")} style={styles.demo}>
        Or login as guest (demo)
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '25%',
    height: '50%',
    background: '#c4b493',
    margin: '50px auto',
    marginTop: '150px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#5ca825',
    color: '#fff',
    cursor: 'pointer',
  },
  toggleButton: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '14px',
    background: 'none',
    border: 'none',
    color: '#5e4c42',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  demo: {
    marginTop: '0px',
    padding: '10px',
    fontSize: '14px',
    background: 'none',
    border: 'none',
    color: '#5e4c42',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  invalidcred: {
    height: '60px',
    padding: '10px',
    margin: '10px 0',
    fontSize: '14px',
    display: 'flex',            
    alignItems: 'center',      
    justifyContent: 'center',  
    textAlign: 'center',        
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: 'white',
    background: '#851821'
  },
  h2: {
    color: 'white',
    fontSize: '35px'
  }
};

export default AuthPage;
