import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../../utils/motion";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

const ContactWrapper = styled(motion.div)`
  flex: 0 0 30%;
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const EarthWrapper = styled(motion.div)`
  flex: 0 0 45%;
  height: 80vh;

  @media (max-width: 1024px) {
    width: 100%;
    height: 300px;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const LabelText = styled.span`
  color: white;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: #2c2c2c;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  ::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  background-color: #2c2c2c;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  resize: none;
  ::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  background-color: #2c2c2c;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  width: fit-content;
  cursor: pointer;
`;

const SubText = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;

const HeadText = styled.h3`
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // emailjs
    //   .send(
    //     "service_82wt0os",
    //     "template_mqgvxp5",
    //     {
    //       from_name: form.name,
    //       to_name: "JavaScript Mastery",
    //       from_email: form.email,
    //       to_email: "prasad.adhi08@gmail.com",
    //       message: form.message,
    //     },
    //     "o-mrPYF8vtv7lEpAw"
    //   )
      emailjs.send("service_82wt0os","template_mqgvxp5",{
      name: form.name,
      message: form.message,
      email: form.email,
      },
      "o-mrPYF8vtv7lEpAw"
    )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <Container>
      <EarthWrapper
        variants={slideIn("right", "tween", 0.2, 1)}
      >
        <EarthCanvas />
      </EarthWrapper>

      <ContactWrapper
        variants={slideIn("left", "tween", 0.2, 1)}
      >
        <SubText>Get in touch</SubText>
        <HeadText>Contact.</HeadText>

        <form ref={formRef} onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <Label>
            <LabelText>Your Name</LabelText>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
            />
          </Label>
          <Label>
            <LabelText>Your email</LabelText>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
            />
          </Label>
          <Label>
            <LabelText>Your Message</LabelText>
            <TextArea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
            />
          </Label>
          <Button type="submit">
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
      </ContactWrapper>
    </Container>
  );
};

export default SectionWrapper(Contact, "contact");
