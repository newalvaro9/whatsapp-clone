import Head from 'next/head'

interface parameters {
    children: any,
    title?: string,
    withoutContainer?: boolean
}

export default function Layout({ children, title, withoutContainer }: parameters) {
    return (
        <>
            <Head>
                <title>{title ? title : "Whatsapp clone"}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                withoutContainer ?
                    children
                    : (
                        <div className="container-center-page">
                            {children} {/* {{{body}}} from handlebars*/}
                        </div>
                    )
            }
        </>
    )
}