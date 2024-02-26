import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <header>
            <nav className="w-full flex items-center justify-between p-4">
                <ul className="flex items-center justify-center">
                    <li className="bg-white rounded">
                        <Image src="/images/icons/qr-icon.svg" alt="logo icon" width={30} height={30} />
                    </li>
                </ul>

                <ul className="flex items-center gap-4 justify-center">
                    <li>
                        <Button variant="link">
                            <Link href="/about">
                                About
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Link href="/">
                            <Button variant="default">Generate QR</Button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}