import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useTRPC } from "../utils/trpc";
import { useMutation } from "@tanstack/react-query";

function Signup() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const { mutateAsync: createUser, isPending } = useMutation(
    useTRPC().auth.createUser.mutationOptions()
  );

  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const res = await createUser({
      email,
      password,
    });
    if (res) {
      reset();
      navigate("/");
    }
  };
  return (
    <div className="w-1/3 mx-auto my-20">
      <form
        className="flex flex-col wrap p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex-col">
          <label>Email</label>
          <input
            className="w-full my-2 border p-2"
            type="email"
            {...register("email")}
          />
        </div>
        <div className="w-full">
          <label>Password</label>
          <input
            className="w-full my-2 border p-2"
            type="text"
            {...register("password")}
          />
        </div>
        <button
          className="my-2 h-10 flex justify-center items-center"
          type="submit"
          disabled={isPending}
        >
          Sign Up
        </button>
        <p className="w-full text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 underline"
            onClick={() => navigate("/")}
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
