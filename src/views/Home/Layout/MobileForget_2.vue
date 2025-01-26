<script setup lang="ts">
/**
 * @description 移动端忘记密码-手机验证
 * @date 2025/1/26
 */
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
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as z from 'zod';
import { useRouter } from 'vue-router';
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
  router.push('/home');
}, (errors) => {
  console.log(errors);
});
</script>

<template>
  <MobileCard :h="'normal'" :title="'忘记密码'">
    <form class="w-full grow flex flex-col justify-center" @submit="onSubmit">

      <!-- 新密码输入 -->
      <FormField v-slot="{ componentField }" name="password" v-model="password" :validate-on-blur="!isFieldDirty">
        <FormItem class="space-y-0" v-auto-animate>
          <FormLabel class="text-[1.8rem] transition-all">新密码
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="请输入密码" v-bind="componentField"
              class="border-none shadow-none rounded-none focus-visible:ring-0" />
            <div class="w-full h-[0.25rem] bg-primary rounded-lg"></div>
          </FormControl>
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
              class="border-none shadow-none rounded-none focus-visible:ring-0" />
            <div class="w-full h-[0.25rem] bg-primary rounded-lg"></div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- 下一步 -->
      <Button type="submit" class="w-full my-6 text-[1.5rem] h-12">
        下一步
      </Button>
    </form>
  </MobileCard>
</template>

<style scoped></style>
