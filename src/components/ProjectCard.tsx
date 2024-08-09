import mr from '@/styles/Modrinth.module.scss'
import {Image} from "@nextui-org/image";
import {LuCalendar, LuDownload, LuEdit, LuGlobe, LuHardDrive, LuHeart, LuInfo, LuMonitor} from "react-icons/lu";
import {formatCategory, formatNumber} from "@/system/utils";
import React, {ReactElement} from "react";
import {Tooltip} from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

/* THIS CODE IS PORTED FROM VUE, A PROPER REACT VERSION WILL BE DEVELOPED IN THE FUTURE */

function Optional({children, condition}: { children: any, condition: boolean }) {
    return condition ? children : null;
}

type EnvironmentCompatibility = 'optional' | 'required' | 'unsupported';

function Avatar({src, alt, size, circle, noShadow, pixelated}: {
    src?: string,
    alt?: string,
    size: string,
    circle?: boolean,
    noShadow?: boolean,
    pixelated?: boolean
}) {
    return (
        <div className={mr["icon"]}>
            {
                src ? (
                    <Image
                        tabIndex={-1}
                        className={`${mr["avatar"]} w-${size} h-${size} ${circle ? 'circle' : ''} ${noShadow ? 'no-shadow' : ''} ${pixelated ? 'pixelated' : ''}`}
                        src={src}
                        alt={alt}
                        loading="lazy"
                    />
                ) : (
                    <svg
                        tabIndex={-1}
                        className={`${mr["avatar"]} w-${size} h-${size} ${circle ? 'circle' : ''} ${noShadow ? 'no-shadow' : ''}`}
                        xmlSpace="preserve"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="1.5"
                        clipRule="evenodd"
                        viewBox="0 0 104 104"
                        aria-hidden="true"
                    >
                        <path fill="none" d="M0 0h103.4v103.4H0z"/>
                        <path fill="none" stroke="#9a9a9a" strokeWidth="5"
                              d="M51.7 92.5V51.7L16.4 31.3l35.3 20.4L87 31.3 51.7 11 16.4 31.3v40.8l35.3 20.4L87 72V31.3L51.7 11"
                        />
                    </svg>
                )
            }
        </div>
    );
}

const EnvironmentIndicator = function ({clientSide, serverSide, type = 'mod', typeOnly, alwaysShow}: {
    clientSide: EnvironmentCompatibility
    serverSide: EnvironmentCompatibility
    type: 'mod' | 'modpack' | 'resourcepack' | 'shader' | 'plugin'
    typeOnly?: boolean
    alwaysShow?: boolean
}) {
    const content = (() => {
        if (clientSide === 'optional' && serverSide === 'optional') {
            return (
                <>
                    <LuGlobe aria-hidden="true"/>
                    &nbsp;Client or server
                </>
            );
        } else if (clientSide === 'required' && serverSide === 'required') {
            return (
                <>
                    <LuGlobe aria-hidden="true"/>
                    &nbsp;Client and server
                </>
            );
        } else if ((clientSide === 'optional' || clientSide === 'required') && (serverSide === 'optional' || serverSide === 'unsupported')) {
            return (
                <>
                    <LuMonitor aria-hidden="true"/>
                    &nbsp;Client
                </>
            );
        } else if ((serverSide === 'optional' || serverSide === 'required') && (clientSide === 'optional' || clientSide === 'unsupported')) {
            return (
                <>
                    <LuHardDrive aria-hidden="true"/>
                    &nbsp;Server
                </>
            );
        } else if (serverSide === 'unsupported' && clientSide === 'unsupported') {
            return (
                <>
                    <LuGlobe aria-hidden="true"/>
                    &nbsp;Unsupported
                </>
            );
        } else if (alwaysShow) {
            return (
                <>
                    <LuInfo aria-hidden="true"/>
                    &nbsp;A {type}
                </>
            );
        } else {
            return null;
        }
    })();

    return (
        <>
            {
                typeOnly ? (
                    <span className={`${mr["environment"]} inline-flex items-center`}>
                        <LuInfo aria-hidden="true"/>
                        A {type}
                    </span>
                ) : (
                    !['resourcepack', 'shader'].includes(type) && !(type === 'plugin') ? (
                        <span className={`${mr["environment"]} inline-flex items-center`}>
                            {content}
                        </span>
                    ) : null
                )
            }
        </>
    )
}

export type Category = {
    icon: ReactElement
    name: string
}

function Categories({categories, children}: { categories: Category[], children?: any }) {
    return (
        <div className={mr["categories"]}>
            {children}
            {
                categories.map(category => {
                    return (
                        <span key={category.name}>
                            {category.icon + formatCategory(category.name)}
                        </span>
                    )
                })
            }
        </div>
    )
}

const ProjectCard = function ({children, type = 'mod', name = "Unknown project", author, description = "No description provided", iconUrl, downloads, follows, createdAt = '0000-00-00', updatedAt = '0000-00-00', categories = [], serverSide, clientSide, featuredImage, showUpdatedDate = true, color}: {
    children?: any
    type: 'mod' | 'modpack' | 'resourcepack' | 'shader' | 'plugin'
    name: string
    author?: string
    description: string
    iconUrl?: string
    downloads?: number
    follows?: number
    createdAt: string
    updatedAt: string
    categories: Category[]
    serverSide?: EnvironmentCompatibility
    clientSide?: EnvironmentCompatibility
    featuredImage?: string
    showUpdatedDate: boolean
    color?: number
}) {
    function toColor(colorIn: number) {
        let color = colorIn

        color >>>= 0
        const b = color & 0xff
        const g = (color & 0xff00) >>> 8
        const r = (color & 0xff0000) >>> 16
        return 'rgba(' + [r, g, b, 1].join(',') + ')'
    }

    function createdDate() {
        return dayjs(createdAt).format('MMMM D, YYYY [at] h:mm:ss A')
    }

    function sinceCreation() {
        return dayjs(createdAt).fromNow()
    }

    function updatedDate() {
        return dayjs(updatedAt).format('MMMM D, YYYY [at] h:mm:ss A')
    }

    function sinceUpdated() {
        return dayjs(updatedAt).fromNow()
    }

    const bgStyle = color ? {
        backgroundColor: toColor(color)
    } : undefined;

    return (
        <>
            <article className={`w-full h-full transition-background ${mr["project-card"]} ${mr["base-card"]}`} aria-label="name" role="listitem">
                <Avatar src={iconUrl} alt={name} size="24" no-shadow/>
                {
                    featuredImage ? (
                        <div style={bgStyle}>
                            <Image src={featuredImage} alt="gallery image" loading="lazy" tabIndex={-1}/>
                        </div>
                    ) : null
                }
                <div className={mr["title"]}>
                    <h2 className={mr["name"]}>
                        {name}
                    </h2>
                    {
                        author ? (
                            <p className={`${mr["author"]} inline-flex`}>
                                by&nbsp;<div className={mr["title-link"]}>{author}</div>
                            </p>
                        ) : null
                    }
                </div>
                <p className={mr["description"]}>
                    {description}
                </p>
                <div className={mr["tags"]}>
                    <Categories categories={categories}>
                        <Optional condition={!!clientSide && !!serverSide}>
                            <EnvironmentIndicator clientSide={clientSide as EnvironmentCompatibility} serverSide={serverSide as EnvironmentCompatibility} type={type}/>
                        </Optional>
                    </Categories>
                </div>
                <div className={mr["stats"]}>
                    <Optional condition={!!downloads}>
                        <div className={mr["stat"]}>
                            <LuDownload aria-hidden="true"/>
                            <p>
                                <strong>{formatNumber(downloads as number)}</strong>
                                <span className={mr["stat-label"]}>
                                    &nbsp;download
                                    <Optional condition={downloads !== 1}>
                                        <span>s</span>
                                    </Optional>
                                </span>
                            </p>
                        </div>
                    </Optional>
                    <Optional condition={!!follows}>
                        <div className={mr["stat"]}>
                            <LuHeart aria-hidden="true"/>
                            <p>
                                <strong>{formatNumber(follows as number)}</strong>
                                <span className={mr["stat-label"]}>
                                    &nbsp;follower
                                    <Optional condition={follows !== 1}>s</Optional>
                                </span>
                            </p>
                        </div>
                    </Optional>
                    <div className={mr["buttons"]}>
                        {children}
                    </div>
                    {
                        showUpdatedDate ? (
                            <Tooltip content={updatedDate()} showArrow>
                                <div className={`!hidden sm:!flex ${mr["stat"]} ${mr["date"]}`}>
                                    <LuEdit aria-hidden="true"/>
                                    <span className={mr["date-label"]}>Updated </span>{sinceUpdated()}
                                </div>
                            </Tooltip>
                        ) : (
                            <Tooltip content={createdDate()} showArrow>
                                <div className={`${mr["stat"]} ${mr["date"]}`}>
                                    <LuCalendar aria-hidden="true"/>
                                    <span className={mr["date-label"]}>Published </span>{sinceCreation()}
                                </div>
                            </Tooltip>
                        )
                    }
                </div>
            </article>
        </>
    );
}

// This is here so IDEA stops complaining
ProjectCard.defaultProps = {
    type: 'mod',
    name: "Unknown project",
    description: "No description provided",
    createdAt: '0000-00-00',
    updatedAt: '0000-00-00',
    categories: [],
    showUpdatedDate: true
}

export default ProjectCard;
