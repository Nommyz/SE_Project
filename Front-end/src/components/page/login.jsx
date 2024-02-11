import { useRef , useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../libs/firebase'
import { Navigate, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';



const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
        await signInWithEmailAndPassword(auth,email,password)
        if(email == 'teacher@cmu.ac.th'){
          navigate('/teacherboard')
        }else{
          navigate('/studentboard')
        }
    } catch (error) {
        console.log(error)
        setErrorMessage(error.massage)
    }

    
  }

  return (
    <div className='background-login'>
      <form onSubmit={handleSubmit} className="form-container" noValidate >
      <div className='container'>
        <label htmlFor="username">Username</label>
        <TextField label={'Email'} variant='outlined' inputRef={emailRef} type='username' autoComplete='off' required/>
        <label htmlFor="password">Password</label>
        <TextField label={'Password'} variant='outlined' inputRef={passwordRef} type='password' required/>
        <Button sx={{padding:'15px' , margin:'10px 0 10px 0' , fontSize:'1rem'}} variant='contained' color='secondary' type='submit'>Sign In</Button>
      </div>
    </form>
    </div>
  )
}

export default Login


{/* <div className="container">
        <label htmlFor="username">Email</label>
        <input ref={emailRef} type="email" name="username" required />

        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" name="password" required />

        <button type="submit">Login</button>
</div> */}