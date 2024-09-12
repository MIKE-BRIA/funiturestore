import InputArea from "../components/InputArea";
import { GiTrophyCup } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineSupportAgent } from "react-icons/md";
import Foot from "../components/Foot";

const Contact = () => {
  return (
    <div>
      <div className="relative mb-4">
        <img
          src="images/dining.jpg"
          alt="dining table image"
          className="h-52 w-full object-cover opacity-40"
        />

        <p className="absolute font-bold inset-0 flex items-center justify-center text-2xl text-black">
          Contact
        </p>
      </div>

      <div className="border-b p-6 border-blue-500">
        <h1 className="text-center mt-10 mb-4">Get In Touch With Us</h1>
        <p className="text-center w-full md:w-96 m-auto text-xl">
          For more information about our products and services, Please fee free
          to drop us an email. Our staff always be there to help you out.Do not
          hesitate
        </p>
      </div>

      <div className="flex flex-col md:flex-row p-2 md:p-6 gap-6 md:gap-10 justify-center items-center">
        <div className="flex flex-col  gap-4 md:gap-10 ">
          <div>
            <h1>Address</h1>
            <p>236 5th SE Avenue, New York</p>
            <p>United States of America</p>
          </div>
          <div>
            <h1>Phone</h1>
            <p>Moblile: +(84) 546-6789</p>
            <p>Moblile: +(84) 458-6789</p>
          </div>
          <div>
            <h1>Working Time</h1>
            <p>Monday-Friday: 9:00-22:00</p>
            <p>Saturday-Sunday: 9:00-21:00</p>
          </div>
        </div>
        <div className="border border-white p-4 rounded-xl">
          <form action="">
            <InputArea title="Your name" placeholder={"Abc"} />
            <InputArea title="Email" placeholder="Abc@del.com" />
            <InputArea title="Email" placeholder="(84) 546-6789" />

            <div className="flex flex-col mb-4">
              <label className="mb-2 text-gray-700 font-semibold">
                Enter your message
              </label>
              <textarea
                name="description"
                placeholder="Type description here"
                className="px-4 py-2 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            <button className="bg-yellow-200 p-2 w-20 rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 md:flex justify-between mx-2 md:mx-10 my-10">
        <section className="flex gap-2">
          <GiTrophyCup size={50} />
          <div>
            <h2 className=" text-xl font-bold">High Quality</h2>
            <p>crafted from top materials</p>
          </div>
        </section>
        <section className="flex gap-2">
          <SiTicktick size={50} />
          <div>
            <h2 className=" text-xl font-bold">Warranty Protection</h2>
            <p>Over 2 years</p>
          </div>
        </section>
        <section className="flex gap-3">
          <LiaShippingFastSolid size={50} />
          <div>
            <h2 className=" text-xl font-bold">Free shipping</h2>
            <p>Order Over 1000euros</p>
          </div>
        </section>
        <section className="flex gap-2">
          <MdOutlineSupportAgent size={50} />
          <div>
            <h2 className=" text-xl font-bold">24/7 Support</h2>
            <p>Dedicated support</p>
          </div>
        </section>
      </div>

      <Foot />
    </div>
  );
};

export default Contact;
