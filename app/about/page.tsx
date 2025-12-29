import Image from "next/image";
import background from "../../public/background.png";
export default function About() {
  return (
    <div className="">
      <div>About page</div>
      <div className="flex justify-center items-center flex-col">
        <Image
          src={
            "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="About Image"
          width={500}
          height={300}
        ></Image>
        <Image src={background} alt="About Image"></Image>
      </div>
    </div>
  );
}
