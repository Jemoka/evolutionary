import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

import location from "./lib/location";

// dummy function
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


// generate random numbers
function rand(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// seed the agents
const N = 500;
const X_BOUNDS = [-10, 10];
const Y_BOUNDS = [-10, 10];
const RGE = [...Array(N)];


export default function Home() {
    let [ agents, setAgents ] = useState((RGE.map(_ =>
        [rand(...X_BOUNDS),
         rand(...Y_BOUNDS)])));

    useEffect(() => {
        sleep(50).then(() => {
            // this will run on every render
            setAgents(agents.map((e,i) => {
                return location(e, agents.filter((_, x) => x!=i), 0.001, 200);
            }));
        });
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>evolutionary</title>
            </Head>

            <main className={styles.main}>
                <div className={styles.center}>
                    {RGE.map((_, i) => {
                        return (<motion.div initial={false}
                                   key={i}
                                   transition={{
                                       ease: "linear",
                                       duration: 1,
                                       /* x: { duration: 1 } */
                                   }}
                                   animate={{x: agents[i][0],
                                             y: agents[i][1]}}
                                   className={styles.node+" bg-red-100"}>&nbsp;</motion.div>);
                    })}
                </div>
            </main>
        </div>
    );
}
