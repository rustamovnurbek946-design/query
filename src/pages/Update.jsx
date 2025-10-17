import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import inctance from "../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // 🧊 yangi chiroyli alert uchun

export function Update() {
  let nav = useNavigate();
  let { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleGetId(id) {
    const res = await inctance.get(`/fruits/${id}`);
    return res.data;
  }

  async function handleUpdate(updatedData) {
    await inctance.put(`/fruits/${id}`, updatedData);
  }

  const { error, isLoading, data } = useQuery({
    queryKey: ["getFruitById", id],
    queryFn: () => handleGetId(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      Swal.fire({
        title: "✅ Muvaffaqiyatli o'zgartirildi!",
        text: "Sizning meva ma'lumotlaringiz yangilandi 🍏",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#6366f1",
        background: "#f9fafb",
        color: "#1f2937",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });

      setTimeout(() => nav("/"), 1800);
    },
  });

  const onSubmit = (data_) => {
    Swal.fire({
      title: "⏳ O'zgartirilmoqda...",
      text: "Iltimos, kuting",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    mutation.mutate(data_);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-500 text-xl animate-pulse">
        Yuklanmoqda...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Ma'lumot yuklanishda xatolik
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
      <Card className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100 backdrop-blur-md bg-white/80 hover:shadow-indigo-200 transition-all duration-300">
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-center font-extrabold mb-6 text-gray-800"
        >
          Update Fruit 🍓
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-gray-700"
            >
              Fruit Name
            </Typography>
            <Input
              defaultValue={data?.name}
              {...register("name", { required: true })}
              size="lg"
              placeholder="Enter fruit name"
              className="!border-gray-300 focus:!border-blue-600 bg-white/70 rounded-xl"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a fruit name
              </p>
            )}
          </div>

          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-gray-700"
            >
              Fruit Description
            </Typography>
            <Input
              defaultValue={data?.desc}
              {...register("desc", { required: true })}
              size="lg"
              placeholder="Enter fruit description"
              className="!border-gray-300 focus:!border-blue-600 bg-white/70 rounded-xl"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>

          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-gray-700"
            >
              Fruit Price
            </Typography>
            <Input
              defaultValue={data?.price}
              {...register("price", { required: true })}
              size="lg"
              placeholder="Enter price"
              className="!border-gray-300 focus:!border-blue-600 bg-white/70 rounded-xl"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">Price is required</p>
            )}
          </div>

          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-gray-700"
            >
              Fruit Image URL
            </Typography>
            <Input
              defaultValue={data?.image}
              {...register("image", { required: true })}
              size="lg"
              placeholder="Enter image URL"
              className="!border-gray-300 focus:!border-blue-600 bg-white/70 rounded-xl"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                Image URL is required
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            fullWidth
          >
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
}
