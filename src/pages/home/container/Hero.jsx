import React, { useState } from "react";
import { images } from "../../../constants";
import Search from "../../../components/Search";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Yönlendirme için useNavigate kullanıyoruz

  const handleSearch = async ({ searchKeyword }) => {
    console.log("Arama anahtar kelimesi:", searchKeyword);

    // Eğer arama anahtar kelimesi boşsa, işlem yapmadan çık
    if (!searchKeyword.trim()) {
      console.log("Arama anahtar kelimesi boş. Lütfen bir kelime girin.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchKeyword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSearchResults(data.results);
        navigate("/search", { state: { searchResults: data.results } }); // Sonuçlarla birlikte yönlendir
      } else {
        console.log("Arama sonucu bulunamadı");
        navigate("/search", { state: { searchResults: [] } }); // Boş sonuçlarla yönlendir
      }
    } catch (error) {
      console.error("Arama sırasında hata oluştu:", error);
      navigate("/search", { state: { searchResults: [] } }); // Hata durumunda da boş sonuçlarla yönlendir
    }
  };

  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="text-center font-roboto text-3xl font-bold text-dark-soft md:text-5xl lg:max-w-[540px] lg:text-left lg:text-4xl xl:text-5xl">
          Read the most interesting articles
        </h1>
        <p className="mt-4 text-center text-dark-light md:text-xl lg:text-left lg:text-base xl:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <Search
          onSearchKeyword={handleSearch}
          className="mt-10 lg:mt-6 xl:mt-10"
        />
      </div>
      <div className="lg:1/2 hidden lg:block">
        <img
          className="w-full"
          src={images.HeroImage}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};

export default Hero;
