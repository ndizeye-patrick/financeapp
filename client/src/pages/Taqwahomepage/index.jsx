import React from "react";
import { Helmet } from "react-helmet";
import { Img} from "../../components";
import { Button } from "../../components";
import Header from "components/importants/Header";
import Footer from "components/importants/Footer";

export default function TaqwahomepagePage() {
  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center w-full h-screen p-[53px] md:p-5 ">
      <Helmet>
        <title>Taqwa Homepage</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="bg-gray-100">
      <a href="/signin">
        <Button shape="square" className="absolute top-4 right-[10%] bg-white-A700_02  
        border-2 border-solid deep_purple_A400_indigo_A700_border text-black-900
        hover:bg-gradient-to-t hover:from-linear-100 hover:to-linear-200 hover:text-white-A700_02 justify-center align-center text-center content-center object-fit">SIGN IN</Button>
      </a>
      </div>
      <div className="w-full text-center sm:hidden ml-10 -mt-20 text-2xl"><span className="text-center pl-7"> Sign up for ? </span></div>
      <div className="flex flex-col justify-center w-full p-[53px] md:p-5 bg-gray-50_fb">
        
      <div className="w-[100%] md:w-full">
          <div className="flex md:flex-col justify-between items-start w-full gap-5 mx-auto md:p-5 max-w-[1072px]">
            <Img src="images/img_vector.svg" alt="vector_one" className="h-[300px] -mt-10 md:w-full md:h-auto" />
            
           
            <div className="flex md:flex-row sm:flex-col w-[53%] md:w-full gap-[75px]">
            
            <div className="flex justify-center w-full sm:w-full ">
              
              <div className="flex text-center flex-col sm:flex-row  content-center mt-0 justify-around w-full px-14 py-20 hover:bg-gradient-to-b hover:from-linear-100 hover:to-linear-200   md:p-5 border-[3px] hover:border-none border-solid deep_purple_A400_indigo_A700_border bg-gray-50_fb text-black-900  hover:text-white-A700_02">
                <a href="/registercompany" className="font-bold sm:ml-0 my-[19px] uppercase !text-[17.44px]">    
                      <>
                      BUSINEsS <br />
                      Finances
                      
                      </>
                  </a>
                </div>
              </div>
              <div className="flex flex-row justify-center w-full sm:w-full">
                 <div className="flex flex-col sm:flex-row justify-center w-full px-14 py-[77px]  hover:bg-gradient-to-t hover:from-linear-100 hover:to-linear-200  md:p-5 border-[3px]    border-solid deep_purple_A400_indigo_A700_border  hover:border-none bg-gray-50_fb  text-black-900  hover:text-white-A700_02 text-center">
                 <a href="/personalsignup" className="font-bold sm:ml-0 my-[19px] uppercase !text-[17.44px]"> 
                    <>
                      Personal <br />
                      Finances
                    </>
                  </a>
                  <div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
