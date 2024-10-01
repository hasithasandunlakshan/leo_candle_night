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
            src: Picture1,
            scale: scale4
        },
        {
            src: Picture2,
            scale: scale5
        },
        {
            src: Picture3,
            scale: scale6
        },
        {
            src: Picture4,
            scale: scale5
        },
        {
            src: Picture5,
            scale: scale6
        },
        {
            src: Picture6,
            scale: scale8
        },
        {
            src: Picture7,
            scale: scale9
        }
    ]

    return (
        <div ref={container} className={`${styles.container} !h-[300vh] md:h-[350vh]`}>
            <div className={styles.sticky}>
                {
                    pictures.map( ({src, scale}, index) => {
                        return <motion.div key={index} style={{scale}} className={styles.el}>
                            <div className={ `${styles.imageContainer}   `}>
                                <Image
                                    src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
                                    fill
                                    alt="image"
                                   
                                />
                            </div>
                        </motion.div>
                    })
                }
         
            </div>
            <ContactPage/>
        </div>
    )
}