import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FormSchemaInput, FormData } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import AreaDropdown from "@/components/forms/AreaDropdown";
import LabeledInput from "@/components/forms/LabeledInput";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import useFetchAreaData from "@/hooks/useFetchAreaData";
import SelectInput from "@/components/forms/SelectInput";
import { MultiSelectCheckbox } from "@/components/forms/MultiSelectCheckbox";
import { formSchema } from "@/lib/schemas";
import { createListing } from "@/api/createListing";
import ImageUploadInput from "./ImageUploadInput";

/**
 * Form component for creating a new listing.
 *
 * @returns {JSX.Element} - A JSX element representing the form.
 */
export default function Form() {
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    setError,
    reset,
    control,
    watch,
  } = useForm<FormSchemaInput, undefined, FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: undefined,
      area: "",
      price: "",
      "extra-description": "",
      placeId: "",
      levels: [],
      bathrooms: "",
      bedrooms: "",
      propertyType: undefined,
      photos: [],
    },
  });
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const {
    data: areaData,
    showNoResults,
    isLoading,
  } = useFetchAreaData(searchQuery);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await createListing(data, setError, setGeneralError);

      toast.success("Listing created successfully!");
      // Reset form to default values
      reset({
        title: "",
        type: undefined,
        area: "",
        price: "",
        "extra-description": "",
        placeId: "",
        levels: [],
        bathrooms: "",
        bedrooms: "",
        propertyType: undefined,
      });
      setSelectedArea(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-2">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-4 text-center">Create your ad</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <LabeledInput
          label="Title"
          id="title"
          type="text"
          register={register}
          name="title"
          registerOptions={{ required: true, maxLength: 155 }}
          errorMessage={formState.errors.title?.message}
        />

        <SelectInput
          label="Type"
          control={control}
          name="type"
          formState={formState}
          options={[
            { value: "rent", label: "Rent" },
            { value: "buy", label: "Buy" },
            { value: "exchange", label: "Exchange" },
            { value: "donation", label: "Donation" },
          ]}
          placeholder="Select type"
        />

        <Input type="hidden" {...register("placeId")} />

        <div>
          <AreaDropdown
            register={register}
            selectedArea={selectedArea}
            setSearchQuery={setSearchQuery}
            setSelectedArea={setSelectedArea}
            areaData={areaData}
            setValue={setValue}
            isLoading={isLoading}
            showNoResults={showNoResults}
          />
          {formState.errors.area && (
            <p className="text-red-500">{formState.errors.area.message}</p>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="levels"
            render={({ field }) => (
              <MultiSelectCheckbox
                label="Levels"
                options={[
                  { value: "basement", label: "Basement" },
                  { value: "ground-floor", label: "Ground Floor" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                  { value: "7", label: "7" },
                  { value: "8", label: "8" },
                  { value: "9", label: "9" },
                  { value: "10", label: "10" },
                ]}
                value={field.value || []}
                onChange={field.onChange}
                name={field.name}
                onBlur={field.onBlur}
              />
            )}
          />
          {formState.errors.levels && (
            <p className="text-red-500">{formState.errors.levels.message}</p>
          )}
        </div>

        <LabeledInput
          label="Bathrooms"
          id="bathrooms"
          type="text"
          register={register}
          name="bathrooms"
          registerOptions={{
            required: "Bathrooms is required",
            validate: (value) => {
              return (
                (value !== undefined && !isNaN(Number(value))) ||
                "Enter a valid number"
              );
            },
          }}
          errorMessage={formState.errors.bathrooms?.message}
        />

        <LabeledInput
          label="Bedrooms"
          id="bedrooms"
          type="text"
          register={register}
          name="bedrooms"
          registerOptions={{
            required: "Bedrooms is required",
            validate: (value) =>
              (value !== undefined && !isNaN(Number(value))) ||
              "Enter a valid number",
          }}
          errorMessage={formState.errors.bedrooms?.message}
        />

        <SelectInput
          label="Property Type"
          control={control}
          name="propertyType"
          formState={formState}
          options={[
            { value: "apartment", label: "Apartment" },
            { value: "house", label: "House" },
            { value: "villa", label: "Villa" },
            { value: "office", label: "Office" },
            { value: "store", label: "Store" },
            { value: "other", label: "Other" },
          ]}
          placeholder="Select property type"
        />

        <ImageUploadInput
          name="photos"
          watch={watch}
          setValue={setValue}
          errorMessage={formState.errors.photos?.message || ""}
        />

        <LabeledInput
          label="Price in Euros"
          id="price"
          type="text"
          register={register}
          name="price"
          registerOptions={{ required: true }}
          errorMessage={formState.errors.price?.message}
        />

        <div>
          <Label htmlFor="extra-description" className="font-bold text-lg mb-2">
            Extra Description
          </Label>
          <Textarea
            id="extra-description"
            {...register("extra-description")}
            placeholder="Optional description of the property"
          />
          {generalError && <p className="text-red-500">{generalError}</p>}
        </div>

        <button
          type="submit"
          className="bg-[#fdb813] text-white rounded-2xl cursor-pointer p-2 disabled:opacity-50"
          disabled={formState.isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
