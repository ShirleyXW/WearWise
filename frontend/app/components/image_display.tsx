import React, {useState, useRef} from "react";
import defaultUrl from "/default.png"
import {analysisImg} from "~/lib/analysis_img"
import {Progress} from "~/components/ui/progress";

const ImageDisplay = ({ selectedAccessory }: { selectedAccessory: string | null }) => {
    const [imageUrl, setImageUrl] = useState(defaultUrl);
    const imageUploadRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const fileHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        imageUploadRef.current?.click();

    }
    const uploadImgDisplay = async () => {
        const uploadImg = imageUploadRef.current?.files?.[0];
        if (!uploadImg) return;

        setProgress(0);
        setIsUploading(true);

        const savedUrl = URL.createObjectURL(uploadImg);
        setImageUrl(savedUrl);
        const formData = new FormData();
        formData.append("file", uploadImg);
        try {
            const response = await analysisImg(formData, {
                onUploadProgress: (progressEvent: ProgressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                }
            });
            console.log(response?.data);
            setProgress(100);
        } catch (e) {
            console.log(e);
        } finally {
            setTimeout(() => {
                setIsUploading(false);
                setProgress(0);
            }, 1000);
        }
    }

    return (
        <div className="w-full h-2/3 flex flex-col items-center">
            <div className="w-fit h-fit bg-white bg-white mt-8 rounded-3xl">
                <img src={imageUrl} alt="default" className="w-80 h-96 object-cover"/>
                {/* selected accessories pasted onto portrait */}
                {selectedAccessory && (
                    <img
                        src={selectedAccessory}
                        alt="selected-accessory"
                        className="absolute top-20 left-124 transform -translate-x-1/2 w-32"
                    />
                )}
            </div>
            <form className="my-8">
                <button type="submit"
                        className="text-white border border-solid bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 my-auto w-24 rounded-full"
                        onClick={fileHandler}
                >
                    upload
                </button>
                <input
                    type="file"
                    id="file-input"
                    ref={imageUploadRef}
                    className="text-white hidden"
                    onChange={uploadImgDisplay}
                />
            </form>
            { isUploading && (
                <Progress className="w-1/3 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:via-blue-500 [&>div]:to-purple-600" value={progress}/>
            )}
        </div>

    )
}
export default ImageDisplay