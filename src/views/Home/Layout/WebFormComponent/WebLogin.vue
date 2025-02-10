<script setup lang="ts">
/**
 * @description Web端登录表
 */
import WebCard from '@/components/reusable/WebCard.vue';
import router from '@/router';
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
import * as z from 'zod';

const phone = ref('');//手机号
const password = ref('');//密码

// 表单校验
const formSchema = toTypedSchema(z.object({
  phone: z.string().nonempty("手机号不能为空"),
  password: z.string().nonempty("密码不能为空"),
}));

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

// 提交表单
const onSubmit = handleSubmit((values) => {
  console.log(phone.value);
  console.log({ values });
});
</script>

<template>
  <WebCard class="!w-[300px] h-[500px] select-none" :title="'用户登录'">
    <form class="w-full grow flex flex-col justify-center" @submit="onSubmit">
      <!-- 手机号输入 -->
      <FormField v-slot="{ componentField }" name="phone" v-model="phone" :validate-on-blur="!isFieldDirty">
        <FormItem class="space-y-0" v-auto-animate>
          <FormLabel class="text-[1.8rem] transition-all">手机号
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="请输入手机号" v-bind="componentField"
              class="focus-visible:ring-0 !blue-ring-card-small !rounded-inputRadius" />
          </FormControl>
          <div class="h-1 w-full"></div>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- 密码输入 -->
      <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
        <FormItem class="space-y-0" v-auto-animate>
          <FormLabel class="text-[1.8rem] transition-all">密码
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="请输入密码" v-bind="componentField"
              class="focus-visible:ring-0 !blue-ring-card-small !rounded-inputRadius" />
          </FormControl>
          <div class="h-1 w-full"></div>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- 密码操作相关行 -->
      <div class="flex w-full items-center justify-between mt-4">
        <div class="flex items-center space-x-2">
          <Checkbox id="terms" class="rounded border-2 border-foreground" />
          <label for="terms" class="text-sm">
            记住密码
          </label>
        </div>
        <RouterLink to="/home/webforget_1" class="text-[1.25rem] font-medium hover:underline hover:decoration-wavy">
          忘记密码了？
        </RouterLink>
      </div>
      <!-- 登录按钮 -->
      <Button type="submit" class="w-full my-6 text-[1.5rem] h-12 button-accent">
        登录
      </Button>
      <div class="flex w-full justify-end items-end ">
        <p class="text-[1rem]">没有账号？ </p>
        <RouterLink :to="'/home/webregister'" class="link-blue text-[1.5rem] ">一键注册
        </RouterLink>
      </div>
    </form>
  </WebCard>
</template>

<style scoped></style>
