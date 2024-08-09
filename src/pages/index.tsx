import Head from 'next/head'
import ModrinthLogo from '@/components/ModrinthLogo'
import Logo from "@/components/Logo";
import {SiDart, SiJetbrains, SiKofi,} from "react-icons/si";
import {FaJava} from "react-icons/fa";
import {
    TbBrandBlender,
    TbBrandCss3,
    TbBrandFigma,
    TbBrandFlutter,
    TbBrandGit,
    TbBrandGithub,
    TbBrandHtml5,
    TbBrandJavascript,
    TbBrandNextjs,
    TbBrandPython,
    TbBrandReact,
    TbBrandRust,
    TbBrandTypescript, TbBrandVisualStudio, TbBrandVscode, TbExternalLink,
    TbTools
} from "react-icons/tb";
import {HiCode, HiExternalLink} from "react-icons/hi";
import {BsGithub} from "react-icons/bs";
import Link from "next/link";
import React, {useEffect} from "react";
import {formatNumber} from "@/system/utils";
import Flicking, {ViewportSlot} from "@egjs/react-flicking";
import {Arrow, Perspective} from "@egjs/flicking-plugins";

import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/react-flicking/dist/flicking.css";
import {ModrinthMod} from "@/system/types";
import {cachedFetch} from "@/system/network";
import {buildNavSection, Div, navItems} from "@/components/Navbar";

export const config = {runtime: 'experimental-edge'};

export function getStaticProps() {
    return {
        props: {navless: true, borderless: true}
    }
}

async function getData() {
    const modsRes = await cachedFetch("https://api.modrinth.com/v2/user/Foksha/projects");
    return await modsRes.json();
}

function calculateDownloads(mods: ModrinthMod[]) {
    let downloads = 0;
    mods.forEach(mod => {
        downloads += mod.downloads;
    })
    return downloads;
}

function NavDiv({...props}) {
    return <Div {...props} className={`${props.className ?? ""} text-xl`}/>
}

export default function Home() {
    const [mods, setMods]: [ModrinthMod[], any] = React.useState<ModrinthMod[]>(null as any);
    const [loaded, setLoaded]: [boolean, any] = React.useState<boolean>(false);

    useEffect(() => {
        if (loaded) return;
        setLoaded(true);
    }, [loaded]);

    useEffect(() => {
        if (mods) return;
        getData().then((data) => {
            setMods(data);
        });
    }, [mods]);

    if (!loaded) {
        return null;
    }

    const _plugins = [
        new Perspective({ rotate: -0.5, scale: 0.5, perspective: 1000 }),
        new Arrow()
    ];

    return (
        <>
            <Head>
                <title>Foksha</title>
            </Head>
            <main className={"max-w-[1400px] mx-auto"}>
                <div className={"mx-auto w-fit mb-[3rem] mt-6"}>
                    <Logo className={"w-[80vw] mx-auto sm:w-auto h-12"}/>
                    <div className={"justify-center flex flex-wrap mt-2"}>
                        <div className={"justify-center flex flex-wrap mt-2"}>
                            {navItems.map((item) => buildNavSection(item, NavDiv))}
                        </div>
                    </div>
                </div>
                <div className={"mt-[-2rem] mb-4"}>
                    <Flicking
                        cameraClass={"flex flex-row items-center mx-auto min-h-[360px] relative"}
                        plugins={_plugins}
                        deceleration={0.03}
                        circular={false}
                        defaultIndex={2}
                        align={"center"}
                    >
                        <Link className={"relative w-[260px] h-[300px] bg-[#05CE45] rounded-2xl bg-opacity-50 flex flex-col"} draggable={false} href={"/minecraft/mods"}>
                            <div className={"h-full flex"}>
                                <div className={"mt-auto w-full h-fit"}>
                                    <ModrinthLogo className={"dropShadow mx-auto w-auto h-[8rem]"}/>
                                </div>
                            </div>
                            <div className={"h-full font-semibold text-center flex"}>
                                <div className={"m-auto h-fit"}>
                                    <div className={"text-2xl"}>Mod downloads</div>
                                    <div className={"text-5xl"}>{mods ? formatNumber(calculateDownloads(mods)) : "Calculating"}</div>
                                </div>
                            </div>
                        </Link>
                        <a className={"relative w-[260px] h-[300px] bg-[#6E5494] rounded-2xl bg-opacity-50 flex flex-col"} draggable={false} href={"https://github.com/FokshaWasTaken?tab=repositories"} target="_blank">
                            <div className={"h-full flex"}>
                                <div className={"mt-auto w-full h-fit"}>
                                    <BsGithub className={"dropShadow text-[8rem] mx-auto"}/>
                                </div>
                            </div>
                            <div className={"h-full font-semibold text-center flex"}>
                                <div className={"m-auto h-fit"}>
                                    <div className={"text-2xl"}>GitHub</div>
                                    <div className={"text-4xl inline-flex items-center align-middle"}>Repositories</div>
                                    <div className={"text-2xl absolute top-2 right-2"}><TbExternalLink/></div>
                                </div>
                            </div>
                        </a>
                        <div className={"relative w-[260px] h-[300px] bg-[#AE6565] rounded-2xl bg-opacity-50 flex flex-col cursor-default"}>
                            <div className={"h-full flex"}>
                                <div className={"mt-auto w-full h-fit"}>
                                    <HiCode className={"dropShadow text-[8rem] mx-auto"}/>
                                </div>
                            </div>
                            <div className={"h-full font-semibold text-center flex"}>
                                <div className={"m-auto h-fit"}>
                                    <div className={"text-2xl"}>Languages</div>
                                    <div className={"text-3xl w-full inline-flex justify-center items-center align-middle"}>
                                        <FaJava/>&nbsp;
                                        <TbBrandRust/>&nbsp;
                                        <TbBrandPython/>&nbsp;
                                        <TbBrandTypescript/>&nbsp;
                                        <TbBrandJavascript/>&nbsp;
                                    </div>
                                    <div className={"text-3xl w-full inline-flex justify-center items-center align-middle"}>
                                        <TbBrandHtml5/>&nbsp;
                                        <TbBrandCss3/>&nbsp;
                                        <TbBrandReact/>&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"relative w-[260px] h-[300px] bg-[#BBBB0B] rounded-2xl bg-opacity-50 flex flex-col hover:scale-[1.01] motion-reduce:transition-none cursor-default"}>
                            <div className={"h-full flex"}>
                                <div className={"mt-auto w-full h-fit"}>
                                    <TbTools className={"dropShadow text-[8rem] mx-auto"}/>
                                </div>
                            </div>
                            <div className={"h-full font-semibold text-center flex"}>
                                <div className={"m-auto h-fit"}>
                                    <div className={"text-2xl"}>Tools</div>
                                    <div className={"text-3xl w-full inline-flex justify-center items-center align-middle"}>
                                        <TbBrandVscode/>&nbsp;
                                        <TbBrandVisualStudio/>&nbsp;
                                        <TbBrandBlender/>&nbsp;
                                        <TbBrandGithub/>&nbsp;
                                        <TbBrandGit/>&nbsp;
                                        <SiJetbrains className={"text-[minmax(50px), 1.875rem]"}/>&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className={"relative w-[260px] h-[300px] bg-[#13C3FF] rounded-2xl flex flex-col hover:scale-[1.01] motion-reduce:transition-none kofi-glow"} draggable={false} href={"https://ko-fi.com/foksha"} target={"_blank"}>
                            <div className={"h-full flex"}>
                                <div className={"mt-auto w-full h-fit"}>
                                    <SiKofi className={"dropShadow text-[8rem] mx-auto"}/>
                                </div>
                            </div>
                            <div className={"h-full font-semibold text-center flex"}>
                                <div className={"m-auto h-fit"}>
                                    <div className={"text-2xl"}>Support me</div>
                                    <div className={"text-3xl w-full inline-flex justify-center items-center align-middle"}>
                                        Donate
                                        <div className={"text-2xl absolute top-2 right-2"}><TbExternalLink/></div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <ViewportSlot>
                            <span className="flicking-arrow-prev"></span>
                            <span className="flicking-arrow-next"></span>
                        </ViewportSlot>
                    </Flicking>

                    {/*<div className={"max-w-3xl mx-auto mt-5"}>
                        <div className={"bg-black/30 p-4 mx-4 md:mx-0 rounded-xl drop-shadow-md"}>
                            The website is not complete and may change at any time. <br/>
                            TODO:
                            <ul className={"list-disc list-inside pl-4"}>
                                <li className={"line-through"}>Separate the navigation in categories</li>
                                <li className={"line-through"}>Fix the mobile navigation as it is likely broken due to the item above</li>
                                <li className={"line-through"}>Make the home nav dynamic</li>
                                <li>Finish the about page</li>
                                <li className={"line-through"}>Use the proper Modrinth™ style on the mods page</li>
                                <li>Add documentation pages</li>
                                <li>Finish the home page</li>
                                <li>Make languages and tools show name on hover</li>
                                <li>Make languages and tools have links</li>
                            </ul>
                        </div>
                    </div>*/}
                </div>
            </main>
        </>
    )
}
