import {Card, CardBody} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import React, {useEffect} from "react";
import {Skeleton, Tooltip} from "@nextui-org/react";
import Link from "next/link";
import {McVersion, ModrinthMod, ModrinthModVersion, PistonMeta} from "@/system/types";
import {formatVersions} from "@/system/utils";
import {cachedFetch} from "@/system/network";
import {isEmpty} from "@nextui-org/shared-utils";
import {LuBox, LuGlobe, LuHardDrive, LuMonitor, LuPackage} from "react-icons/lu";

export const runtime = 'edge';

//versions is usually with the older versions first, so we need to reverse it, pistonmeta is used to know which versions are stable, it has the newest versions first, if pistonmeta is null we fallback to the latest version on version list
function getLatestStable(versions: string[], pistonMeta: PistonMeta): string {
    if (!pistonMeta) return versions[versions.length - 1];
    versions = versions.reverse();
    for (const version of versions) {
        const pistonVersion = pistonMeta.versions.find((pistonVersion: McVersion) => pistonVersion.id === version);
        if (pistonVersion && pistonVersion.type === "release") {
            return version;
        }
    }
    return versions[versions.length - 1];
}

async function getData(mod: ModrinthMod) {
    const res = await cachedFetch('https://api.modrinth.com/v2/project/' + mod.slug + '/version');
    const versions = await res.json();
    // get latest stable version, if there is none, get latest version
    let version = versions.find((version: any) => {
        return version.version_type === "release";
    });
    if (!version) {
        version = versions[0];
    }
    return version;
}

function getEnvironmentLabel(mod: ModrinthMod): React.ReactElement {
    let icon = <LuGlobe size={16} aria-hidden/>;
    let text = "Support is unknown";
    if (mod.client_side === "optional" && mod.server_side === "optional") {
        text = "Client or server";
    } else if (mod.client_side === "required" && mod.server_side === "required") {
        text = "Client and server";
    } else if ((mod.client_side === "optional" || mod.client_side === "required") && (mod.server_side === "optional" || mod.server_side === "unsupported")) {
        // eslint-disable-next-line jsx-a11y/alt-text
        icon = <LuMonitor size={16} aria-hidden/>;
        text = "Client";
    } else if ((mod.server_side === "optional" || mod.server_side === "required") && (mod.client_side === "optional" || mod.client_side === "unsupported")) {
        // eslint-disable-next-line jsx-a11y/alt-text
        icon = <LuHardDrive size={16} aria-hidden/>;
        text = "Server";
    } else if (mod.client_side === "unsupported" && mod.server_side === "unsupported") {
        text = "Unsupported";
    }

    icon = React.cloneElement(icon, { alt: "Support: " + text });

    return (
        <span className={"font-bold inline-flex gap-1 items-center"}>
            {icon}{text}
        </span>
    )
}

export default function ModCard({mod, pistonMeta}: { mod: ModrinthMod, pistonMeta: PistonMeta }) {
    const [data, setData]: [any, any] = React.useState<ModrinthModVersion[]>([] as ModrinthModVersion[]);
    useEffect(() => {
        getData(mod).then((data) => {
            setData(data);
        });
    }, [mod, pistonMeta]);

    if (!(!isEmpty(data) && mod && pistonMeta)) return (
        <Skeleton className={"rounded-xl"}>
            <div className="w-full h-[200px]">NextUI</div>
        </Skeleton>
    );

    const latest: string = getLatestStable([...mod.game_versions], {...pistonMeta});
    const versions: string = formatVersions([...mod.game_versions], {...pistonMeta});

    return (
        <Card
            className={"bg-white dark:bg-[#26292f] border-none hover:scale-[1.01] max-w-[calc(100vw-2rem)] block modrinth-card-shadow px-4 rounded-2xl"}
            classNames={{body: "modrinth-card-grid inline-grid overflow-hidden h-full text-[#111827] dark:text-[#b0bac5]"}}
            as={Link} href={"https://modrinth.com/mod/" + mod.slug} target={"_blank"}>
            <CardBody className={"w-full p-3 leading-[1.15rem]"}>
                <Image className={"w-24 h-24 object-contain"} classNames={{wrapper: "rounded-[1.25rem] modrinth-card-area-icon mt-2 bg-[#e5e7eb] dark:bg-[#434956] w-24 h-24 object-contain"}}
                       src={mod.icon_url ? mod.icon_url : "https://cdn-raw.modrinth.com/placeholder.svg"} alt={mod.title}/>
                <div className={"flex flex-row ml-3 mt-2 modrinth-card-area-title"}>
                    <h2 className={"font-bold text-[1.25rem] text-[#1a202c] dark:text-[#ecf9fb]"}>{mod.title}</h2>
                    <p>by Foksha</p>
                </div>
                <p className={"leading-[1.15rem] modrinth-card-area-description "}>{mod.description}</p>
                <div className={"modrinth-card-area-tags"}>
                    {getEnvironmentLabel(mod)}
                </div>
                <div className={"modrinth-card-area-stats"}>
                    <Tooltip content={"Latest mod version"} showArrow>
                        <div className={"modrinth-card-area-stat gap-1 items-center"}>
                            <LuPackage size={20} /> {data.version_number}
                        </div>
                    </Tooltip>
                    <Tooltip content={"Supported Minecraft versions: " + versions.toString()} placement={"top"} showArrow className={"break-normal max-w-[25rem]"}
                             aria-label={"All minecraft versions the mod supports"}>
                        <div className={"modrinth-card-area-stat"}>
                            <span className={"inline-flex items-center gap-1"}>
                                <LuBox size={20} />{latest}
                            </span>
                            <sup className={"leading-4 top-0"}>
                                {mod.game_versions.length > 1 ? " +" + (mod.game_versions.length - 1) : ""}
                            </sup>
                        </div>
                    </Tooltip>
                </div>
            </CardBody>
        </Card>
    );

    /*
    <div className={"bg-modrinth-brand leading-6 rounded-[0.5rem] px-2"}>{data.version_number}</div>
                            <Tooltip content={versions.toString()} placement={"top"} showArrow
                                     className={"break-normal max-w-[25rem]"}>
                                <div className={"bg-modrinth-brand leading-6 rounded-[0.5rem] px-2 flex"}>
                                    {latest}
                                    <sup className={"leading-4 top-0"}>
                                        {mod.game_versions.length > 1 ? " +" + (mod.game_versions.length - 1) : ""}
                                    </sup>
                                </div>
                            </Tooltip>
    * */
}