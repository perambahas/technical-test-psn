import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="md:grid md:grid-cols-2 h-full">
      <div className="md:block hidden bg-black w-full h-full">
        <Image
          src={"/falcon-9.webp"}
          alt="Login Page Picture"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-[url(/falcon-9.webp)] bg-center bg-cover w-full h-full flex flex-col justify-center items-center md:bg-none ">
        <div className="bg-gray-300/80 md:bg-transparent w-full py-12 flex justify-center drop-shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
