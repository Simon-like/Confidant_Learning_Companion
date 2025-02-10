<script setup lang="ts">
/**
 * @description 忘记密码--密码输入
 */
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as z from 'zod';
import { useRouter } from 'vue-router';
import WebCard from '@/components/reusable/WebCard.vue';
const router = useRouter();


const password = ref('');//新密码
const confirm_password = ref('');//确认密码

// 表单校验
const formSchema = toTypedSchema(z.object({
  password: z.string()
    .regex(/[a-zA-Z]/, '密码包含字母')  // 至少包含一个字母
    .regex(/[0-9]/, '密码包含数字')  // 至少包含一个数字,
    .min(8, '密码至少8位'),  // 最少 8 个字符
  confirm_password: z.string().refine(
    (value) => value === password.value,
    '两次密码输入不一致'
  ),
}));

const { isFieldDirty, handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema
});


// 提交表单
const onSubmit = handleSubmit((values) => {
  console.log({ values });
  router.replace('/home');
}, (errors) => {
  console.log(errors);
});

</script>

<template>
  <WebCard class="!w-[300px] h-[500px] select-none" :title="'忘记密码'">
    <form class="w-full grow flex flex-col justify-center" @submit="onSubmit">
      <!-- 新密码输入 -->
      <FormField v-slot="{ componentField }" name="password" v-model="password" :validate-on-blur="!isFieldDirty">
        <FormItem class="space-y-0" v-auto-animate>
          <FormLabel class="text-[1.8rem] transition-all">新密码
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="请输入密码" v-bind="componentField"
              class="focus-visible:ring-0 !blue-ring-card-small !rounded-inputRadius" />
          </FormControl>
          <div class="h-1 w-full"></div>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- 确认密码输入 -->
      <FormField v-slot="{ componentField }" name="confirm_password" v-model="confirm_password"
        :validate-on-blur="!isFieldDirty">
        <FormItem class="space-y-0" v-auto-animate>
          <FormLabel class="text-[1.8rem] transition-all">再次确认
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="请确认密码" v-bind="componentField"
              class="focus-visible:ring-0 !blue-ring-card-small !rounded-inputRadius" />
          </FormControl>
          <div class="h-1 w-full"></div>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- 下一步 -->
      <Button type="submit" class="w-full my-6 text-[1.5rem] h-12 button-accent">
        下一步
      </Button>
    </form>
  </WebCard>
</template>

<style scoped></style>
