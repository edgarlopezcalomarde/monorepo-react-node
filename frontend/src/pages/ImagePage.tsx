import { Button } from "@/components/ui/button";
import Camera from "@/components/ui/camera/camera";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { API_ENTRY_POINT } from "@/lib/config";

import { Cancel } from "@/lib/icons";
import { CameraIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

function ImagePage() {
    const [showDialog, setShowDialog] = useState(false);
    const [capturedImages, setCapturedImages] = useState<Array<string>>([]);


    return (
        <div className="max-h-screen flex-1 h-screen  flex flex-col  lg:flex-row p-4 gap-4">
            <div className="flex-grow flex flex-1 flex-col rounded-lg border border-dashed shadow-sm items-center justify-center overflow-auto">
                {capturedImages.length > 0 && (
                    <div className="grid w-full h-full grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {capturedImages.map((image, index) => (
                            <div key={index} className="relative h-full">
                                <button
                                    className="absolute bg-red-500 text-white h-[30px] w-[30px] rounded-full flex justify-center items-center top-1 left-1"
                                    onClick={() => handleRemoveInMemoryImage(index)}
                                >
                                    <Cancel />
                                </button>
                                <img
                                    src={image}
                                    alt="Captured image"
                                    className="aspect-video rounded-md object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {
                    capturedImages.length === 0 && (
                        <div className=" font-medium text-3xl">
                            No hay imagenes para subir
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col gap-2">
                <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <CameraIcon className="mr-2 h-5 w-5" />
                            Realizar Captura
                            <span className="sr-only">Capturar</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="h-svh w-svw max-w-full p-0">
                        <Camera
                            onClosed={() => {
                                setShowDialog(false);
                            }}
                            onCapturedImages={(images) => {
                                setCapturedImages(images);
                                setShowDialog(false);
                            }}
                        />
                    </DialogContent>
                </Dialog>

                <Button variant="default" onClick={handleImageToTheServer}>
                    Guardar
                </Button>

                {/* <Button variant="default" className="mt-auto">
                    <Link to="/file">Archivos</Link>
                </Button> */}
            </div>
        </div>
    );

    function handleRemoveInMemoryImage(index: number) {
        setCapturedImages((images) => images.filter((_image, i) => i !== index));
    }


    async function handleImageToTheServer() {
        if (capturedImages.length === 0) {
            toast.error("No hay fotos en la galeria");
            return
        }
        const formData = new FormData();

        capturedImages.forEach((image) => {
            formData.append("images", image);
        });

        // const saveImagesOnServer = fetch(API_ENTRY_POINT + "/file/image/upload", {
        const saveImagesOnServer = fetch("/api/file/image/upload", {
            method: "POST",
            body: formData,
        }).then(data => {
            if (!data.ok) {
                return data.json().then(err => {
                    throw new Error(err.message || "No se pudo subir la/s imagen/es");
                })
            }
            setCapturedImages([])
            return data.json();
        }).catch(err => {
            throw new Error(err.message || "Error desconocido");
        });

        toast.promise(
            saveImagesOnServer,
            {
                loading: 'Subiendo...',
                success: (data) => {
                    return <b>{data.message}</b>
                },
                error: (err) => {
                    return <b>{err.message}</b>
                },
            }
        );



    }
}

export default ImagePage;
