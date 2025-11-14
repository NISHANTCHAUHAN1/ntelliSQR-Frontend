import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import useAuthStore from "../store/auth";

type LoginPayload = { email: string; password: string };
type SignupPayload = { name: string; email: string; password: string };
type ForgotPayload = { email: string };
type ResetPayload = { token: string; payload: { password: string } };

export function useSignup() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<any, Error, SignupPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/signup", payload);
      setAuth(data.token, data.user);
      return data;
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<any, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/login", payload);
      setAuth(data.token, data.user);
      return data;
    },
  });
}

export function useForgot() {
  return useMutation<any, Error, ForgotPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/forgot", payload);
      return data;
    },
  });
}

export function useReset() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<any, Error, ResetPayload>({
    mutationFn: async ({ token, payload }) => {
      const { data } = await api.post(`/auth/reset/${token}`, payload);
      setAuth(data.token, data.user);
      return data;
    },
  });
}
