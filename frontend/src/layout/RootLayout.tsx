import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <main>
            <Outlet />
            <Toaster />
        </main>
    );
}