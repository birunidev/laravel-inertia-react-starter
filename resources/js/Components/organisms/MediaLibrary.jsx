import { usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { HiArrowUpTray } from "react-icons/hi2";
import { toast } from "sonner";

export default function MediaLibrary({
    multiple = false,
    onConfirm,
    selectMultiple = false,
    isInMediaPage = false,
}) {
    const { auth } = usePage().props;
    const uploadRef = useRef();
    const [medias, setMedias] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState("1"); // 1 Upload, 2 Media Library

    const handleChangeUpload = async (e) => {
        setUploading(true);
        const files = e.target.files;
        if (!files.length) return;

        for (let i = 0; i < files.length; i++) {
            if (files[i].size > 1024 * 1024 * 2) {
                alert("File size exceeds the limit of 2MB");
                setUploading(false);
                return;
            }
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files[]", files[i]);
        }

        formData.append("role", "admin");
        formData.append("user_id", auth.user.id);

        try {
            const response = await axios.post(
                "/api/media/bulk-upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const media = response.data.data;
            setMedias((prev) => [...media, ...prev]);
            alert("Media uploaded successfully");

            if (isInMediaPage) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setActiveTab("2");
                setUploading(false);
            }
        } catch (error) {
            console.log(error);
            alert("Failed to upload media");
            setUploading(false);
        }
    };

    const handleUpload = () => {
        uploadRef.current.files = null;
        uploadRef.current.click();
    };

    const handleSelectMedia = (url) => {
        setSelectedMedia((prev) => {
            if (selectMultiple) {
                if (prev.includes(url)) {
                    return prev.filter((item) => item !== url);
                } else {
                    return [...prev, url];
                }
            } else {
                return [url];
            }
        });
    };

    useEffect(() => {
        const fetchMedia = async () => {
            const response = await axios.get("/api/media");
            setMedias(response.data.data);
        };

        fetchMedia();
    }, []);

    return (
        <div>
            <dialog id="media-library-modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl px-0">
                    <div className="flex items-center border-b border-base-200 px-5">
                        <button
                            onClick={() => setActiveTab("1")}
                            className={[
                                "px-4 py-2 transition-all",
                                activeTab === "1"
                                    ? "border-b-2 font-bold border-primary"
                                    : "",
                            ].join(" ")}
                        >
                            Upload New Media
                        </button>
                        <button
                            onClick={() => setActiveTab("2")}
                            className={[
                                "px-4 py-2 transition-all",
                                activeTab === "2"
                                    ? "border-b-2 font-bold border-primary"
                                    : "",
                            ].join(" ")}
                        >
                            Media Library
                        </button>
                    </div>
                    <div className="panel-wrapper h-[500px] overflow-y-scroll px-8">
                        {activeTab === "1" ? (
                            <div className="tab-1 h-full">
                                <div className="h-full flex items-center justify-center">
                                    <button
                                        disabled={uploading}
                                        onClick={handleUpload}
                                        className="btn btn-outline btn-primary"
                                    >
                                        <HiArrowUpTray />
                                        {uploading
                                            ? "Uploading..."
                                            : "Upload Media"}
                                    </button>
                                    <input
                                        multiple={multiple}
                                        ref={uploadRef}
                                        className="fixed top-[-100%] left-[-100%] opacity-0"
                                        type="file"
                                        onChange={handleChangeUpload}
                                    />
                                </div>
                            </div>
                        ) : activeTab === "2" ? (
                            <div className="tab-2 mt-4 h-full overflow-y-scroll">
                                <h1 className="font-bold mb-4 pb-4">
                                    All Media
                                </h1>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {medias.map((media, index) => (
                                        <button
                                            onClick={() =>
                                                handleSelectMedia(media.url)
                                            }
                                            key={`media-${index}`}
                                            style={{
                                                background: `url(${media.url})`,
                                                backgroundSize: "contain",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                            className={[
                                                "w-full h-[200px] border border-base-300 object-cover overflow-hidden",
                                                selectedMedia.includes(
                                                    media.url
                                                )
                                                    ? "border-primary"
                                                    : "",
                                            ].join(" ")}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="modal-action pr-6">
                        <form
                            method="dialog"
                            className="flex items-center gap-2"
                        >
                            {activeTab === "2" && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        onConfirm(
                                            selectMultiple
                                                ? selectedMedia
                                                : selectedMedia[0]
                                        );
                                        setSelectedMedia([]);
                                    }}
                                >
                                    Select Media
                                </button>
                            )}

                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
