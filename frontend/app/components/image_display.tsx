import React, {useState, useRef, useEffect} from "react";
import defaultUrl from "/default.png"
import {analysisImg} from "~/lib/analysis_img"
import {Progress} from "~/components/ui/progress";
import {accessoryConfigs, getAspectRatioType} from "~/lib/accessory_config";


const ImageDisplay = ({ selectedAccessory }: { selectedAccessory: string | null }) => {
    const [imageUrl, setImageUrl] = useState(defaultUrl);
    const imageUploadRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [detectedBoxes, setDetectedBoxes] = useState<number[][]>([]);
    const [scale, setScale] = useState({x: 1, y: 1});
    const [offset, setOffset] = useState({x: 0, y: 0}); // 新增：计算偏移量

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

            const boxes: number[][] = response.data;
            setDetectedBoxes(boxes);

            if (boxes.length > 0) {
                console.log(`Eye box detected: ${JSON.stringify(boxes[0])}`);
            }

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

    // 计算图片缩放比例和偏移量
    useEffect(() => {
        if (imageRef.current && containerRef.current) {
            const calculateScaleAndOffset = () => {
                const img = imageRef.current;
                const container = containerRef.current;

                if (!img || !container || !img.complete) return;

                // 获取图片的原始尺寸和容器尺寸
                const naturalWidth = img.naturalWidth;
                const naturalHeight = img.naturalHeight;
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;

                // 计算图片和容器的宽高比
                const imgRatio = naturalWidth / naturalHeight;
                const containerRatio = containerWidth / containerHeight;

                let scaleX, scaleY;
                let offsetX = 0, offsetY = 0;

                if (imgRatio > containerRatio) {
                    // 图片较宽，高度会填满容器，宽度会被裁剪
                    scaleY = containerHeight / naturalHeight;
                    scaleX = scaleY; // 保持纵横比

                    // 计算水平偏移量
                    const scaledWidth = naturalWidth * scaleX;
                    offsetX = (containerWidth - scaledWidth) / 2;
                } else {
                    // 图片较高，宽度会填满容器，高度会被裁剪
                    scaleX = containerWidth / naturalWidth;
                    scaleY = scaleX; // 保持纵横比

                    // 计算垂直偏移量
                    const scaledHeight = naturalHeight * scaleY;
                    offsetY = (containerHeight - scaledHeight) / 2;
                }

                setScale({x: scaleX, y: scaleY});
                setOffset({x: offsetX, y: offsetY});
                //
                // console.log(`Natural dimensions: ${naturalWidth}x${naturalHeight}`);
                // console.log(`Container dimensions: ${containerWidth}x${containerHeight}`);
                // console.log(`Scale factors: ${scaleX}, ${scaleY}`);
                // console.log(`Offset values: ${offsetX}, ${offsetY}`);
            };

            // 监听图片加载完成和窗口大小变化
            const imgElement = imageRef.current;
            imgElement.onload = calculateScaleAndOffset;
            window.addEventListener('resize', calculateScaleAndOffset);

            // 图片可能已经加载完成
            if (imgElement.complete) {
                calculateScaleAndOffset();
            }

            return () => {
                window.removeEventListener('resize', calculateScaleAndOffset);
            };
        }
    }, [imageUrl]);

    // 生成调试边框
    const renderDebugBox = (box: number[], index: number) => {
        const [xMin, yMin, xMax, yMax] = box;

        // 应用缩放和偏移量
        const left = xMin * scale.x + offset.x;
        const top = yMin * scale.y + offset.y;
        const width = (xMax - xMin) * scale.x;
        const height = (yMax - yMin) * scale.y;

        return (
            <div
                key={index}
                className="absolute border-2 border-red-500"
                style={{
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            />
        );
    };

    const renderAccessory = () => {
        if (!selectedAccessory || detectedBoxes.length < 2) return null;

        const imgWidth = imageRef.current!.naturalWidth;
        const imgHeight = imageRef.current!.naturalHeight;

        const getAdjustedConfig = (width: number, height: number) => {
            const baseSize = 3000;
            const ratio = height / width;
            const dynamicScale = (baseSize / Math.max(width, height)) * (1 + (ratio - 1.2) * 0.3);

            const config = accessoryConfigs[selectedAccessory];
            const ratioType = getAspectRatioType(width, height);
            const baseConfig = {...config.default, ...(config.presets[ratioType] || {})};
            console.log(
                `Accessory：${selectedAccessory} | Type：${ratioType} | config：`,
                accessoryConfigs[selectedAccessory].presets[ratioType]
            );
            return {
                widthMultiplier: baseConfig.widthMultiplier * dynamicScale,
                heightMultiplier: baseConfig.heightMultiplier * dynamicScale,
                positionOffset: baseConfig.positionOffset
            };
        };

        let [eye1, eye2] = detectedBoxes;
        // ensure leftEye has smaller x
        const [leftEye, rightEye] = eye1[0] < eye2[0] ? [eye1, eye2] : [eye2, eye1];
        const [lxMin, lyMin, lxMax, lyMax] = leftEye;
        const [rxMin, ryMin, rxMax, ryMax] = rightEye;

        // calculate center
        const leftEyeCenter = {x: (lxMin + lxMax) / 2, y: (lyMin + lyMax) / 2};
        const rightEyeCenter = {x: (rxMin + rxMax) / 2, y: (ryMin + ryMax) / 2};

        // calculate eye distance
        const eyeDistance = Math.sqrt(
            Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) +
            Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2)
        );

        // calculate angle
        const angle = Math.atan2(rightEyeCenter.y - leftEyeCenter.y, rightEyeCenter.x - leftEyeCenter.x) * (180 / Math.PI);

        // calculate accessory and eye position
        const config = getAdjustedConfig(imgWidth, imgHeight);

        const width = eyeDistance * config.widthMultiplier;
        const height = width * config.heightMultiplier;

        const centerX = (leftEyeCenter.x + rightEyeCenter.x) / 2;
        const centerY = (leftEyeCenter.y + rightEyeCenter.y) / 2;

        // apply scale
        const left = centerX * scale.x + offset.x - width / 2;
        const top = centerY * scale.y + offset.y - height / 2;

        return (
            <img
                src={selectedAccessory}
                alt="selected-accessory"
                className="absolute"
                style={{
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "center center",
                }}
            />
        );

    };

    return (
        <div className="w-full h-2/3 flex flex-col items-center"
        >
            <div
                ref={containerRef}
                className="relative w-80 h-96 bg-white mt-8 rounded-3xl overflow-hidden"

            >
                <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="default"
                    className="w-full h-full object-cover"
                />
                {/*{detectedBoxes.length > 0 && detectedBoxes.map(renderDebugBox)}*/}
                {/* render accessory */}
                {renderAccessory()}
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
                    accept="image/*"
                />
            </form>

            { isUploading && (
                <Progress className="w-1/3 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:via-blue-500 [&>div]:to-purple-600" value={progress}/>
            )}
        </div>
    )
}

export default ImageDisplay