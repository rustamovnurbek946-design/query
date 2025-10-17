import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import inctance from "../axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // 💎 chiroyli alert uchun

export function SimpleRegistrationForm() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleCreate(newdata) {
    await inctance.post("/fruits", newdata);
  }

  const mutation = useMutation({
    mutationFn: handleCreate,
    onSuccess: () => {
      Swal.fire({
        title: "🍓 Muvaffaqiyatli yaratildi!",
        text: "Meva ro‘yxatga muvaffaqiyatli qo‘shildi 🌿",
        icon: "success",
        background: "#f9fafb",
        color: "#1f2937",
        confirmButtonText: "Ajoyib!",
        confirmButtonColor: "#2563eb",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(() => {
        nav("/");
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 py-10">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-sm border border-gray-200">
        <Typography
          variant="h3"
          color="blue-gray"
          className="text-center font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          🍇 Create Fruit
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Fruit Name
            </Typography>
            <Input
              {...register("name", { required: true })}
              size="lg"
              placeholder="Enter fruit name"
              className="!border-t-blue-gray-200 focus:!border-t-indigo-600 transition-all duration-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Fruit Description
            </Typography>
            <Input
              {...register("desc", { required: true })}
              size="lg"
              placeholder="Enter description"
              className="!border-t-blue-gray-200 focus:!border-t-indigo-600 transition-all duration-200"
            />
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">Description is required</p>
            )}
          </div>

          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Fruit Price
            </Typography>
            <Input
              {...register("price", { required: true })}
              size="lg"
              placeholder="Enter price (so'm)"
              type="number"
              className="!border-t-blue-gray-200 focus:!border-t-indigo-600 transition-all duration-200"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">Price is required</p>
            )}
          </div>

          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Fruit Image URL
            </Typography>
            <Input
              {...register("image", { required: true })}
              size="lg"
              placeholder="Enter image link"
              className="!border-t-blue-gray-200 focus:!border-t-indigo-600 transition-all duration-200"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">Image URL is required</p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            className="mt-4 py-3 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Create Fruit 🍏
          </Button>
        </form>
      </Card>
    </div>
  );
}
