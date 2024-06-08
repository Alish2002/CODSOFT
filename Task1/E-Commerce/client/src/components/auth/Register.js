import React,{useState} from 'react'

const Register = () => {
    const [user,setUser]=useState({
        username:'',
        password:''
    })
   
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        // console.log("name "+ name);
        // console.log("value " +value);
        setUser({
            ...user,    // ... to make copy of object/array
            [name]:value
        }
        );
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
            const response= await fetch('http://localhost:5000/api/auth/register',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
        
                },
                body:JSON.stringify(user)
            });
            const data=await response.json();
            console.log(data);
        }
        catch(error){
            console.error(error)
        }
    }
  return (
    <div className='container'>
        <div className='login-head'>Register:</div>
       <form>
       <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
         <button className='login-button' type='submit'  onClick={(e)=>{handleSubmit(e)}} >Register</button> 
       </form>
    </div>
  )
}

export default Register
