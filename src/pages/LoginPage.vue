<template>
  <div class="relative inline-block left-2/4 -translate-x-2/4">
    <form @submit="onSubmit">
      <div class="bg-slate-800 py-8 px-10 rounded-md">
        <h1 class="flex justify-center text-white text-4xl font-medium pb-5">Login</h1>
        <div class="flex flex-col">
          <label class="text-white text-lg pb-2" for="">Email</label>
          <input
            v-bind="email"
            type="email"
            class="bg-transparent border focus:border-slate-200 border-slate-600 outline-none text-white py-3 px-3 rounded w-[400px] text-lg"
            placeholder="Enter your email"
          />
          <div class="text-red-600 mt-2">{{ errors.email }}</div>
        </div>
        <div class="flex flex-col pt-3 pb-10">
          <label class="text-white text-lg pb-2" for="">Password</label>
          <input
            v-bind="password"
            type="password"
            class="bg-transparent border focus:border-slate-200 border-slate-600 outline-none text-white py-3 px-3 rounded w-[400px] text-lg"
            placeholder="Enter your password"
          />
          <div class="text-red-600 mt-2">{{ errors.password }}</div>
        </div>
        <div class="pb-6">
          <button class="text-white w-full text-lg bg-primary py-3 rounded-lg">Sign in</button>
        </div>
        <p class="text-white text-opacity-30 text-center pb-1">
          Don't have an account?
          <router-link class="text-primary font-medium" to="/register"
            >Create an account</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { auth } from '../config/firebase'
import { useRouter } from 'vue-router'

const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Email must be a valid email').required('Email is a required field'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is a required field')
  })
})

// Creates a submission handler
// It validate all fields and doesn't call your function unless all fields are valid
const router = useRouter()
const onSubmit = handleSubmit(async (values) => {
  try {
    const { email, password } = values
    const userCredential = await auth.signInWithEmailAndPassword(email, password)
    const user = userCredential.user
    console.log('Login successful:', user)

    router.push('/')
  } catch (error) {
    console.error('Login failed:', error.message)
  }
})

const email = defineInputBinds('email')
const password = defineInputBinds('password')
</script>
