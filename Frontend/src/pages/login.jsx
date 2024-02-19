
import { object, string } from 'yup';
import { useState } from 'react';

const Login = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    let loginSchema = object({
        email: string().email().required(),
        password: string().required()
    })

    async function ValidateData() {
        let user;
        try {
            user = await loginSchema.validate({email, password});
            console.log("verificado")
        } catch (err) {
            console.log(err)            
            console.log("falhou")            
        }
    }

    return (
        <>
       
            <div className="bg-slate-900 w-screen h-full grid-cols-2 grid">
                <form onSubmit={ValidateData} >
                    <div className="p-20 w-full flex  justify-center items-center">
                        <div className="p-20 w-full h-auto rounded-md bg-gradient-to-t from-slate-900 to-blue-400 grid">
                            <p className="text-2xl font-semibold flex justify-center items-center text-white">Already Registered?</p>
                            
                            <div className="mt-5">
                                <label className="text-xl flex justify-start text-white">Email:</label>
                                <input className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" type="email" onChange={
                                    (e) => { SetEmail(e.target.value); }
                                } required></input>
                            </div>
                            
                            <div className="mt-5">
                                <label className="text-xl flex justify-start text-white">Password:</label>
                                <input className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" type="password" onChange={
                                    (e) => { SetPassword(e.target.value); }
                                } required></input>  
                            </div>

                            <button className="w-full mt-10 p-3 rounded-3xl bg-white text-lg font-bold  hover:border-blue-900/50 border-4">
                            Login
                            </button >
                            <a className="text-white flex mt-5 justify-center items-center">Forgot your password?</a>
                            <a href='/register' className="text-white flex mt-2 justify-center items-center">Don't have an account? - Sign up</a>
                        </div>
                    </div>
                </form>

                <div className="w-full h-full pt-20">
                        <h1 className=" text-white text-3xl w-full justify-center items-center">Check our courses:</h1> 
                        
                        <div className="flex inline w-full gap-3 pt-5 pb-5 ">
                            <div className="bg-slate-800 w-52 mb-auto h-52 border-2 border-slate-700">
                                <h1 className="text-white flex pt-2 justify-center items-center text-lg"> Course Name</h1>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Login;