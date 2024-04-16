import { useState } from "react";
import { Helmet } from "react-helmet";
import { Img, Text, Button, Input, Heading } from "../../components";
import Header from "components/importants/Header";
import Footer from "components/importants/Footer";
export default function PersonalsignupPage() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  // const [message,setMessage] = useState([])



   async function submit(event){
    event.preventDefault();
  try{
    let UserData  = {
      name:username,
      email:email,
      password:password
    }
    const response= await fetch("http://localhost:5000/api/sign-up",{
      method: "post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(UserData),
      credentials : 'include'
    })
    if (response.ok){
      console.log("going perfect");
      // setMessage("Account Is successfully created now login");
      sessionStorage.setItem("message",  " !your Account Is successfully created");
      window.location.href = "/signin";
      
    }
    else{
      console.log("all is going wrong");
    }
  }catch(error){
    console.log("error : ",error.message)
  }
}
  return (
    <>
    <Header/>
      <Helmet>
        <title>Taqwa | Personal</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
          <form onSubmit={submit}>
            <div className="flex justify-center  pt-[40px] md:pl-5 md:py-5 bg-white-A700_02">
                <div className="flex md:flex-col justify-between items-center ">
                  <div className="w-[100%] md:w-full md:p-10">
                    <div className="flex flex-col gap-10">
                      <a href="/">
                        <Heading size="lg" as="h1" className="!text-[38.3px]  sm:mt-[120px]">
                          Create account
                        </Heading>
                      </a>
                      <div>
                        <div>
                          <div>
                            {/* <div className="text-linear-200 text-center font-semibold block text-xl" >{message}</div> */}
                            <div className="flex flex-col gap-[10px]">
                              <div className="flex flex-col gap-0.5">
                                <Text size="s" as="p" className="!text-[15.32px]">
                                  Full names
                                </Text>
                                <Input
                                  color="white_A700_01"
                                  size="sm"
                                  onChange={setUsername}
                                  shape="round"
                                  name="fullName"
                                  className="sm:pr-5 border-black-900_01 !rounded-[7px]"
                                  required
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <Text size="s" as="p" className="!text-[15.32px]">
                                  Email adress
                                </Text>
                                <Input
                                  color="white_A700"
                                  size="sm"
                                  onChange={setEmail}
                                  type="email"
                                  shape="round"
                                  name="email"
                                  required
                                  className="sm:pr-5 border-black-900_01 !rounded-[7px]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-[13px]">
                          <div className="flex flex-col gap-0.5">
                            <Text size="s" as="p" className="!text-[15.32px]">
                              Password
                            </Text>
                            <div className="flex flex-col items-center gap-6">
                              <Input
                                size="sm"
                                shape="round"
                                type="password"
                                required
                                onChange={setPassword}
                                name="password"
                                className="text-black-900 self-stretch sm:pr-5 border-black-900_01 !rounded-[7px]"
                              />
                         
                              <div className="flex justify-center">
                                <Text as="p" className="text-shadow-ts">
                                  <a href="/signin" className="">Already having account ? 
                                  
                                   <span className="text-linear-200"> LOGIN
                                  
                                  </span></a>
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button  size="sm" shape="round" type="submit" className="w-full mt-[15px] sm:px-5 !text-gray-50">
                          CREATE ACCOUNT
                        </Button>
                     </div>
                    </div>
                  </div>
                 
                  <Img
                  src="images/img_undraw_personal_file_re_5joy.png"
                  alt="undrawpersonal"
                  className="sm:hidden h-[434px] w-full md:w-full md:h-auto"
                />
                </div>
                
              </div>
              </form>
              <Footer/>
              </>
  );
}
