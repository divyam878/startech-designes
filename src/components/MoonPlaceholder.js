import Image from 'next/image';

const MoonPlaceholder = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[30rem] lg:w-[40rem] h-[20rem] md:h-[30rem] lg:h-[40rem]">
      <Image 
        src="/moon.png" 
        alt="Moon" 
        width={1600}
        height={1600}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
};

export default MoonPlaceholder;