import Link from "next/link";
import FabricLogo from "@/components/FabricLogo";
import {SiCurseforge, SiModrinth} from "react-icons/si";
import {HiExternalLink} from "react-icons/hi";
import {FaDiscord, FaGithub} from "react-icons/fa";
import {TbBook2, TbChevronDown, TbChevronRight, TbHome, TbInfoCircle} from "react-icons/tb";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Tooltip
} from "@nextui-org/react";
import {baseClasses, defaultClasses, inter} from "@/system/utils";
import {Image} from "@nextui-org/image";
import React, {ReactNode} from "react";
import {ThemeToggle} from "@/components/ThemeSwitcher";
import {IoShareSocial} from "react-icons/io5";
import {LuBox} from "react-icons/lu";

const classes = {
    navLinkContent: `${defaultClasses.navContentRounded} ${defaultClasses.link} !transition-fade !duration-100 text-size-inherit`,
    mobileNavLinkContent: `${baseClasses.link} transition-fade duration-100 font-semibold text-size-inherit w-full h-full py-2 rounded-2xl text-center justify-center items-center`,

    catNavLinkContent: `${baseClasses.dropdownItem} transition-fade duration-100 text-size-inherit`,
    catMobileNavLinkContent: `${baseClasses.link} transition-fade duration-100 hover:bg-[#aaaaaa10] !text-left text-size-inherit w-full h-full py-2 rounded-2xl text-center justify-center items-center`,

    catNavLinkHeaderContent: `${baseClasses.navContentBase} ${baseClasses.link} text-size-inherit`,
    catMobileNavLinkHeaderContent: `${baseClasses.link} transition-fade duration-100 font-semibold text-size-inherit w-full h-full text-center justify-center items-center`,
}

function getLinkClasses(mobile: boolean): string {
    return mobile ? classes.mobileNavLinkContent : classes.navLinkContent
}

function getCatLinkClasses(mobile: boolean): string {
    return mobile ? classes.catMobileNavLinkContent : classes.catNavLinkContent
}

function getCatLinkHeaderClasses(mobile: boolean): string {
    return mobile ? classes.catMobileNavLinkHeaderContent : classes.catNavLinkHeaderContent
}

function buildDefaultWrapper(href: string, external?: boolean): (mobile: boolean, content: React.JSX.Element | null) => React.JSX.Element {
    return (mobile: boolean, content: React.ReactNode | null) => {
        const component = (
            <Link className={getLinkClasses(mobile)} href={href}>
                {content}
            </Link>
        );

        const props: any = {};
        if (external) props["target"] = "_blank";

        return React.cloneElement(component, props);
    }
}

function buildDefaultCatItemWrapper(mobile: boolean, href: string, external?: boolean): React.JSX.Element {
    const component = buildDefaultWrapper(href, external)(mobile, null);
    return React.cloneElement(component, {className: getCatLinkClasses(mobile)});
}

function buildDefaultCatWrapper(mobile: boolean, content: React.JSX.Element | null): React.JSX.Element {
    return (
        <div className={getCatLinkHeaderClasses(mobile)}>
            {content}
        </div>
    );
}

export function Div({...props}) {
    return <div {...props} className={props.className ?? "" + " text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold"}/>
}

interface MenuItem {
    content: string | React.JSX.Element
    description?: string | ReactNode
    wrapper?: (mobile: boolean, content: React.JSX.Element) => React.JSX.Element
    key: string
    prefix?: React.JSX.Element | ((mobile: boolean) => React.JSX.Element)
    suffix?: React.JSX.Element | ((mobile: boolean) => React.JSX.Element)
    mobileOnly?: boolean
    className?: string
    disabled?: boolean
}

interface CategoryItem extends MenuItem {
    itemWrapper?: (mobile: boolean) => React.JSX.Element
}

interface Category {
    content: string | React.JSX.Element
    key: string
    items: CategoryItem[]
    nodeOverride?: (mobile: boolean) => React.FunctionComponent<any> | null
    prefix?: React.JSX.Element | ((mobile: boolean) => React.JSX.Element)
    suffix?: React.JSX.Element | ((mobile: boolean) => React.JSX.Element)
}

export const navItems: (MenuItem | Category)[] = [
    {
        content: "Home",
        wrapper: buildDefaultWrapper("/"),
        key: "home",
        prefix: <TbHome/>,
        mobileOnly: true
    },
    {
        content: "About",
        wrapper: buildDefaultWrapper("/about"),
        key: "about",
        prefix: <TbInfoCircle/>,
    },
    {
        content: "Minecraft",
        key: "category/minecraft",
        prefix: <LuBox/>,
        nodeOverride: (mobile) => mobile ? Div : null,
        items: [
            {
                content: "Mods",
                description: "A full list of my Minecraft mods on Modrinth",
                wrapper: buildDefaultCatWrapper,
                itemWrapper: mobile => buildDefaultCatItemWrapper(mobile, "/minecraft/mods"),
                key: "mods",
                prefix: <FabricLogo className={"w-4 h-4"}/>
            },
            {
                content: "Modrinth",
                description: "My Modrinth profile where I post all my Minecraft mods",
                wrapper: buildDefaultCatWrapper,
                itemWrapper: mobile => buildDefaultCatItemWrapper(mobile, "https://modrinth.com/user/Foksha", true),
                key: "modrinth",
                prefix: <SiModrinth/>,
                suffix: <HiExternalLink/>,
                className: "text-modrinth-brand"
            },
            {
                content: "Curseforge",
                description: (
                    <>
                        My Curseforge profile where I post <em>most</em> of my Minecraft mods
                    </>
                ),                
                wrapper: buildDefaultCatWrapper,
                itemWrapper: mobile => buildDefaultCatItemWrapper(mobile, "https://www.curseforge.com/members/foksha/projects", true),
                key: "curseforge",
                prefix: <SiCurseforge/>,
                suffix: <HiExternalLink/>,
                className: "text-curseforge-brand"
            },
        ]
    },
    {
        content: "Socials",
        key: "category/social",
        prefix: <IoShareSocial/>,
        nodeOverride: (mobile) => mobile ? Div : null,
        items: [
            {
                content: "Github",
                description: "All my open-source projects on Github",
                wrapper: buildDefaultCatWrapper,
                itemWrapper: mobile => buildDefaultCatItemWrapper(mobile, "https://github.com/FokshaWasTaken", true),
                key: "github",
                prefix: <FaGithub/>,
                suffix: <HiExternalLink/>
            },
        ]
    },
    {
        content: "Portfolio",
       // wrapper: buildDefaultWrapper("https://portfolio.foksha.com"),
        wrapper: (mobile, content) => (
            <Tooltip content={"🚧 Under construction"} showArrow placement={"bottom"}>
                <div className={getLinkClasses(mobile)}>
                    {content}
                </div>
            </Tooltip>
        ),
        //className: "opacity-50 hover:opacity-50 cursor-no-drop",
        prefix: <TbBook2/>,
        key: "docs",
    },
];

function buildCategoryName(category: Category, mobile: boolean = false): React.ReactElement | null {
    const prefix = typeof category.prefix === "function" ? category.prefix(mobile) : category.prefix;
    let suffix = typeof category.suffix === "function" ? category.suffix(mobile) : category.suffix;

    if (!suffix) suffix = mobile ? <TbChevronRight/> : <TbChevronDown/>;

    return <>{prefix}{prefix && <>&nbsp;</>}{category.content}{suffix && <>&nbsp;</>}{suffix}</>
}

function buildCategoryDropdown(category: Category, node: React.FunctionComponent<any>, mobile: boolean = false): React.ReactElement | null {
    const items = category.items;
    const name = buildCategoryName(category, mobile);
    const trigger = (
        <DropdownTrigger>
            <Button
                disableRipple
                disableAnimation
                className={`${getLinkClasses(mobile)} h-auto gap-0`}
                radius="sm"
                variant="light"
            >
                {name}
            </Button>
        </DropdownTrigger>
    );
    return (
        <Dropdown key={category.key + "-dropdown"} className={"max-w-[calc(100vw-30px)]"}>
            {React.createElement(node, {}, trigger)}
            <DropdownMenu
                aria-label={category.key}
                className="w-full max-w-[340px]"
                itemClasses={{
                    base: "gap-4 text-left",
                    description: "transition-fade duration-100",
                }}
            >
                {items.map(item => {
                    const wrapper = item.itemWrapper ? item.itemWrapper(mobile) : null;
                    const nodeOverride = category.nodeOverride ? category.nodeOverride(mobile) : null;
                    const component = (
                        <DropdownItem
                            key={item.key}
                            description={<span className={"whitespace-pre-wrap"}>{item.description}</span>}
                        >
                            {buildNavItem(item, nodeOverride ?? node, mobile)}
                        </DropdownItem>
                    );

                    let props: any = {...component.props};
                    if (wrapper) {
                        props["as"] = wrapper.type;
                        //make sure the original component props override the wrapper props
                        props = {...wrapper.props, ...props};
                    }

                    return React.cloneElement(component, props)
                })}
            </DropdownMenu>
        </Dropdown>
    );
}

export function buildNavSection(item: MenuItem | Category, node: React.FunctionComponent<any>, mobile: boolean = false): React.ReactElement | null {
    let component: React.ReactElement | null
    if ((item as Category).items) {
        component = buildCategoryDropdown(item as Category, node, mobile);
    } else {
        component = buildNavItem(item as MenuItem, node, mobile);
    }

    return component;
}

function buildNavItem(item: MenuItem, node: React.FunctionComponent<any>, mobile: boolean = false): React.ReactElement | null {
    const prefix = typeof item.prefix === "function" ? item.prefix(mobile) : item.prefix;
    const suffix = typeof item.suffix === "function" ? item.suffix(mobile) : item.suffix;

    const createChildren = () => {
        const itemContent = <>{prefix}{prefix && <>&nbsp;</>}{item.content}{suffix && <>&nbsp;</>}{suffix}</>;
        return item.wrapper ? item.wrapper(mobile, itemContent) : itemContent;
    };

    const component = React.createElement(node, {
        className: item.className ?? node.defaultProps?.className,
        key: item.key
    }, createChildren());

    //Build optional props
    const props: any = {}
    if (item.disabled != null) props["disabled"] = item.disabled;

    return (item.mobileOnly && !mobile) ? null : React.cloneElement(component, props);
}

export default function MainNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <>
            <Navbar
                maxWidth={"xl"}
                className={`${inter.variable} font-base bg-transparent`}
                isBordered={false}
                isBlurred={false}
                shouldHideOnScroll
                position={"sticky"}
                onMenuOpenChange={setIsMenuOpen}
                classNames={{
                    wrapper: "mt-4 rounded-xl shadow-medium mx-2 xl:mx-0 bg-[#f4f4f4] dark:bg-[#0e0f14]",
                    menuItem: [
                        "text-center items-center justify-center",
                        "dark:bg-default/40",
                        "dark:hover:bg-default",
                        "transition-fade duration-100",
                        "text-3xl shadow-medium h-auto",
                        "rounded-2xl",
                    ],
                }}
            >
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lmd:hidden"
                    key={"menu-toggle"}
                />



                <NavbarContent className={"hidden lmd:flex gap-1 !justify-center"} key={"page-nav"}>
                    {navItems.map((item) => buildNavSection(item, NavbarItem))}
                </NavbarContent>

                <NavbarContent className={"hidden lmd:flex !justify-end"} key={"nav-extra"}>
                    <NavbarItem className={"rounded-full kofi-glow hidden md:flex"}>
                        <Tooltip content={"Buy me a coffee"} showArrow placement={"bottom"}>
                            <Link href={"https://ko-fi.com/foksha"} target={"_blank"} className={`${classes.navLinkContent} h-full !py-1 dark:hover:bg-[#00000020] transition-background`}>
                                <div className={"!flex"}>
                                    <Image src={"/assets/kofi_logo_nolabel.webp"} alt={"Donate at Ko-Fi"} width={24}
                                           height={24} radius={"none"} className={"min-h-[1.5rem] min-w-[1.5rem]"}/>
                                    &nbsp;Donate
                                </div>
                            </Link>
                        </Tooltip>
                    </NavbarItem>
                    <NavbarItem>
                        <ThemeToggle/>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu className={"fake-nav-height"} key={"navbar"}>
                    <span className={"pt-20 bg-transparent"}/>
                    {navItems.map((item) => buildNavSection(item, NavbarMenuItem, true))}
                    <div className={"my-3"}/>
                    <NavbarMenuItem className={"rounded-xl py-[0.125rem] kofi-glow min-h-[3.25rem]"} key={"ko-fi"}>
                        <Tooltip content={"Buy me a coffee"} showArrow placement={"bottom"}>
                            <Link href={"https://ko-fi.com/foksha"} target={"_blank"} className={""}>
                                <div className={`${classes.mobileNavLinkContent} !flex h-full justify-center items-center`}>
                                    <Image src={"/assets/kofi_logo_nolabel.webp"} alt={"Donate at Ko-Fi"} width={24}
                                           height={24} radius={"none"} className={"min-h-[1.5rem] min-w-[1.5rem]"}/>
                                    &nbsp;Donate
                                </div>
                            </Link>
                        </Tooltip>
                    </NavbarMenuItem>
                    <NavbarMenuItem className={"p-0 !bg-transparent shadow-none backdrop-blur-0"}>
                        <ThemeToggle className={`${getLinkClasses(true)} rounded-xl font-semibold py-2 h-auto w-full flex flex-row justify-center items-center shadow-medium`} showLabel/>
                    </NavbarMenuItem>
                    <div className={"my-2"}/>
                </NavbarMenu>
            </Navbar>
        </>
    )
}
