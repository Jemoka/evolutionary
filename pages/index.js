import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

import location from "./lib/location";
import reproduction from "./lib/reproduction.js";

// dummy function
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


// generate random numbers
function rand(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// seed the agents
const N = 50;
const X_BOUNDS = [-10, 10];
const Y_BOUNDS = [-10, 10];
const RGE = [...Array(N)];

export default function Home() {
    let [ agents, setAgents ] = useState((RGE.map(_ =>
        [rand(...X_BOUNDS),
         rand(...Y_BOUNDS),
         [Math.random()*255,
          Math.random()*255,
          Math.random()*255],
         Math.random()])));

    useEffect(() => {
        sleep(50).then(() => {
            // this will run on every render
            setAgents(agents.map((e,i) => 
                location(e, agents.filter((_, x) => x!=i), 0.1, 50)
            ).map((e,i) =>
                reproduction(e, agents.filter((_, x) => x!=i),
                             5, 0, 1000, 0.01)).flat(1).filter(x=>x)); // ring, minN, maxN
        });
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>evolutionary</title>
            </Head>

            <main className={styles.main}>
                <div className={styles.center}>
                    {agents.map((e, i) => {
                        return (<motion.div initial={false}
                                   key={e[3]}
                                   transition={{
                                       ease: "linear",
                                       duration: 0.1,
                                       /* x: { duration: 1 } */
                                   }}
                                   animate={{x: e[0],
                                             y: e[1],
                                             backgroundColor: `rgba(${e[2][0]}, ${e[2][1]}, ${e[2][2]}, 100)`}}
                                    className={styles.node}>&nbsp;</motion.div>);
                    })}
                </div>
            </main>
        </div>
    );
}
