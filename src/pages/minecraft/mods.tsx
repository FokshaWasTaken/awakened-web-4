import mr from '@/styles/Modrinth.module.scss';
import Head from 'next/head';
import React, { useEffect } from 'react';
import ModCard from '@/components/ModCard';
import { ModrinthMod, PistonMeta } from '@/system/types';
import SpinningModrinthLogo from '@/components/SpinningModrinthLogo';
import { cachedFetch } from '@/system/network';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { TbInfoCircle } from 'react-icons/tb';
import { FaExclamationTriangle } from 'react-icons/fa';

export const config = { runtime: 'experimental-edge' };

async function getData() {
    const modsRes = await cachedFetch('https://api.modrinth.com/v2/user/Foksha/projects');
    const pistonMetaRes = await cachedFetch('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json');
    const mods = await modsRes.json();
    const pistonMeta = await pistonMetaRes.json();

    return { mods, pistonMeta };
}

export default function Mods() {
    const [mods, setMods]: [ModrinthMod[], any] = React.useState<ModrinthMod[]>([]);
    const [pistonMeta, setPistonMeta]: [PistonMeta, any] = React.useState<PistonMeta>(null as any);

    useEffect(() => {
        if (mods.length > 0 && pistonMeta) return;

        getData().then((data) => {
            const sortedMods = data.mods.sort((a: ModrinthMod, b: ModrinthMod) => b.downloads - a.downloads);
            setMods(sortedMods);
            setPistonMeta(data.pistonMeta);
        });
    }, [mods, pistonMeta]);

    if (!(mods && pistonMeta)) {
        return (
            <>
                <div>
                    <SpinningModrinthLogo />
                    <div className={'mx-auto mt-4 w-fit font-semibold text-[1.5rem]'}>Getting mods list</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Mods - Foksha</title>
                <meta name='description' content="A list with all of Foksha's mods posted on Modrinth" />
            </Head>
            <main>
                <div
                    className={`flex gap-2 xsm:hidden items-center bg-red-700/20 dark:bg-red-700/10 mx-auto text-left p-4 rounded-xl drop-shadow-md leading-6 w-full dark:text-red-600 text-red-700 mb-4`}
                >
                    <FaExclamationTriangle className={'text-[1.2rem]'} />
                    This page may not behave properly on narrow screens.
                </div>
                {/*Temporary solution, TODO: Find a more efficient way to do this*/}
                <div
                    className={`gap-2 mod-cards max-w-[1380px] mx-auto mb-4 modrinth dark:modrinth-dark hidden mmd:grid ${mr['display-mode--grid']}`}
                >
                    {mods.map((mod: ModrinthMod) => (
                        <Link
                            href={'https://modrinth.com/mod/' + mod.slug}
                            target={'_blank'}
                            key={mod.id + '-link'}
                            className={'transition-transform hover:scale-[1.01]'}
                        >
                            <ProjectCard
                                key={mod.id}
                                author={'Foksha'}
                                name={mod.title}
                                iconUrl={mod.icon_url}
                                description={mod.description}
                                clientSide={mod.client_side}
                                serverSide={mod.server_side}
                                downloads={mod.downloads}
                                follows={mod.followers}
                                // categories={mod.categories}
                                updatedAt={mod.updated}
                            />
                        </Link>
                    ))}
                </div>

                <div
                    className={`grid gap-2 mod-cards max-w-[1380px] mx-auto mb-4 modrinth dark:modrinth-dark mmd:hidden ${mr['display-mode--list']}`}
                >
                    {mods.map((mod: ModrinthMod) => (
                        <Link
                            href={'https://modrinth.com/mod/' + mod.slug}
                            target={'_blank'}
                            key={mod.id + '-link'}
                            className={'transition-transform hover:scale-[1.01]'}
                        >
                            <ProjectCard
                                key={mod.id}
                                author={'Foksha'}
                                name={mod.title}
                                iconUrl={mod.icon_url}
                                description={mod.description}
                                clientSide={mod.client_side}
                                serverSide={mod.server_side}
                                downloads={mod.downloads}
                                follows={mod.followers}
                                // categories={mod.categories}
                                updatedAt={mod.updated}
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
