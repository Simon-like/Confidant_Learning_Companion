<script setup lang="ts">
import MobileCard from '@/components/reusable/MobileCard.vue';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox'

import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { h } from 'vue';
import * as z from 'zod';

const phone = ref('');//手机号
const password = ref('');//密码

const formSchema = toTypedSchema(z.object({
  phone: z.string().nonempty("手机号不能为空"),
  password: z.string().nonempty("密码不能为空"),
}));

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(phone.value);
  console.log({ values });
  // toast({
  //   title: 'You submitted the following values:',
  //   description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  // });
});

</script>

<template>
  <MobileCard :h="'normal'">
    <form class="w-full grow flex flex-col justify-center" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="phone" v-model="phone" :validate-on-blur="!isFieldDirty">
        <FormItem class="space-y-0" v-auto-animate>
          <FormLabel class="text-[1.5rem] transition-all">手机号
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="请输入手机号" v-bind="componentField"
              class="border-none shadow-none rounded-none focus-visible:ring-0" />
            <div class="w-full h-[0.25rem] bg-primary rounded-lg"></div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
        <FormItem class="space-y-0" v-auto-animate>
          <FormLabel class="text-[1.5rem] transition-all">密码
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="请输入密码" v-bind="componentField"
              class="border-none shadow-none rounded-none focus-visible:ring-0" />
            <div class="w-full h-[0.25rem] bg-primary rounded-lg"></div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex w-full items-center justify-between mt-4">
        <div class="flex items-center space-x-2">
          <Checkbox id="terms" class="rounded border-2" />
          <label for="terms" class="text-sm">
            记住密码
          </label>
        </div>
        <RouterLink to="/home/forget_1" class="text-[1.25rem] font-medium">
          忘记密码了？
        </RouterLink>
      </div>
      <Button type="submit" class="w-full my-6 text-[1.5rem] h-12">
        登录
      </Button>
      <div class="flex w-full justify-end items-end ">
        <p class="text-[1rem]">没有账号？ </p>
        <RouterLink :to="'/home/register_1'" class="text-text-blue text-[1.5rem] ">一键注册
        </RouterLink>
      </div>
    </form>


  </MobileCard>
</template>

<style scoped></style>
