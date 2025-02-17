<template>
  <div class="relative inline-block left-2/4 -translate-x-2/4">
    <form @submit="onSubmit">
      <div class="bg-slate-800 py-8 px-10 rounded-md">
        <h1 class="flex justify-center text-white text-4xl font-medium pb-5">Register</h1>
        <div class="flex flex-col">
          <label class="text-white text-lg pb-2" for="">Email</label>
          <input
            v-model="email.value"
            v-bind="email"
            type="email"
            class="bg-transparent border focus:border-slate-200 border-slate-600 outline-none text-white py-3 px-3 rounded w-[400px] text-lg"
            placeholder="Enter your email"
          />
          <div class="text-red-600 mt-2">{{ errors.email }}</div>
        </div>
        <div class="flex flex-col pt-3">
          <label class="text-white text-lg pb-2" for="">Password</label>
          <input
            v-model="password.value"
            v-bind="password"
            type="password"
            class="bg-transparent border focus:border-slate-200 border-slate-600 outline-none text-white py-3 px-3 rounded w-[400px] text-lg"
            placeholder="Enter your password"
          />
          <div class="text-red-600 mt-2">{{ errors.password }}</div>
        </div>
        <div class="flex flex-col pt-3 pb-10">
          <label class="text-white text-lg pb-2" for="">Confirm password</label>
          <input
            v-model="confirm_password.value"
            v-bind="confirm_password"
            rules="confirmed:@password"
            type="password"
            class="bg-transparent border focus:border-slate-200 border-slate-600 outline-none text-white py-3 px-3 rounded w-[400px] text-lg"
            placeholder="Enter your confirm password"
          />
          <div class="text-red-600 mt-2">
            {{ errors.confirm_password }}
          </div>
        </div>
        <div class="pb-6">
          <button class="text-white w-full text-lg bg-primary py-3 rounded-lg">Sign up</button>
        </div>
        <p class="text-white text-opacity-30 text-center pb-1">
          Already have an account?
          <router-link class="text-primary font-medium" to="/login">Log in</router-link>
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
// dùng tv yup
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Email must be a valid email').required('Email is a required field'),
    password: yup
      .string()
      .required('Password is a required field')
      .min(6, 'Password must be at least 6 characters'),
    confirm_password: yup
      .string()
      .required('Confirm password is a required field')
      .min(6, 'Confirm password must be at least 6 characters')
      .oneOf([yup.ref('password'), null], 'Password must match, please re-enter')
  })
})

const router = useRouter()

const onSubmit = handleSubmit(async (values) => {
  try {
    const { email, password } = values
    const userCredential = await auth.createUserWithEmailAndPassword(email, password)
    const user = userCredential.user
    console.log('Registration successful:', user)
    router.push('/')
  } catch (error) {
    console.error('Registration failed:', error.message)
  }
})

const email = defineInputBinds('email')
const password = defineInputBinds('password')
const confirm_password = defineInputBinds('confirm_password')
</script>
