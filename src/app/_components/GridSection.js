// 'use client';
// import Image from 'next/image';
// import React, { useRef, useEffect } from 'react';

// const GridSection = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     // Set the video playback speed to 1x (normal speed)
//     if (videoRef.current) {
//       videoRef.current.playbackRate = 1;
//     }
//   }, []);

//   return (
    // <section className="container mx-auto p-4">
    //   <div className="grid md:grid-cols-3 md:grid-row-2 row-span-2 gap-4">
    //     {/* Top Left - First Column in First Row */}
    //     <div className='col-span-1 row-span-3 gap-8'>
    //     <div className="relative aspect-w-1">
    //       <Image
    //         src="/tshirt.jpg"
    //         alt="Haldi"
    //         className="w-full h-full object-cover"
    //         width={300}
    //         height={100}
    //         unoptimized={true}
    //       />
    //       <div className="absolute inset-0 flex items-center justify-center">
    //         <span className="text-white text-3xl font-bold">HALDI</span>
    //       </div>
    //     </div>

    //     {/* Top Right - Second Column in First Row */}
    //     <div className="relative">
    //       <Image
    //         src="https://img.freepik.com/premium-photo/young-man-red-coat-white-shirt-gray-beackground_73107-1699.jpg?w=360"
    //         alt="Mehendi"
    //         className="w-full h-full object-cover"
    //         width={300}
    //         height={200}
    //         unoptimized={true}
    //       />
    //       <div className="absolute inset-0 flex items-center justify-center">
    //         <span className="text-white text-3xl font-bold">MEHENDI</span>
    //       </div>
    //     </div>
    //     </div>

    //     {/* Middle (Autoplay Video) - Spans Two Columns in Second Row */}
    //     <div className="relative col-start-2 col-end-3 row-start-1 row-end-3">
    //       <video
    //         ref={videoRef}
    //         src="/main_grid.mov"
    //         autoPlay
    //         loop
    //         muted
    //         className="w-full h-full object-cover"
    //       ></video>
    //       <div className="absolute inset-0 flex items-center justify-center">
    //         <span className="text-white text-3xl font-bold">WEDDING</span>
    //       </div>
    //     </div>

    //     {/* Bottom Left - First Column in Third Row */}
    //     <div className='col-start-3 col-span-1 row-span-2'>
    //     <div className="relative ">
    //       <Image
    //         src="/jacket.jpg"
    //         alt="Sangeet"
    //         className="w-full h-full object-cover"
    //         width={300}
    //         height={200}
    //         unoptimized={true}
    //       />
    //       <div className="absolute inset-0 flex items-center justify-center">
    //         <span className="text-white text-3xl font-bold">SANGEET</span>
    //       </div>
    //     </div>

    //     {/* Bottom Right - Second Column in Third Row */}
    //     <div className="relative ">
    //       <Image
    //         src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F31%2F0d%2F310dbe8e29ea91d278a4ec73c137304e30bc8fb1.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
    //         alt="Reception"
    //         className="w-full h-full object-cover"
    //         width={300}
    //         height={200}
    //         unoptimized={true}
    //       />
    //       <div className="absolute inset-0 flex items-center justify-center">
    //         <span className="text-white text-3xl font-bold">RECEPTION</span>
    //       </div>
    //     </div>
    //     </div>
    //   </div>
    // </section>
//   );
// };

// export default GridSection;
'use client';
import React,{useState, useEffect} from 'react';
import { motion, useInView } from 'framer-motion';
import { Lora } from "next/font/google";
import GlobalApi from '../_utils/GlobalApi.jsx';


const ubuntu = Lora({ subsets: ["latin-ext"], weight: ["400",'500',"700"] ,
  variable: '--font-ubuntu'
});

const GridSection = () => {

  const [hero, setHero] = useState([]);
  const [videoItem, setVideoItem] = useState(null);
  useEffect( ()=>{
    getProductList( ) ;
  },[]) 
  
    const getProductList = ()=>{
    GlobalApi.getHeroSections().then(resp=>{
      const filteredData = resp.data.data.filter(item => item.attributes.section === 2);
      // console.log("Filtered CategoryList Resp:", filteredData);
      const video = filteredData.find(item => item.attributes.type === 'video');
      setVideoItem(video);

      setHero(filteredData);
    });
  }
  return (
    <section className={` ${ubuntu.variable} font-sans mx-auto p-4`}>
      
      <div className="flex md:flex-row flex-col gap-4">
        {/* Top Left */}
        {hero.length > 0 && (
        <>
        <div className='relative flex flex-row md:flex-col gap-4'>
          {hero.slice(0, 2).map((item,index)=>(
          <AnimatedGridItem key={index} src={item?.attributes?.image?.data[0]?.attributes?.url} label={item.attributes.title} />
  ))
        }
          {/* <AnimatedGridItem src="/jacket.jpg" label="Be cool, be fashionable" /> */}
        </div>

        {/* Top Middle (Autoplay Video) */}
        {videoItem && (
              <motion.div
                className="relative grid3 w-full h-[300px] md:h-[556px] lg:min-w-[250px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <video
                  src={ videoItem?.attributes?.image?.data[0]?.attributes?.url}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover md:min-w-[250px]"
                ></video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`${ubuntu.variable} font-sans text-white text-xl lg:text-3xl font-bold`}>
                    {videoItem.attributes.title}
                  </span>
                </div>
              </motion.div>
            )}

        {/* Top Right */}
        <div
          className='relative flex md:flex-col flex-row gap-4'
     
        >
        
        {hero.slice(2, 4).map((item,index)=>(
          <AnimatedGridItem key={index} src={item?.attributes?.image?.data[0]?.attributes?.url} label={item.attributes.title} />
  ))
        }
        
        </div>
        </>
      )}
      </div>
    </section>
  );
};

const AnimatedGridItem = ({ src, label }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-[150px] md:h-[270px] lg:min-w-[250px]"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={` ${ubuntu.variable} font-sans text-white text-xl lg:text-3xl lg:font-semibold font-medium`}>{label}</span>
      </div>
    </motion.div>
  );
};

export default GridSection;
