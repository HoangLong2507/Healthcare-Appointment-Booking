import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/hospitalimg1.jpg";
import img2 from "../../assets/hospitalimg2.jpg";
import img3 from "../../assets/hospitalimg3.jpg";
import img4 from "../../assets/hospitalimg4.jpg";
import img5 from "../../assets/hopitalimg5.jpg";
import healcareimage from "../../assets/healhcare.png"; 
import { FaArrowRightLong, FaRegStar, FaStar } from "react-icons/fa6";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Slider/>
      <KeyServices/>
      <HomeIntro navigate={navigate}/>
      <CardSlider/>
      <FAQSection/>
    </>
  )

}

const FAQSection = () => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const faqs = [
    {
      question: 'What services do you provide?',
      answer:
        'We provide a wide range of healthcare services including preventive care, routine checkups, chronic condition management, and personalized treatment plans.',
    },
    {
      question: 'How can I book an appointment?',
      answer:
        'You can book an appointment by clicking the "Get Started" button on our homepage and logging into your account to schedule a visit. Also, you can click on the navigator "Appointment" on the header to redirect to the appointment page.',  
    },
    {
      question: 'Do you accept insurance?',
      answer:
        'Yes, we accept most major insurance plans. Please contact our support team for specific details about your coverage.',
    },
    {
      question: 'What are your operating hours?',
      answer:
        'Our hospital operates 24/7 for emergency services. Regular appointments are available from 8 AM to 6 PM, Monday to Saturday.',
    },
  ];

  const toggleAnswer = (index) => {
    setCurrentIndex(currentIndex === index ? null : index);
  };

  return (
    <div className="w-[50vw] ml-[13vw] mb-24">
      <h2 className="text-4xl font-bold text-left mb-12 text-gray-800">Some Common Question</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg">
            <div
              className="flex justify-between items-center p-6 cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-xl font-semibold text-gray-700">{faq.question}</h3>
              <span className="text-2xl text-gray-500">
                {currentIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            {currentIndex === index && (
              <div className="p-6 pt-0 text-gray-600 text-xl border-t border-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CardSlider = () => {
  const cards = [
    { id: 1, img: img1, rating: 4, comment: 'Great product! adsfafdssasđsfadsfsdfdfsdsfâdsdsfadsà', username: 'John Doe' },
    { id: 2, img: img1, rating: 5, comment: 'Amazing experience.' , username: 'John Doe'},
    { id: 3, img: img1, rating: 3, comment: 'Good, but could be better.', username: 'John Doe' },
    { id: 4, img: img1, rating: 4, comment: 'Really liked it!', username: 'John Doe' },
    { id: 5, img: img1, rating: 2, comment: 'Not what I expected.', username: 'John Doe' },
    { id: 6, img: img1, rating: 5, comment: 'Perfect, highly recommend!', username: 'John Doe' },
    { id: 7, img: img1, rating: 5, comment: 'Perfect, highly recommend! ádfsafsdfasdf', username: 'John Doe' },
  ];
  
  const [index, setIndex] = useState(0);
  
  const nextSlide = () => {
    if (index < cards.length - 4) {
      setIndex(index + 1);
    }
  };
  
  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  
  const getStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar/> : <FaRegStar/>);
    }
    return stars;
  };
  
  return (
    <div className="w-[80vw] mx-auto mb-20 relative">
      <p className="mb-12 text-4xl font-bold text-left ml-14 text-gray-800">Feedback</p>
      <div className="w-full flex justify-center items-center mb-4">
        <div className="w-[94%] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 25}%)` }} 
          >
            {cards.map((card) => (
              <div key={card.id} className="flex-shrink-0 w-1/4 px-2 py-4 h-[40vh]"> 
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="flex items-center flex-col justify-center h-52">
                    <img src={card.img} alt="Card Image" className="rounded-full w-26 h-26 mt-8 mx-auto" />
                    <p className="text-center text-2xl font-bold mt-auto mb-4">{card.username}</p>
                  </div>
                  <div className="border-t-2 border-gray-200 my-2"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-center mb-8 mt-4">
                    {getStars(card.rating).map((star, index) => (
                      <span key={index} className="text-yellow-500 text-4xl">
                        {star}
                      </span>
                    ))}
                    </div>
                    <div className="w-full overflow-hidden whitespace-nowrap">
                      <div
                        className="inline-block text-gray-600 text-xl"
                        style={{ animation: 'roll 6s linear infinite' }}
                      >
                        {card.comment}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800"
      >
        <IoIosArrowDropleftCircle size={30} color="white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800"
      >
        <IoIosArrowDroprightCircle size={30} color="white" />
      </button>
    </div>
  );
}

const HomeIntro = ({navigate}) => {
  return (
    <div className ="max-w-[75%] mx-auto mt-20 mb-20 flex  justify-center items-center ">
      <img src={healcareimage} alt="HealCare Image" className="w-[40vw] h-[45vh] rounded-2xl shadow-2xl" />
      <div className="ml-10 text-left mb-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Welcome to Our Hospital</h1>
        <p className="text-2xl ml-16">We are deeply committed to delivering exceptional healthcare services that prioritize your well-being and the health of your entire family.
        From preventive care to personalized treatment plans, our dedicated team of professionals works around the clock to ensure you receive the highest standard of medical attention. Whether you are seeking routine checkups, managing a chronic condition, or navigating complex medical needs, we’re here every step of the way — with compassion, expertise, and unwavering support. Your health is not just our mission — it’s our promise.</p>
        <div className="flex items-center ml-16 mt-4">
          <p className="text-3xl font-bold">LETS CREATE APPOINTMENT TO JOIN US</p>
          <button onClick={()=>navigate('/login')} className=" ml-10 text-3xl px-6  items-center justify-center whitespace-nowrap py-3 rounded-3xl flex shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 font-medium tracking-wide transition duration-300 transform hover:scale-105 hover:shadow-xl button-glow">
            Get Started
            <span>
              <FaArrowRightLong className="ml-2 my-auto"  size={20} color="white" />
            </span>
          </button>         
        </div>
      </div>
    </div>
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

