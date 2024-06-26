import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "@/atoms/authAtom";
import userAtom from "@/atoms/userAtom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  password: z.string().min(4, {
    message: "Password must be 4 characters long",
  }),
});

const LoginPage = () => {
  const setUser = useSetRecoilState(userAtom);

  const setAuthscreen = useSetRecoilState(authScreenAtom);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(
        "https://maitconnect-1.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      } else {
        localStorage.setItem("user-Info", JSON.stringify(data));
        localStorage.setItem("userId", JSON.stringify(data._id));
        localStorage.setItem("token", data.token);

        setUser(data);

        toast.success(data.message);
      }
    } catch (error) {
      console.log("error in handlelogin ");
      return;
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-row h-screen items-center justify-center">
      <div className="bg-white  p-6 w-[400px] lg:-mt-32 sm:-mt-20 md:-mt-12  rounded-lg ">
        <p className="text-2xl font-semibold font-sans text-black mb-4">
          Login to Mait Connect
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <div>
                    <FormItem className="mb-4">
                      <FormLabel className="text-black mt-2 py-2 text-lg">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          {...field}
                          className="text-black mb-4"
                        />
                      </FormControl>
                      <FormDescription>Enter your username.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div>
                    <FormItem className="mt-2">
                      <FormLabel className="text-black mt-2 py-2 text-lg">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          className="text-black mb-4"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
            <p className=" text-black text-md">
              Don't have an Account{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  setAuthscreen("signup");
                }}
              >
                Signup
              </span>{" "}
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
