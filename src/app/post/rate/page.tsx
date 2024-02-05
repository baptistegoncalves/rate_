"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import PostLinks from "@/app/ui/post/PostLinks";
import { Button } from "@/components/ui/Button";

export default function PostRatePage() {
  // aperçu des images _______________________________________________________________________________________________________________________________
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // image précédente
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : fileInfos.filter(Boolean).length - 1
    );
  };

  // image suivante
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < fileInfos.filter(Boolean).length - 1 ? prevIndex + 1 : 0
    );
  };

  // post d'image___________________________________________________________________________________________________________________________________
  interface FileInfo {
    fileName: string;
    imagePreviewUrl: string;
    file: File;
  }

  const fileInputRef = useRef<HTMLInputElement[]>([]);
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const newFileInfos: FileInfo[] = [...fileInfos];
      newFileInfos[index] = {
        fileName: file.name,
        imagePreviewUrl: URL.createObjectURL(file),
        file: file,
      };
      setFileInfos(newFileInfos);
      setCurrentImageIndex(index);
      event.target.value = "";
    }
  };

  const uploadFiles = async () => {
    let ids = [];
    for (const fileInfo of fileInfos as FileInfo[]) {
      if (fileInfo && fileInfo.file) {
        const formData = new FormData();
        formData.append("files", fileInfo.file);

        try {
          const response = await fetch("http://localhost:1337/api/upload", {
            method: "POST",
            headers: {
              Authorization:
                "Bearer 1db05fa7e84e0acd4cc59ae895f4a3d4ec0f2ed75d9525378d6afe1e7ada37108525e169fef5d33defcca55b6b338376f2faaf11ca44f6a56ec048c41bc6237ea1d2353553819f994d1c3f6dc11bf8f7023064ab6f0b89f83a49d5fe1112f719dcf267602b9af8f4191e534ec77537f0868c2e0704c10f3d81ad969b825238f5",
            },
            body: formData,
          });

          const result = await response.json();
          if (response.ok) {
            ids.push(result[0].id);
            console.log("1 Result image", result);
            console.log("2 id de l'image post", result[0].id);
            console.log("okkkkkk", ids);
          } else {
            throw new Error(`Error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Échec de l'envoi du fichier", error);
        }
      }
    }
    return ids;
  };

  const handleRemoveImage = (index: number) => {
    const newFileInfos: (FileInfo | undefined)[] = [...fileInfos];
    newFileInfos[index] = undefined;
    const filteredFileInfos = newFileInfos.filter(Boolean) as FileInfo[];

    setFileInfos(filteredFileInfos);

    if (currentImageIndex > filteredFileInfos.length - 1) {
      setCurrentImageIndex(filteredFileInfos.length - 1);
    } else if (currentImageIndex === index) {
      setCurrentImageIndex(0);
    }

    if (
      fileInputRef.current[index] &&
      fileInputRef.current[index] instanceof HTMLInputElement
    ) {
      fileInputRef.current[index].value = "";
    }

    setCurrentImageIndex(0);
  };

  // post de description__________________________________________________________________________________________________________________
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    let rateID = null;
    try {
      const response = await fetch("http://localhost:1337/api/rates", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 1db05fa7e84e0acd4cc59ae895f4a3d4ec0f2ed75d9525378d6afe1e7ada37108525e169fef5d33defcca55b6b338376f2faaf11ca44f6a56ec048c41bc6237ea1d2353553819f994d1c3f6dc11bf8f7023064ab6f0b89f83a49d5fe1112f719dcf267602b9af8f4191e534ec77537f0868c2e0704c10f3d81ad969b825238f5",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { Titre: title, description: description },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      rateID = result.data.id;
      console.log("Result description", result);
      console.log("Result description data id", rateID);
    } catch (error) {
      console.error("Échec de l'envoi des données", error);
    }
    return rateID;
  };

  // post de rate__________________________________________________________________________________________________________________
  const handleUploadAndSubmit = async () => {
    console.log(
      "début de handleUploadAndSubmit ---------------------------------------------------------------------------------------"
    );

    const imageIds = await uploadFiles();
    const rateId = await handleSubmit();
    console.log("rateId and imageIds");
    console.log("rateId", rateId, "imageIds", imageIds);

    if (rateId && imageIds.length > 0) {
      await updateRateWithImages(rateId, imageIds);
    } else {
      console.error("Rate ID or Image IDs are undefined or empty");
    }
    console.log("finit");
  };

  const updateRateWithImages = async (rateId: string, imageIds: string[]) => {
    const data = {
      photo: imageIds,
    };

    try {
      const response = await fetch(
        `http://localhost:1337/api/rates/${rateId}`,
        {
          method: "PUT",
          headers: {
            Authorization:
              "Bearer 1db05fa7e84e0acd4cc59ae895f4a3d4ec0f2ed75d9525378d6afe1e7ada37108525e169fef5d33defcca55b6b338376f2faaf11ca44f6a56ec048c41bc6237ea1d2353553819f994d1c3f6dc11bf8f7023064ab6f0b89f83a49d5fe1112f719dcf267602b9af8f4191e534ec77537f0868c2e0704c10f3d81ad969b825238f5",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Rate updated with images", result);
    } catch (error) {
      console.error("Échec de la mise à jour du rate", error);
    }
  };

  return (
    <>
      <div className="text-white">
      <section>
          <div className="bg-zinc-900 absolute h-full w-full -z-50"></div>
          <Image
            src="/Rate-logo-background.svg"
            className="absolute inset-0 -z-50 opacity-5 overflow-hidden"
            objectFit="cover"
            layout="fill"
            alt="logo dans le fond de la page"
          />
          <div className="bg-zinc-900 absolute h-full w-full opacity-70 -z-10"></div>
        </section>
        {/* Page */}
        <div className="flex w-full h-full max-sm:flex-col">
          {/* Aperçu */}
          <div className="w-1/2 h-full relative max-sm:w-full">
            <div className="flex-col flex items-center justify-center h-screen">
              <p className="w-1/2 mr-0 ml-auto max-sm:w-full">Aperçu :</p>
              {/* Barre de progression indiquant l'image actuellement affichée */}
              <div className="flex w-1/2 mr-0 ml-auto max-sm:m-0 max-sm:w-full">
                {Array.from({
                  length: Math.max(2, fileInfos.filter(Boolean).length),
                }).map((_, index) => {
                  const isCurrentImage = index === currentImageIndex;
                  const barColor = isCurrentImage ? "white" : "grey";
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: barColor,
                      }}
                      className="w-full h-[2px] my-[10px] mx-[4px] rounded-[13px]"
                    />
                  );
                })}
              </div>
              {/* Aperçu avec carrousel */}
              <div className="w-1/2 h-[70vh] mr-0 ml-auto bg-[#212126] rounded-[13px] overflow-hidden relative max-sm:m-0 max-sm:m-0 max-sm:w-full max-sm:h-screen max-sm:rounded-none">
                {fileInfos[currentImageIndex] && (
                  <div className="absolute inset-0">
                    <Image
                      src={fileInfos[currentImageIndex].imagePreviewUrl}
                      alt={`Aperçu de l'image`}
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0"
                    />
                    <Button
                      onClick={goToPreviousImage}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 shadow-none bg-transparent hover:bg-transparent"
                    >
                      <Image
                        src="/left-arrow-button-icon.svg"
                        alt={`icon pour swiper les images vers la gauche`}
                        width={20}
                        height={20}
                      />
                    </Button>
                    <Button
                      onClick={goToNextImage}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 shadow-none bg-transparent hover:bg-transparent"
                    >
                      <Image
                        src="/right-arrow-button-icon.svg"
                        alt={`icon pour swiper les images vers la droite`}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center">
            {/* Div 1*/}
            <section className="p-4 flex">
              <PostLinks />
            </section>
            {/* Div 2*/}
            <section className="m-auto grid grid-cols-5 gap-4">
              <div className="col-span-5 sm:col-span-2 p-4">
                <p className="font-bold">1. Choisis ta ou tes photos(s)</p>
              </div>
              <div className="col-span-5 sm:col-span-3 p-4 text-xs">
                <p>(minimum 2 maximum 5)</p>
              </div>

              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="col-span-5 sm:col-span-1">
                  <div className="flex flex-col sm:flex-col items-center sm:space-x-4 p-4 max-sm:flex-row max-sm:items-center">
                    <div
                      className="bg-[#212126] w-24 h-auto  p-3 rounded-[13px] cursor-pointer max-sm:mr-4"
                      onClick={() => {
                        const inputEl = fileInputRef.current[index];
                        if (inputEl instanceof HTMLInputElement) {
                          inputEl.click();
                        }
                      }}
                    >
                      <Image
                        src="/icon_image.svg"
                        alt={`Aperçu de l'image`}
                        width={100}
                        height={100}
                        className="w-[45px] h-[45px] m-auto"
                      />
                    </div>

                    <div className="flex flex-col justify-center max-sm:flex-row max-sm:items-center">
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={(el) => {
                          if (el) fileInputRef.current[index] = el;
                        }}
                        onChange={(e) => handleFileChange(index, e)}
                      />
                      {fileInfos[index]?.fileName && (
                        <div className="text-white mt-4 sm:mt-0 max-sm:mt-0 flex items-center">
                          <div>
                            Fichier sélectionné: {fileInfos[index].fileName}
                          </div>
                          {/* Icône de suppression */}
                          <Image
                            onClick={() => handleRemoveImage(index)}
                            src="/cross_icon.svg"
                            alt={`icon de supression`}
                            width={100}
                            height={100}
                            className="cursor-pointer w-4 max-sm:ml-4"
                          />
                        </div>
                      )}

                      {fileInfos[index]?.imagePreviewUrl && (
                        <div className="mt-4 sm:mt-0 max-sm:mt-0 max-sm:ml-4">
                          <Image
                            src={fileInfos[index].imagePreviewUrl}
                            alt="Aperçu de l'image chargée"
                            width={200}
                            height={200}
                            layout="fixed"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Div 3*/}
            <section className="m-auto grid grid-rows-3 w-3/5 max-sm:w-full">
              <div className="row-span-1">
                <p className="m-4 font-bold">
                  2. Choisis ton titre, ta description et la couleur
                </p>
              </div>
              <div className="row-span-4 p-4">
                <div className="bg-[#212126] m-auto grid grid-rows-4 grid-cols-10 h-full rounded-md">
                  <div className="row-span-1 col-span-9 bg-transparent rounded-tl-lg p-2">
                    <input
                      type="text"
                      placeholder="Titre"
                      value={title}
                      onChange={handleTitleChange}
                      className="bg-transparent font-bold w-full h-full"
                    />
                  </div>
                  <div className="row-span-2 col-span-1 bg-[#4E6B47] rounded-tr-lg p-2"></div>
                  <div className="row-span-3 col-span-9 bg-transparent rounded-bl-lg p-2">
                    <input
                      placeholder="Description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className="bg-transparent w-full h-full text-left border-none outline-offset-0"
                    />
                  </div>
                  <div className="row-span-2 col-span-1 bg-[#6C81B6] rounded-br-lg p-2"></div>
                </div>
              </div>
            </section>

            <Button className="bg-[#212126]" onClick={handleUploadAndSubmit}>
              Post votre Rate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
