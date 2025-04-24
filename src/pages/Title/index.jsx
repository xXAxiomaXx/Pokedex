import React from "react";
import background from "../../assets/Images/mylivewallpapers-com-Eevee-Pokemon-4K.mp4";
import backgroundMobile from "../../assets/Images/MOBILE-Eevee-Pokemon.mp4";
import Logo from "../../assets/Images/612ce4761b9679000402af1c.png";

//
const Title = () => {
  return (
    <>
      <section className="flex justify-center overflow-y-hidden items-center h-screen w-screen">
        <div className="h-screen w-screen flex flex-col justify-between items-center py-10">
          <nav className=" w-screen z-50 px-6 py-4">
            <img
              src={Logo}
              alt="Pokémon Logo"
              className="w-2/6 lg:w-1/8 z-50"
            />
          </nav>
          <video
            autoPlay
            loop
            muted
            className="bg-vid hidden lg:block absolute top-0 left-0 w-full h-screen object-cover z-0"
          >
            <source src={background} type="video/mp4" />
          </video>
          <video
            autoPlay
            loop
            muted
            className="bg-vid absolute top-0 left-0 block lg:hidden w-full h-screen object-cover z-0"
          >
            <source src={backgroundMobile} type="video/mp4" />
          </video>
          <div className="shadow"></div>
          <div className="flex flex-col justify-around h-full w-full items-center gap-5 z-50">
            <div className="flex flex-col justify-center w-8/12 text-center gap-5 text-white items-center">
              <h1 className="text-7xl sm:text-8xl font-bold font-outline-2">
                Ready to explore the Pokémon's world??
              </h1>
            </div>
            <a
              className="text-white text-2xl z-50 bg-black hover:bg-white hover:text-black hover:border-black duration-150 ease-in-out py-2 px-5 rounded-xl border font-bold"
              href="/pokemon"
            >
              Pokémon List
            </a>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Title;
