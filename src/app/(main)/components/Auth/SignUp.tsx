"use client";
import React, { use, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "@/app/styles/style";
import { useRegisterUserMutation } from "@/app/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!").min(6),
  name: Yup.string().required("Vui lòng nhập tên!"),
});

const Signup: React.FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [registerUser, { isSuccess, data: dataUser, error }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đăng ký thành công!");
    }
    if (error) {
      toast.error("Đăng ký thất bại!");
    }
  }, [isSuccess, error]);
  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password, name }) => {
      const data = {
        fullName: name,
        email,
        password,
      };
      try {
        await registerUser(data);
      } catch (error: any) {
        console.error("Login failed:", error);
      }
    },
  });

  const { errors, touched, handleSubmit, handleChange, handleBlur, values } =
    formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Đăng ký</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={`${styles.lable}`}>
          Tên
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Nguyen van a"
          className={`${errors.name && touched.name && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        <label htmlFor="email" className={`${styles.lable}`}>
          Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="abc@gmail.com"
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
            placeholder="123456"
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
          <input type="submit" value="Đăng ký" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins mr-2">
          Đã có tài khoản?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Đăng nhập
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Signup;
