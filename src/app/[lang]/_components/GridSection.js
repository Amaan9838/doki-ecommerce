
'use client';
import React,{useState, useEffect} from 'react';
import { motion, useInView } from 'framer-motion';
import { Lora } from "next/font/google";
import GlobalApi from '../_utils/GlobalApi.jsx';


const ubuntu = Lora({ subsets: ["latin-ext"], weight: ["400",'500',"700"] ,
  variable: '--font-ubuntu'
});

const GridSection = (lang) => {

  const [hero, setHero] = useState([]);
  const [videoItem, setVideoItem] = useState(null);
  useEffect( ()=>{
    getProductList();
  },[]) 
  
    const getProductList = ()=>{
    GlobalApi.getHeroSections(lang.lang).then(resp=>{
      const filteredData = resp.data.data.filter(item => item.attributes.section === 2);
      // console.log("Filtered CategoryList Resp:", filteredData);
      const video = filteredData.find(item => item.attributes.type === 'video');
      setVideoItem(video);

      setHero(filteredData);
      console.log("grid filtered data:", filteredData)
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
