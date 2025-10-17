import { use } from "react";
import inctance from "../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Products = () => {
  const queryClient = useQueryClient();

  async function handleGet() {
    const res = await inctance.get("/fruits");
    return res.data;
  }

  async function handleDelete(id) {
    await inctance.delete(`/fruits/${id}`);
  }

  const { error, isLoading, data } = useQuery({
    queryKey: ["getProducts"],
    queryFn: handleGet,
  });

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      Swal.fire({
        title: "✅ O'chirildi!",
        text: "Meva muvaffaqiyatli o‘chirildi 🍉",
        icon: "success",
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
      queryClient.invalidateQueries(["getProducts"]);
    },
  });

  const handleDeleteConfirm = (id) => {
    Swal.fire({
      title: "🗑️ O'chirishni xohlaysizmi?",
      text: "Bu amalni keyin ortga qaytarib bo‘lmaydi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ha, o'chir!",
      cancelButtonText: "Bekor qilish",
      background: "#f9fafb",
      color: "#1f2937",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return (
      <div className="text-center text-gray-600 mt-10 text-lg animate-pulse">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">{error.message}</div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* === Cards === */}
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-10 py-10">
        {data?.map((fruit) => (
          <Card
            key={fruit.id}
            className="w-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-md rounded-2xl"
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="h-72 overflow-hidden rounded-t-2xl relative"
            >
              <img
                src={fruit.image}
                alt={fruit.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {fruit.price} so'm
              </span>
            </CardHeader>

            <CardBody className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <Typography
                  color="blue-gray"
                  className="font-semibold text-lg text-gray-800"
                >
                  {fruit.name}
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-80 leading-relaxed"
              >
                {fruit.desc}
              </Typography>
            </CardBody>

            <CardFooter className="pt-0 flex gap-3 px-5 pb-5">
              <Link to={`/Fruits/${fruit.id}`} className="w-full">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
                >
                  Update
                </Button>
              </Link>
              <Button
                onClick={() => handleDeleteConfirm(fruit.id)}
                ripple={false}
                fullWidth={true}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* === FOOTER === */}
      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 shadow-inner py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} <span className="font-semibold text-indigo-600">Fruitify</span> — All Rights Reserved 🍓
          </p>

          <div className="flex gap-5 text-gray-500 text-xl">
            <a
              href="#"
              className="hover:text-indigo-500 transition-colors duration-300"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <i className="fa-brands fa-telegram"></i>
            </a>
            <a
              href="#"
              className="hover:text-gray-800 transition-colors duration-300"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
