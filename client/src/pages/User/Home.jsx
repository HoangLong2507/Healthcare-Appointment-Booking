import { useState } from "react";
import img1 from "../../assets/hospitalimg1.jpg";
import img2 from "../../assets/hospitalimg2.jpg";
import img3 from "../../assets/hospitalimg3.jpg";
import img4 from "../../assets/hospitalimg4.jpg";
import img5 from "../../assets/hopitalimg5.jpg";

export default function Home() {
  return (
    <>
      <Slider/>
      <KeyServices/>
    </>
  )

}

const KeyServices =() => {
  const features = [
    {name: "General Examination", content: "General examination service helps to check overall health, detect diseases early and provide timely treatment advice."},
    {name: "Cardiovascular Examination", content: "Specialized cardiovascular examination service helps detect and treat cardiovascular problems, improving cardiovascular health."},
    {name: "Obstetrics Examination", content: "Professional obstetric examination services, supporting women'health during pregnancy and postpartum."},
    {name: "Internal Medicine", content: "Our Internal Medicine department specializes in diagnosing and treating adult diseases, including hypertension, diabetes, digestive disorders, and respiratory conditions."},
    {name: "Dentistry & Maxillofacial", content: "Our Dentistry & Maxillofacial department provides comprehensive oral health care, including dental exams, orthodontics, wisdom tooth extraction, and jaw surgery."},
    {name: "Other Specialties", content: "We offer many other specialty services, including areas such as orthopedics, neurology, and more."},

  ]
  return (
    <>
      <section className="relative w-full py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Main Services</h2>
          <p className="text-xl mb-8">
          We offer a wide range of specialist medical services: general, cardiology, obstetrics, internal medicine, dentistry and many other specialties to provide you with comprehensive health care.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              features.map((feature, index) => (
                <div 
                  key={index}  // Thêm key
                  className="bg-white text-gray-900 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-lg">{feature.content}</p>
                </div>
              ))
            }
          </div>
        </div>
      </section>

    </>
    
  );
}

const Slider = () => {
  const images = [
    img1,img2,img3,img4,img5
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((index) => (index + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((index) => (index - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
  <div className="relative w-full">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 ">
              <img src={image} alt={`Slider Image ${index + 1}`}  className="object-fill w-full max-h-[65vh]" />
            </div>
          ))}
        </div>
      </div>

      {/* Chấm tròn */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>

      {/* Các nút chuyển ảnh (tùy chọn, có thể bỏ đi nếu không cần) */}
      <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-8 text-white bg-black bg-opacity-50 p-4 w-16 h-16 rounded-full text-2xl">
        &#10094;
      </button>
      <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-8 text-white bg-black bg-opacity-50 p-4 w-16 h-16 rounded-full text-2xl">
        &#10095;
      </button>
    </div>
  );
};

