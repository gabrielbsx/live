import { useForm } from "react-hook-form";
import createUserAction, { CreateUserProps } from "@/actions/createUserAction";

export default function HomePage() {
  const { register, handleSubmit } = useForm<CreateUserProps>();

  const onSubmit = async (data: CreateUserProps) => {
    const response = await createUserAction(data);

    console.log(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {["name", "email", "username", "password"].map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input type="text" {...register(field as keyof CreateUserProps)} />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
