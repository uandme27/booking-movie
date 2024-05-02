"use client";
import React, { use, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "@/app/styles/style";
import { useLoginUserMutation } from "@/app/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!").min(6),
});

const Login: React.FC<Props> = ({ setRoute, setOpen }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [loginUser, { isSuccess, data, error }] = useLoginUserMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Đăng nhập thành công!");
      setOpen(false);
    }
    if (error) {
      toast.error("Đăng nhập thất bại!");
    }
  }, [isSuccess, error]);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      try {
        await loginUser({ email, password });
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  const { errors, touched, handleSubmit, handleChange, handleBlur, values } =
    formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className={`${styles.lable}`}>
          Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="login@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.lable}`}>
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Mật khẩu"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Đăng nhập"
            className={`${styles.button}`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Hoặc kết nối với
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            onClick={() => {
              signIn();
            }}
            className="cursor-pointer mr-2"
          />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins mr-2">
          Chưa có tài khoản?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Đăng ký
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
