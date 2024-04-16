import {React,useState} from "react";
import { Helmet } from "react-helmet";
import { Img, Text, Button, Input, Heading } from "../../components";
import Header from "components/importants/Header";
import Footer from "components/importants/Footer";

export default function RegistercompanyPage() {
  const [cname,setCname] = useState()
  const [cemail,setCemail] = useState()
  const [clocation,setClocation] = useState()
  const [cemployees,setCemployees] = useState()
  const [cpassword,setPassword] = useState()
  const [confirmpassword,setConfirmpassword] = useState()
  const [passwordError,setPasswordError] = useState()

  const [message,setMessage] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let companyData = {
      name: cname,
      email: cemail,
      location: clocation,
      password: cpassword,
      employees: cemployees,
      
    };
  
    if (cpassword !== confirmpassword) {
      setPasswordError("Password does not match");
      return;
    }
  
    if (cpassword.length < 8) {
      setPasswordError("Please make a stronger password");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("company inserted successfully");
        sessionStorage.setItem("message", "! Company account is now created");
        window.location.href= "/signin";

      }
  
      const data = await response.json();
      console.log("error : " ,  data.message);

    } catch (error) {
      console.error("Error:", error.message);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
     <>
     <Header/>
      <Helmet>
        <title>Taqwa | Company</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <form onSubmit={handleSubmit}>
                <div className="flex md:flex-col justify-between sm:mt-[-120px]  w-full gap-6 mx-auto md:p-5 max-w-[900px]">
                  <div className="flex flex-col  w-[50%] md:w-full mb-[43px] sm:w-[100%]">
               
                    <Heading size="l" as="h1"  className="mt-[97px] sm:!text-[25px] mr-[31px] md:mr-0 font-bold !text-[28.2px] ">
                      Create company account
                    </Heading>
                    <h2 className="text-red-700">{message}</h2>
                    <div className="flex flex-col items-start w-[100%] md:w-full mt-[12px]">
                      <div className="flex sm:flex-col self-stretch items-center gap-[26px]">
                        <div className="flex flex-col w-full sm:w-full gap-1.5">
                          <Text size="xs" as="p" className="!text-[15.08px]">
                            Company name
                          </Text>
                          <Input
                            size="xs"
                            shape="round"
                            required
                            type = "text"
                            onChange ={setCname}
                            name="cname"
                            className="text-black-900_d1 sm:pr-4 border-black-900_01 !rounded-[7px]"
                          />
                        </div>
                        <div className="flex flex-col w-full sm:w-full gap-[8px]">
                          <Text size="xs" as="p" className="!text-[15.08px]">
                            Email address
                          </Text>
                          <Input
                            size="xs"
                            shape="round"
                            required
                            onChange={setCemail}
                            type = "email"
                            name="cemail"
                            className="text-black-900_d1 sm:pr-4 border-black-900_01 !rounded-[7px]"
                          />
                        </div>
                      </div>
                      <div className="flex sm:flex-col self-stretch mt-1.5 gap-[26px]">
                        <div className="flex flex-col w-full sm:w-full">
                          <Text size="xs" as="p" className="!text-[15.08px]">
                            Company Location
                          </Text>
                          <Input 
                          size="xs"
                            shape="round"
                            required
                            onChange={setClocation}
                            type="location"
                            name="clocation"
                            className="text-black-900_d1 sm:pr-4 border-black-900_01 !rounded-[7px]"
                          />
                        </div>
                        <div className="flex flex-col w-full sm:w-full">
                          <Text size="xs" as="p" className="!text-[15.08px]">
                            Number of employees
                          </Text>
                          <Input
                            size="xs"
                            required
                            shape="round"
                            type="number"
                            onChange={setCemployees}
                            name="cEmployees"
                            className="text-black-900_d1 sm:pr-4 border-black-900_01 !rounded-[7px]"
                            />
                          </div>
                      </div>
                      <h2 className="text-red-700">{passwordError}</h2>
                      <div className="flex sm:flex-col self-stretch items-center mt-1 gap-[29px]">
                        <div className="flex flex-col w-full sm:w-full gap0">
                          <Text size="xs" as="p" className="!text-[15.08px]">
                            Password
                          </Text>
                          <Input
                            size="xs"
                            shape="round"
                            required
                            type="password"
                            onChange={setPassword}
                            name="password"
                            className="text-black-900_d1 sm:pr-4 border-black-900_01 !rounded-[7px]"
                          />
                        </div>
                        <div className="flex flex-col w-full sm:w-full">
                          <Text size="xs" as="p" className="!text-[15.08px]">
                            Repeat password
                          </Text>
                          <Input
                            size="xs"
                            shape="round"
                            name="password"
                            required
                            type="password"
                            onChange={setConfirmpassword}
                            className="text-black-900_d1 sm:pr-4 border-black-900_01 !rounded-[7px]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center content-center w-full m-3 mt-3">
                      <Text as="p" className="text-shadow-ts">
                        <a href="/signin" className="">Already having account ? 
                        
                         <span className="text-linear-200"> LOGIN
                        
                        </span></a>
                      </Text>
                    </div>
                      <Button shape="round" type="submit" className="mt-3  md:ml-0 sm:px-5 sm:w-[100%] w-[100%]">
                        CREATE ACCOUNT
                      </Button>
                    </div>
                  </div>
                  <Img
                    src="images/img_undraw_personal.svg"
                    alt="undrawpersonal"
                    className="h-[400px] mt-[90px] md:w-full md:h-auto sm:hidden"
                  />
                </div>
                </form>
                <Footer/>
          </>
  );
}
