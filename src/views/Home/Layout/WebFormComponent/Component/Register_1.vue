<script setup lang="ts">
/**
 * @description 网页端注册-账号密码
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
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/components/ui/pin-input';


const phone = ref('');//手机号
const password = ref('');//新密码
const confirm_password = ref('');//确认密码

// 表单校验
const formSchema = toTypedSchema(z.object({
  phone: z.string().nonempty("手机号不能为空"),
  code: z.array(z.coerce.string()).length(6, { message: '请填写完整验证码' }),
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
  validationSchema: formSchema,
  initialValues: {
    code: [],//验证码初始值
  },
});

//验证码输入完全
const handleComplete = (e: string[]) => console.log(e.join(''))


</script>

<template>
</template>

<style scoped></style>
