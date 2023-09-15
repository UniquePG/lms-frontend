import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

const ContactUs = () => {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        phone: "",
        message:"",
    })

    function handleInput(e){

        const { name, value } = e.target;
        console.log(name, value);

        setUserInput({
            ...userInput,

            [name]: value
        })
    }


    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.name || !userInput.email || !userInput.phone || !userInput.message){

            toast.error("All fields are mendatory")
            return
        }

        if(!isEmail(userInput.email)){
            toast.error("Invalid email")
            return
        }

        try {
            const response = axiosInstance.post("/contact", userInput)

            toast.promise(response, {
                loading: "Submmiting your form",

                success: "Form submmited successfully",

                error: "Failed to submit the form"
            })

            const contactResponse = await response;

            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    phone: "",
                    message:"",   
                });
            }


        } catch (error) {
            toast.error("Operation failed...")
        }
    }


  return (
<HomeLayout>
    <div className="h-[100vh] flex flex-col items-center justify-center ">
        <form onSubmit={onFormSubmit} 
            noValidate  
            className="flex flex-col items-center justify-center gap-2 p-5 shadow-[0_0_10px_black] w-[28rem] bg-white">
            <h1 className="text-3xl font-semibold">Contact Us</h1>
            
            <div className="w-full flex flex-col gap-1">
                <label htmlFor="name" className="text-xl font-semibold">Name</label>

                <input type="text" 
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    className="bg-transparent border px-2 py-1 rounded-sm"
                    onChange={handleInput}
                    value={userInput.name}
                    />
            </div>

            <div className="w-full flex flex-col gap-1">
                <label htmlFor="email" className="text-xl font-semibold">Email</label>

                <input type="email" 
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    className="bg-transparent border px-2 py-1 rounded-sm"
                    onChange={handleInput}
                    value={userInput.email}
                    />
            </div>

            <div className="w-full flex flex-col gap-1">
                <label htmlFor="number" className="text-xl font-semibold">Phone</label>

                <input type="number" 
                    placeholder="Enter your phone number"
                    id="phone"
                    name="phone"
                    className="bg-transparent border px-2 py-1 rounded-sm"
                    onChange={handleInput}
                    value={userInput.phone}
                    />
            </div>

            <div className="w-full flex flex-col gap-1">
                <label htmlFor="message" className="text-xl font-semibold">Message</label>

                <textarea 
                    placeholder="Enter your message"
                    id="message"
                    name="message"
                    className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                    onChange={handleInput}
                    value={userInput.message}
                    />
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg text-white">
                Send Message
            </button>

        </form>
    </div>
</HomeLayout>
  )
}

export default ContactUs