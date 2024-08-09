import React, {useEffect, useState} from 'react'
import {useTheme} from 'next-themes'
import {HiSun} from "react-icons/hi"
import {HiComputerDesktop} from "react-icons/hi2"
import {RiMoonClearFill} from "react-icons/ri"
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger, Selection
} from "@nextui-org/react";
import {inter} from "@/system/utils";

export function ThemeToggle({className, showLabel}: {
    className?: string,
    showLabel?: boolean
} = {showLabel: false}): React.ReactElement | null {
    let {theme, setTheme} = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    const iconClasses: string = "text-xl pointer-events-none flex-shrink-0";

    return (
        <>
            <Dropdown
                key={"theme-dropdown"}
                placement={"bottom"}
                //backdrop={"opaque"} //Disabled due to bug on NextUI
                className={`${inter.variable} font-base p-2`}
                showArrow
            >
                <DropdownTrigger>
                    <Button
                        isIconOnly={!showLabel} disableRipple variant={"flat"}
                        className={className ?? "rounded-full text-2xl p-[0.375rem] bg-[#d7d9dc] dark:bg-[#1b1d29] shadow-medium"}
                    >
                        <span className={"flex items-center"}>
                            <ThemeIcon/>
                            {showLabel && <>&nbsp;Change theme</>}
                        </span>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    key={"theme-dropdown-menu"}
                    selectedKeys={new Set([theme || 'system'])}
                    selectionMode={"single"}
                    className={"font-semibold"}
                    disabledKeys={new Set([theme || 'system'])}
                    onSelectionChange={(e: Selection) => {
                        setTheme(Array.from(e)[0] as string)
                    }}
                    itemClasses={{
                        title: "text-lg font-semibold",
                    }}
                >
                    <DropdownItem
                        key={"light"}
                        startContent={<HiSun className={iconClasses}/>}
                        title={"Light"}
                        className={"py-[0.5rem] pl-[1rem]"}
                    />
                    <DropdownItem
                        key={"dark"}
                        startContent={<RiMoonClearFill className={iconClasses}/>}
                        title={"Dark"}
                        className={"py-[0.5rem] pl-[1rem]"}
                    />
                    <DropdownItem
                        key={"system"}
                        startContent={<HiComputerDesktop className={iconClasses}/>}
                        title={"System"}
                        className={"py-[0.5rem] pl-[1rem]"}
                    />
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

function ThemeIcon(): React.ReactElement | null {
    let {theme} = useTheme()

    switch (theme) {
        case 'light':
            return <HiSun className="w-6 h-6"/>
        case 'dark':
            return <RiMoonClearFill className="w-6 h-6"/>
        case 'system':
            return <HiComputerDesktop className="w-6 h-6"/>
        default:
            return null;
    }
}
