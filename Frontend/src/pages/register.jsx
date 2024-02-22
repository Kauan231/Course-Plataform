
import { object, string } from 'yup';
import { useState } from 'react';

const Register = () => {
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
       
            <div className="bg-slate-900 w-screen h-screen grid">
                <form onSubmit={ValidateData} >
                    <div className="p-20 w-full flex  justify-center items-center">
                        <div className="p-20 w-full h-auto rounded-md bg-gradient-to-t from-slate-900 to-blue-400 grid">
                            <p className="text-3xl font-semibold flex justify-center items-center text-white">Get started : </p>

                            <div className="mt-5 grid grid-cols-2">
                                <div>
                                    <label className="text-xl flex justify-start text-white">First name:</label>
                                    <input className="bg-slate-800 w-11/12 p-2 round rounded-md  text-white" onChange={
                                        (e) => { SetEmail(e.target.value); }
                                    } required></input>
                                </div>
                                <div>
                                    <label className="text-xl flex justify-start text-white">Last name:</label>
                                    <input className="bg-slate-800 w-11/12 p-2 round rounded-md text-white" onChange={
                                        (e) => { SetEmail(e.target.value); }
                                    } required></input>
                                </div>
                                

                               
                            </div>

                            <div className="mt-5">
                                <label className="text-xl flex justify-start text-white">Username:</label>
                                <input className="bg-slate-800 w-full p-2 round rounded-md flex justify-center items-center text-white" type="email" onChange={
                                    (e) => { SetEmail(e.target.value); }
                                } required></input>
                            </div>

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
                            Register
                            </button >
                            <a href='/login' className="text-white flex mt-5 justify-center items-center">Already signed? - Sign In</a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;