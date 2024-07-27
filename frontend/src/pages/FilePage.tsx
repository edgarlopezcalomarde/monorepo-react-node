import { Button } from "@/components/ui/button";
import { API_ENTRY_POINT } from "@/lib/config";
import { Cancel } from "@/lib/icons";
import { UploadIcon } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";


function FilePage() {

    const [files, setFiles] = useState<Array<File>>([]);

    return (
        <div className="max-h-screen flex-1 h-screen  flex flex-col  lg:flex-row p-4 gap-4">
            <div className="flex-grow flex flex-1 flex-col rounded-lg border border-dashed shadow-sm items-center justify-center overflow-auto">
                {files.length > 0 && (
                    <div className="grid w-full h-full grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {files.map((_image, index) => (
                            <div key={index} className="relative h-full">
                                <button
                                    className="absolute bg-red-500 text-white h-[30px] w-[30px] rounded-full flex justify-center items-center top-1 left-1"
                                    onClick={() => handleRemoveInMemoryFile(index)}
                                >
                                    <Cancel />
                                </button>
                                {/* Files */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <Button variant="default">
                    <UploadIcon className="mr-2 h-5 w-5" />
                    <label htmlFor="file-upload">
                        Subir archivos
                        <input
                            accept="image/*"
                            className="sr-only"
                            id="file-upload"
                            multiple
                            onChange={handleFileChange}
                            type="file"
                        />
                    </label>
                </Button>

                <Button variant="default" onClick={handleFileToTheServer}>
                    Guardar
                </Button>


                <Button variant="default" onClick={handleFileToTheServer} className="mt-auto">
                    <Link to="/" >Imagenes</Link>
                </Button>


            </div>
        </div>

    )

    function handleRemoveInMemoryFile(index: number) {
        setFiles((f) => f.filter((_image, i) => i !== index));
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFiles = Array.from(event.target.files as FileList);
        setFiles(selectedFiles);
    }


    async function handleFileToTheServer() {
        if (files.length > 0) {
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append(`imagen${index}`, file);
            });


            try {
                const res = await fetch(API_ENTRY_POINT + "/file/upload", {
                    method: "POST",
                    body: formData
                })


                console.log(res)

            } catch (err) {
                console.log("--->", err);
            }
        } else {
            console.log('Por favor selecciona al menos una imagen.');
        }
    }
}

export default FilePage

