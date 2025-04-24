import React from "react";
import background from "../../assets/Images/mylivewallpapers-com-Eevee-Pokemon-4K.mp4";
import backgroundMobile from "../../assets/Images/MOBILE-Eevee-Pokemon.mp4";
import Logo from "../../assets/Images/612ce4761b9679000402af1c.png";

// 
const Title = () => {

  return (
    <>
      <section className="justify-center items-center h-screen w-screen">
        <nav className="fixed w-screen z-50 px-6 py-4">
          <img src={Logo} alt="Pokémon Logo" className="w-2/6 lg:w-1/8 z-50" />
        </nav>
        <div className="h-screen w-screen flex flex-col justify-around items-center py-10">
          <video
            autoPlay
            loop
            muted
            className="bg-vid hidden lg:block fixed w-full h-full object-cover z-0"
          >
            <source src={background} type="video/mp4" />
          </video>
          <video
            autoPlay
            loop
            muted
            className="bg-vid fixed block lg:hidden w-full h-full object-cover z-0"
          >
            <source src={backgroundMobile} type="video/mp4" />
          </video>
          <div className="shadow"></div>
          <div className="flex flex-col justify-around h-full w-full items-center gap-5 z-50">
            <div className="flex flex-col justify-center w-8/12 text-center gap-5 text-white items-center">
              <h1 className="text-7xl sm:text-8xl font-bold font-outline-2">Ready to explore the Pokémon's world??</h1>
            </div>
            <a
              className="text-white text-2xl z-50 bg-black hover:bg-white hover:text-black hover:border-black duration-150 ease-in-out py-2 px-5 rounded-xl border font-bold"
              href="/ListaPokemons"
            >
              Pokémon List
            </a>
          </div>
          <footer className="z-50 w-screen absolute bottom-2 flex flex-col items-center">
            <hr className="my-6 border-gray-200 w-11/12 lg:w-8/12 sm:mx-auto lg:my-4" />
            <span className="flex items-center justify-center gap-2 text-sm text-gray-500 sm:text-center">
              © 2025
              <a
                href="https://emouradev.vercel.app/"
                target="_blank"
                className="hover:underline text-white"
              >
                EM Dev
              </a>
              | All Rights Reserved.
            </span>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Title;
