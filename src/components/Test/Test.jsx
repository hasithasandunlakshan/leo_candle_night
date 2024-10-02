import styles from './Test.module.scss';

import Picture2 from '../../../public/images/candle.png';
import Picture3 from '../../../public/images/candle.png';
import Picture1 from '../../../public/android-chrome-512x512.png';
import Picture4 from '../../../public/images/candle.png';

import Picture5 from '../../../public/images/candle.png';
import Picture6 from '../../../public/images/candle.png';

import Picture7 from '../../../public/images/candle.png';
import Picture8 from '../../../public/images/candle.png';

import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';
import ContactPage from '../contact/contactPage';
import { boolean } from 'zod';

export default function Index() {
    
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pictures = [
        {
            src: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600",
            scale: scale4
        },
        {
            src: "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=600",
            scale: scale5
        },
        {
            src: "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=600",
            scale: scale6
        },
        {
            src: "https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?b=1&s=612x612&w=0&k=20&c=X6CkFGpSKhNZeiii8Pp2M_YrBdqs7tRaBytkGi48a0U=",
            scale: scale5
        },
        {
            src: "https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=600",
            scale: scale6
        },
        {
            src: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
            scale: scale8
        },
        {
            src: 'https://images.pexels.com/photos/1860204/pexels-photo-1860204.jpeg?auto=compress&cs=tinysrgb&w=600',
            scale: scale9
        }
    ]

    return (
        <div ref={container} className={`${styles.container} !h-[300vh] md:h-[350vh]`}>
            <div className={styles.sticky}>
                {
                    pictures.map( ({src, scale}, index) => {
                        return <motion.div key={index} style={{scale}} className={styles.el}>
                            <div className={ styles.imageContainer}>
                                <Image
                                    src={src}
                                    fill
                                    alt="image"
                                   
                                />
                            </div>
                        </motion.div>
                    })
                }
        
            </div>
           
        </div>
    )
}