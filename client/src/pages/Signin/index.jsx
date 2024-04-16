import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Img, Text, Button, Input, } from "../../components";
import Header from "components/importants/Header";
import Footer from "components/importants/Footer";

export default function SigninPage() {
  const [accountType, setAccountType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true); // Set isLoading to true before sending the request
  
    try {
      if (accountType === "company") {
        console.log("company logging in");
        let logData = {
          email: email,
          password: password,
        };
  
        const response = await fetch("http://localhost:5000/api/company-signin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logData),
          credentials: 'include',
        });
  
        if (response.ok) {
          sessionStorage.removeItem("message")
          window.location.href = '/company';
        } else {
          const data = await response.json();
          console.log(data.message)
        }
      }
  
      if (accountType === "person") {
        console.log("person logging in");
        let logData = {
          email: email,
          password: password,
        };
  
        const response = await fetch("http://localhost:5000/api/sign-in", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logData),
          credentials: 'include',
        });
  
        if (response.ok) {
          sessionStorage.removeItem("message")
          window.location.href = "/dashboard";
        } else {
          const data = await response.json();
          setError(data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed or an error occurs
    }
  }
  
  const idea = sessionStorage.getItem("message") || " "; 
  return (
    <>
    <Header/>
      <Helmet>
        <title>Taqwa | LOGIN</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      {isLoading ? ( // Render the loader if isLoading is true
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full -mt-40 h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full mb-3 gap-[100px] mx-auto md:gap-[75px] sm:gap-[50px] sm:mt-5 max-w-[1200px] mt-[0px]">
          <div>
            <div className="flex flex-col gap-20 md:gap-[60px] sm:gap-10 mt-10">
              <div className="flex md:flex-col justify-between items-start gap-5">
                <Img
                  src="images/img_frame_20.svg"
                  alt="image_one"
                  className="h-[75px] w-[75px] mt-40 sm:h-[20px] sm:mt-[20px]"
                />
                <div className="flex md:flex-col  items-center w-[75%] md:w-full gap-5 md:p-5">
                  <div className="flex flex-col w-[31%] md:w-full gap-8">
                    <a href="/signin" >
                    <div className="text-3xl ml-0 font-poppins w-100 text-white p-2 rounded">Login </div>
                    <span>{idea}</span>

                    </a>
                    <div className="flex flex-col gap-[54px] sm:gap-[27px]">
                      <div className="flex flex-col gap-[11px]">
                        <div>
                          <Text className="text-linear-100 !important text-center font-bold">
                            {error}
                          </Text>
                          <div className="flex flex-col gap-[9px]">
                          <Text as="p" className="!font-medium ">
                            Account type
                          </Text>
                          <div className="relative">
                            <select
                              className=" border-2 h-[50px] text-center w-full rounded sm:w-[100%] pr-8 bg-white text-gray-600 focus:text-black-900 focus:border-linear-100 border-none"
                              onChange={(e) => setAccountType(e.target.value)}
                              required
                            >
                              <option value="" disabled selected>
                                Company or personal finances
                              </option>
                              <option value="company" name="company">
                                Company
                              </option>
                              <option value="person" name="person">
                                Person
                              </option>
                            </select>
                          </div>
                        </div>

                          <div className="flex flex-col gap-[9px]">
                            <Text as="p" className="!font-medium">
                              Email address
                            </Text>
                            <Input
                              shape="round"
                              type="email"
                              name="email"
                              onChange={setEmail}
                              placeholder={`Write your email`}
                              className="sm:pr-5 border-black-900_01 text-black-900"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Text as="p" className="!font-medium">
                            Password
                          </Text>
                          <Input
                            shape="round"
                            type="password"
                            name="password"
                            onChange={setPassword}
                            placeholder={`Write your password`}
                            className="sm:pr-5 border-black-900_01 text-black-900"
                          />
                        </div>
                      </div>
                      <a href="/" className="-mt-8 -mb-10">
                        <div className="text-center m-0 p-0 mt-[-10px] -mb-10 sm:mb-10 sm:mt-10">
                          New here ? <span className=" text-linear-100"> Get started</span>
                        </div>
                      </a>
                      <Button
                        size="md"
                        type="submit"
                        shape="round"
                        className="w-full !rounded-lg"
                      >
                        SIGN IN
                      </Button>
                    </div>
                  </div>
                  <Img
                    src="images/img_undraw_investment_re_rpk5.svg"
                    alt="undraw_one"
                    className="h-[400px] md:w-full md:h-auto sm:hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>)}
      <Footer/>
    </>
  );
}