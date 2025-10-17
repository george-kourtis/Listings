import type { FormData, FormSchemaInput } from "@/lib/types";
import type { UseFormSetError } from "react-hook-form";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Creates a new listing in the database.
 *
 * @param {FormData} data - The form data to be sent to the server.
 * @param {UseFormSetError<FormSchemaInput>} setError - A function to set the error state for a specific field.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setGeneralError - A function to set the general error state.
 *
 * @returns {Promise<void>} - A promise that resolves when the request is complete.
 */
export const createListing = async (
  data: FormData,
  setError: UseFormSetError<FormSchemaInput>,
  setGeneralError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const res = await fetch(API_URL + "/api/create-listing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    if (res.status === 400) {
      const { errors } = result;
      console.error("Server error:", errors);

      errors.forEach(
        (error: { path: (string | number)[]; message?: string }) => {
          const fieldPath = error.path[0];

          if (typeof fieldPath === "string") {
            setError(fieldPath as keyof FormSchemaInput, {
              type: "manual",
              message: error.message,
            });
          }
        }
      );
      return;
    } else {
      setGeneralError(result.error.message);
      return;
    }
  }
};
