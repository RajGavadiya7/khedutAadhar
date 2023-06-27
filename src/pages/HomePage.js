import { Helmet } from 'react-helmet-async';

import React, { useState } from "react";
import HomeCarousel from "../components/HomePage/HomeCarousel";
import "./css/HomePage.css";
import { Accordion } from "@mantine/core";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { getFirestore, collection, addDoc,serverTimestamp } from "firebase/firestore";
import app from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import HomeFeatures from "../components/HomePage/HomeFeatures";
import HowOrganicCard from "../components/HomePage/HowOrganicCard";


const HomePage = () => {
  const [constactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    timestamp: "",
  });
  const db = getFirestore(app);
  const contactUsCollectionRef = collection(db, "contactUs");

  const createContactUs = async (contactUsData) => {
    try {

      // Add server-side timestamp

      contactUsData.timestamp = serverTimestamp();

      console.log(contactUsData);
      await addDoc(contactUsCollectionRef, contactUsData);
        alert("Successfully sent");
    } catch (err) {
      console.error(err);
    }
  };

  const handleContactUsChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContactUsSubmit = (e) => {
    e.preventDefault();
    createContactUs(constactFormData);
    // clear form
    setContactFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const faqData = [
    {
      question: "Why should we choose organic crops?",
      answer:
        "Organic crops offer several benefits, including reduced exposure to synthetic pesticides and chemicals, improved soil health, higher nutrient content, and support for sustainable farming practices.",
    },
    {
      question: "Are organic crops healthier than conventional crops?",
      answer:
        "Organic crops are often considered healthier as they are grown without the use of synthetic pesticides and genetically modified organisms (GMOs). They tend to have higher levels of certain nutrients and lower pesticide residue levels.",
    },
    {
      question: "How does organic farming benefit the environment?",
      answer:
        "Organic farming practices prioritize the conservation of soil, water, and biodiversity. They minimize the use of synthetic inputs, promote sustainable resource management, reduce soil erosion, and protect ecosystems by avoiding the contamination of water bodies and minimizing air pollution.",
    },

    {
      question:
        "Does consuming organic crops contribute to better animal welfare?",
      answer:
        "Organic farming standards typically include guidelines for animal welfare, such as providing access to outdoor areas, organic feed, and restrictions on the use of growth hormones and antibiotics. Choosing organic crops supports a more humane treatment of animals in the food production system.",
    },
    {
      question: "Can organic farming help mitigate climate change?",
      answer:
        "Yes, organic farming practices, such as composting, crop rotation, and agroforestry, contribute to carbon sequestration and reduce greenhouse gas emissions. Organic farms often have lower energy requirements and utilize sustainable techniques that promote climate resilience.",
    },
    {
      question: "Is organic farming economically viable for farmers?",
      answer:
        "While transitioning to organic farming may involve initial challenges, organic products often command premium prices, leading to potential economic benefits for farmers. Moreover, organic farming can reduce input costs over time and improve long-term soil fertility, making it economically viable in the long run.",
    },
    {
      question: "Does organic farming contribute to global food security?",
      answer:
        "Organic farming emphasizes sustainable practices, conserves natural resources, and promotes crop diversity. By preserving soil health, biodiversity, and ecosystem services, organic farming can contribute to long-term food security and resilience in the face of climate change and environmental challenges.",
    },
  ];


  const howOrganicData = [
    {
      title: "Technology",
      image: "https://venturebeat.com/wp-content/uploads/2021/05/GettyImages-1248228512.jpg?fit=400%2C202&strip=all",
      description: "Technology aids organic farming through advancements in precision agriculture, data analysis, and automation for improved productivity and sustainability."
    },
    {
      title: "Vermicompost",
      image: "https://img.freepik.com/premium-vector/cartoon-compost-worms-soil-organic-bio-wastes_8071-50264.jpg",
      description: "Vermicompost is a nutrient-rich organic fertilizer and soil amendment produced by the process of composting organic waste materials using earthworms.",
    },
    {
      title: "Biodiversity and ecological balance",
      image: "https://www.news-reporter.com/wp-content/uploads/2023/05/Why-Biodiversity-Is-Essential-for-Sustainability-and-Ecological-Balance-696x418.jpeg",
      description: "Biodiversity and ecological balance through practices that support a diverse range of plant and animal species, enhancing ecosystem health and resilience.",
    },
  ];


  // map all the faqData to Accordion.Item
  const faqItems = faqData.map((faq) => (
    <Accordion.Item
      className="faq-accordion-item"
      id={uuidv4()}
      key={faq.question}
      value={faq.question}
    >
      <Accordion.Control>{faq.question}</Accordion.Control>
      <Accordion.Panel>{faq.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div>

      <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Home | Krushi Aadhar</title>
        <meta
          name="description"
          content="Krushi Aadhar: Empowering organic farmers with fair trade, crop management tools, and daily price updates for buying and selling crops at optimal prices. Simplifying tractor hiring and rental services for enhanced agricultural efficiency. Promoting organic farming and its advantages for sustainable agriculture."
        />
        <link rel="icon" href="/favicon.png" />
        <meta name="keywords" content="Krushi Aadhar, organic farming, sustainable agriculture, fair trade, crop management, crop prices, farmer empowerment, tractor hiring, agricultural solutions, organic produce, farming technology, agricultural marketplace, crop buying and selling, agricultural resources, farming tools, organic farming benefits, Sell Crops, Buy Organic Crops, Hire Tractor, Farming Equipment, Agricultural Platform" />
        <meta name="author" content="Krushi Aadhar" />
        <meta name="robots" content="index, follow" />
        <link rel='canonical' href='/' />
        <meta property='og:title' content='Krushi Aadhar' />
        <meta property='og:description' content='Krushi Aadhar is a comprehensive platform that empowers organic farmers by providing them with a convenient solution to sell their organic produce at fair prices. Additionally, it facilitates farmers in buying crops at reasonable rates, offering services such as tractor hiring or renting. Farmers can also stay updated with daily crop prices, enabling them to effectively manage their crops and make informed decisions. With Krushi Aadhar, organic farmers can access a range of tools and resources to support their farming practices and promote the benefits of organic agriculture.' />
      
      </Helmet>

      <HomeCarousel />

      <div className="info-container">
        <h1 className="info-container-title"> Krushi Aadhar </h1>
        <h2 className="info-container-title2">Aadhar of Indian Krushi</h2>
        <div>
          <p className="info-container-body">
            Krushi Aadhar portal is a one stop solution for facilitating organic
            farmers to sell their organic produce and promoting organic farming
            and its benefits. This portal caters various stakeholders like
            individual farmers, buyers and input suppliers.
          </p>
        </div>
      </div>
      
      
      <div className="features-container" style={{ backgroundColor: "white" }}>
        <HomeFeatures />
      </div>


      <div className="card-container-wrapper">

        <Title style={{lineHeight: 1,textAlign: "center", marginTop: '2rem'}} >
          Revolutionary Approach to <span style={{backgroundColor:'rgba(89, 216, 47, 0.4)' , padding:'3px' , borderRadius:'5px'}} >Organic Farming</span>
        </Title>
        <p style={{textAlign:"center"}} className="card-container-body">
          Discovering game-changing techniques and tools to revolutionize organic farming for better sustainability and yields.
        </p>

        <div className="card-container">
          {howOrganicData.map((data) => (
            <HowOrganicCard data={data} />
          ))}
        </div>
      </div>

      {/* FAQ and contact us both sections */}
    <div className="faq-contactus-wrapper" >
      <div className="faq-contactus-header">
        <h1 className="faq-header-titl">Frequently Asked Questions</h1>
        <h4 className="faq-header-subtitle">Find answers to commonly asked questions about our platform, services, and features in this helpful FAQ section.</h4>  
      </div>
        
      
      <div className="faq-contactus-container">

        
        {/* FAQ */}
        <div className="accordion-container">
          <Accordion
            className="faq-accordion"
            variant="separated"
            radius="lg"
            chevronPosition="left"
            defaultValue="customization"
          >
            {faqItems}
          </Accordion>
        </div>

        <div className="contactus-container">
          <form className="contactus-form" onSubmit={handleContactUsSubmit} >
            <Title
              order={2}
              size="h3"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              })}
              weight={900}
              align="center"
            >
              Still have questions?
            </Title>

            <SimpleGrid
              cols={2}
              mt="xl"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <TextInput
                label="Name"
                placeholder="Your name"
                name="name"
                variant="filled"
                required
                value={constactFormData.name}
                onChange={handleContactUsChange}
              />
              <TextInput
                label="Email"
                placeholder="Your email"
                name="email"
                variant="filled"
                required
                value={constactFormData.email}
                onChange={handleContactUsChange}
              />
            </SimpleGrid>

            <TextInput
              label="Subject"
              placeholder="Subject"
              mt="md"
              name="subject"
              variant="filled"
              required
              value={constactFormData.subject}
              onChange={handleContactUsChange}
            />
            <Textarea
              mt="md"
              label="Message"
              placeholder="Your message"
              maxRows={10}
              minRows={5}
              autosize
              name="message"
              variant="filled"
              required
              value={constactFormData.message}
              onChange={handleContactUsChange}
            />

            {/* <Group position="center" mt="xl"> */}
              <Button onSubmit={handleContactUsSubmit} type="submit" size="md">
                Send message
              </Button>
            {/* </Group> */}
          </form>
        </div>
      </div>
      </div>




      {/* Footer */}
      <footer className="footer">
        <div className="logo">
          <img src="https://krushi-aadhar.web.app/image/logo.svg" alt="Logo" />
        </div>
        <div className="links">
          <a href="/contact">Contact Us</a>
          <a href="/about">About Us</a>
        </div>
        <div className="social">
          <a href="https://github.com/RajGavadiya7/khedutAadhar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIPPlnUnhPRbSLfZr0TctDI3RN7mB7hqw8aqJjMCZaS9NvUQk&s"
              alt="GitHub"
            />
          </a>
          <a href="mailto:rajpatel341233@gmail.com">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTziPbCT90zMN6QC1fxy2LYV10pG_iqLZqyri9k_PMg2qjjoYE&s"
              alt="Gmail"
            />
          </a>
          <a href="https://www.linkedin.com/in/raj-gavadiya-44238a221/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFON-aVwMnG0o6jy1rBtpPj7Lboe3AT8oigrVLk5ruTQMHkms&s"
              alt="LinkedIn"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
