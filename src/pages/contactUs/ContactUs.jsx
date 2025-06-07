import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.phone.length < 10)
      newErrors.phone = "Enter a valid phone number";
    if (formData.message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters long";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    emailjs
      .send(
        "service_hkjv4x4",
        "template_ulns2er",
        formData,
        "um9OMcpSbUIX0lfIP"
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "We'll get back to you soon.",
          background: "#EDE8F5",
          confirmButtonColor: "#3D52A0",
        });
        setFormData({ email: "", phone: "", message: "" });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again later.",
          background: "#fff5f5",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EDE8F5] to-[#ADBBDA] px-4 py-12">
      <Card className="w-full max-w-lg shadow-lg border border-[#ADBBDA]/50">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-6">
            <Typography variant="h4" className="text-[#3D52A0] text-center">
              Contact Us
            </Typography>
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!errors.email}
              required
            />
            {errors.email && (
              <Typography className="text-red-500 text-sm">
                {errors.email}
              </Typography>
            )}
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              error={!!errors.phone}
              required
            />
            {errors.phone && (
              <Typography className="text-red-500 text-sm">
                {errors.phone}
              </Typography>
            )}
            <Textarea
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              error={!!errors.message}
              required
            />
            {errors.message && (
              <Typography className="text-red-500 text-sm">
                {errors.message}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              color="blue"
              fullWidth
              className="bg-[#3D52A0] hover:bg-[#7091E6] text-white"
            >
              Send Message
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ContactUs;
