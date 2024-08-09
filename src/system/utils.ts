import {McVersion, PistonMeta} from "@/system/types";
import {Inter} from "next/font/google";

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export const baseClasses = {
    navContentBase: "font-semibold",
    navContentSpacing: "px-[0.5rem] py-[0.15rem]",
    navContentHover: "hover:bg-[#00000020] dark:hover:bg-[#aaaaaa10]",
    navItem: "text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold",
    navMenuItem: "text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold",
    link: "relative inline-flex items-center outline-none data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-primary data-[focus-visible=true]:ring-offset-2 data-[focus-visible=true]:ring-offset-background data-[focus-visible=true]:dark:ring-offset-background-dark no-underline text-base whitespace-nowrap box-border data-[active=true]:font-semibold motion-reduce:hover:transform-none",
    dropdownItem: "flex group items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-small cursor-pointer tap-highlight-transparent data-[pressed=true]:opacity-70 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 data-[hover=true]:bg-default data-[hover=true]:text-default-foreground gap-4 motion-reduce:hover:transform-none",
}

export const defaultClasses = {
    navContent: `${baseClasses.navContentBase} ${baseClasses.navContentSpacing} ${baseClasses.navContentHover}`,
    navContentRounded: `${baseClasses.navContentBase} ${baseClasses.navContentSpacing} ${baseClasses.navContentHover} rounded-full`,
    link: `${baseClasses.link} hover:opacity-80`,
}

export function formatNumber(number: number, abbreviate: boolean = true): string {
    const x = +number
    if (x >= 1000000 && abbreviate) {
        return (x / 1000000).toFixed(2).toString() + 'M'
    } else if (x >= 10000 && abbreviate) {
        return (x / 1000).toFixed(1).toString() + 'k'
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}

export function formatVersions(versionArray: string[], pistonMeta: PistonMeta): string {
    const allVersions = [...pistonMeta.versions].reverse()
    const allReleases = allVersions.filter((x: McVersion) => x.type === 'release')

    const intervals = []
    let currentInterval = 0

    for (let i = 0; i < versionArray.length; i++) {
        const index = allVersions.findIndex((x: McVersion) => x.id === versionArray[i])
        const releaseIndex = allReleases.findIndex((x: McVersion) => x.id === versionArray[i])

        if (i === 0) {
            intervals.push([[versionArray[i], index, releaseIndex]])
        } else {
            const intervalBase = intervals[currentInterval]

            if (
                (index - (intervalBase[intervalBase.length - 1][1] as number) === 1 ||
                    releaseIndex - (intervalBase[intervalBase.length - 1][2] as number) === 1) &&
                (allVersions[intervalBase[0][1] as number].type === 'release' ||
                    allVersions[index].type !== 'release')
            ) {
                intervalBase[1] = [versionArray[i], index, releaseIndex]
            } else {
                currentInterval += 1
                intervals[currentInterval] = [[versionArray[i], index, releaseIndex]]
            }
        }
    }

    const newIntervals = []
    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i]

        if (interval.length === 2 && interval[0][2] !== -1 && interval[1][2] === -1) {
            let lastSnapshot = null
            for (let j: number = interval[1][1] as number; j > (interval[0][1] as number); j--) {
                if (allVersions[j].type === 'release') {
                    newIntervals.push([
                        interval[0],
                        [
                            allVersions[j].id,
                            j,
                            allReleases.findIndex((x: McVersion) => x.id === allVersions[j].id),
                        ],
                    ])

                    if (lastSnapshot !== null && lastSnapshot !== j + 1) {
                        newIntervals.push([[allVersions[lastSnapshot].id, lastSnapshot, -1], interval[1]])
                    } else {
                        newIntervals.push([interval[1]])
                    }

                    break
                } else {
                    lastSnapshot = j
                }
            }
        } else {
            newIntervals.push(interval)
        }
    }

    const output = []

    for (const interval of newIntervals) {
        if (interval.length === 2) {
            output.push(`${interval[0][0]}—${interval[1][0]}`)
        } else {
            output.push(interval[0][0])
        }
    }

    return (output.length === 0 ? versionArray : output).join(', ')
}

export function capitalizeString(name: string): string {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : name
}

export function formatCategory(name: string): string {
    switch (name) {
        case 'modloader':
            return "Risugami's ModLoader"
        case 'bungeecord':
            return 'BungeeCord'
        case 'liteloader':
            return 'LiteLoader'
        case 'game-mechanics':
            return 'Game Mechanics'
        case 'worldgen':
            return 'World Generation'
        case 'core-shaders':
            return 'Core Shaders'
        case 'gui':
            return 'GUI'
        case '8x-':
            return '8x or lower'
        case '512x+':
            return '512x or higher'
        case 'kitchen-sink':
            return 'Kitchen Sink'
        case 'path-tracing':
            return 'Path Tracing'
        case 'pbr':
            return 'PBR'
        case 'datapack':
            return 'Data Pack'
        case 'colored-lighting':
            return 'Colored Lighting'
        case 'optifine':
            return 'OptiFine'
    }

    return capitalizeString(name)
}
