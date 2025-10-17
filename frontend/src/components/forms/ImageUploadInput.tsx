import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { FormSchemaInput } from "@/lib/types";
import { Upload, X } from "lucide-react";
import { Label } from "../ui/label";

interface ImageUploadInputProps {
  name: keyof FormSchemaInput;
  setValue: UseFormSetValue<FormSchemaInput>;
  watch: UseFormWatch<FormSchemaInput>;
  errorMessage?: string;
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

/**
 * A form input component for uploading images.
 *
 * @param {keyof FormSchemaInput} name - The name of the input element.
 * @param {UseFormSetValue<FormSchemaInput>} setValue - The setValue function from react-hook-form.
 * @param {UseFormWatch<FormSchemaInput>} watch - The watch function from react-hook-form.
 * @param {string} [errorMessage] - An optional error message to display below the input.
 */
export default function ImageUploadInput({
  name,
  setValue,
  watch,
  errorMessage,
}: ImageUploadInputProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const watchedPhotos = watch(name) as File[] | undefined;

  // Dropzone
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: `${file.name}-${file.size}-${file.lastModified}`,
      }));

      setImages((prev) => [...prev, ...newImages]);
      setValue(name, [...(watchedPhotos || []), ...acceptedFiles]);
    },
    [name, setValue, watchedPhotos]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (id: string) => {
    const imageToRemove = images.find((img) => img.id === id);
    if (!imageToRemove) return;

    URL.revokeObjectURL(imageToRemove.preview);

    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);

    const updatedFiles = updatedImages.map((img) => img.file);
    setValue(name, updatedFiles);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <Label htmlFor={name} className="font-bold text-lg mb-2">
        Photos
      </Label>
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 flex items-center justify-center gap-2 rounded cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select</p>
        <Upload className="size-4" />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-full aspect-square shadow-md"
            >
              <img
                src={img.preview}
                alt={img.file.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
