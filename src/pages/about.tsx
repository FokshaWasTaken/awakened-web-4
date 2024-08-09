import Head from 'next/head'
import {FaJava} from "react-icons/fa";
import {
    TbBrandFlutter, TbBrandGolang,
    TbBrandHtml5,
    TbBrandReact, TbBrandRust, TbInfoCircle
} from "react-icons/tb";
import React from "react";

import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/react-flicking/dist/flicking.css";
import {SiElixir} from "react-icons/si";

export const config = {runtime: 'experimental-edge'};

export default function About() {
    const iconLine = "inline-flex items-center flex-wrap";

    return (
        <>
            <Head>
                <title>About - Foksha</title>
            </Head>
            <main className={"max-w-[1400px] mx-auto"}>
                <div className={"text-7 font-medium"}>
                    <div className={`bg-black/20 mx-auto text-left mt-5 p-4 rounded-xl drop-shadow-md leading-6 ${iconLine} w-full dark:text-red-600 text-red-700`}>
                        <TbInfoCircle className={""}/>&nbsp;This page is still under construction, the formatting and content is not final.
                    </div>
                    <div className={"bg-black/30 mx-auto text-left mt-5 p-4 rounded-xl drop-shadow-md leading-6"}>
                        Hello, I&#39;m <span className={"font-semibold"}>Foksha</span>,  a passionate programmer with a keen interest in exploring new technologies and frameworks.<br/>
                        <div className={iconLine}>
                            I have been programming for over {new Date().getFullYear() - 2016} years, and am
                            knowledgeable
                            in&nbsp;
                            <FaJava/>&nbsp;Java,&nbsp;
                            <TbBrandHtml5/>&nbsp;Web development and &nbsp;
                            <TbBrandReact/>&nbsp;React.&nbsp;
                        </div>
                        <div className={iconLine}>
                            I&#39;m currently looking into/getting into&nbsp;
                            <a href={"https://www.rust-lang.org/"} target={"_blank"} className={`opacity-100 text-foreground-500 hover:text-current transition-fade fancy-underline ${iconLine}`}>
                                <TbBrandRust/>&nbsp;Rust.
                            </a>&nbsp;
                        </div>
                        <br/>
                        <br/>
                        I am actively involved in creating personal projects and enjoy contributing to open-source projects on <a href="https://github.com/FokshaWasTaken?tab=repositories" target={"_blank"} className={`opacity-100 text-foreground-500 hover:text-current transition-fade fancy-underline`}>GitHub</a>.                        <br/>
                    </div>
                </div>
            </main>
        </>
    )
}
