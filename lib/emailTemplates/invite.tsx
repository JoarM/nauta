import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Tailwind } from "@react-email/tailwind";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";
import { Heading } from "@react-email/heading";
import { Button } from "@react-email/button";
import { Text } from "@react-email/text";
import { Link } from "@react-email/link";
import { Hr } from "@react-email/hr";

interface EmailTemplateProps {
    link: string;
    sender: string;
    photoUrl: string;
    projectName: string;
    to: string;
    senderEmail: string;
}

export default function InviteTemplate({
    link,
    sender,
    photoUrl,
    projectName,
    to,
    senderEmail
} : EmailTemplateProps) {
    return (
        <Html>
            <Head>
                <title>Nauta project invite by { sender }</title>
            </Head>
            <Tailwind>
                <Body className="py-10 font-sans" style={{
                    backgroundColor: "hsl(222.2 26% 11.1%)",
                    color: "hsl(210 40% 98%)",
                }}>
                    <Container className="border border-solid rounded my-10 mx-auto p-5 w-96" style={{
                        borderColor: "hsl(217.2 32.6% 17.5%)"
                    }}>
                        <Heading className="text-2xl font-normal text-center mb-8">Join <strong>{projectName}</strong> on <strong>Nauta</strong></Heading>
                        <Text className="text-base mb-6">Hello {to}</Text>
                        <Text className="leading-6"><strong>{ sender }</strong> ( <Link href={`mailto:${ senderEmail }`}>{ senderEmail }</Link> ) has invited you to the <strong>{projectName}</strong> project on <strong>Nauta</strong></Text>
                        <Img src={photoUrl} alt="" height={64} width={64} className="mx-auto rounded-full aspect-square object-cover"/>
                        <section className="text-center mt-6">
                            <Button className="px-5 py-3 rounded" href={link} style={{
                                backgroundColor: "hsl(210 40% 98%)",
                                color: "hsl(222.2 84% 4.9%)",
                            }}>
                                Join the project
                            </Button>
                        </section>
                        <Text className="leading-6">or copy and paste this URL into your browser: <Link href={link}>{link}</Link></Text>
                        <Hr className="border border-solid" style={{
                        borderColor: "hsl(217.2 32.6% 17.5%)"
                        }}/>
                        <Text className="text-xs leading-6" style={{
                            color: "hsl(215 20.2% 65.1%)"
                        }}>
                            This invitation was intended for <strong>{to}</strong>. If you were not expecting this invitation, you can ignore this email.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}