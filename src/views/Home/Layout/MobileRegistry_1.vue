<script setup lang="ts">
/**
 * @description 移动端注册-手机号绑定
 * @date 2025/1/21
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
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/components/ui/pin-input';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();


const phone = ref('');//手机号

// 表单校验
const formSchema = toTypedSchema(z.object({
  phone: z.string().nonempty("手机号不能为空"),
  code: z.array(z.coerce.string()).length(6, { message: '请填写完整验证码' })
}));

const { isFieldDirty, handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    code: [],//验证码初始值
  },
});

//验证码输入完全
const handleComplete = (e: string[]) => console.log(e.join(''))

// 提交表单
const onSubmit = handleSubmit((values) => {
  console.log(phone.value);
  console.log({ values });
  router.push('/home/register_2');
}, (errors) => {
  console.log(errors);
  ElMessage.error("验证码错误");
});

</script>

<template>
  <MobileCard :h="'big'" :title="'绑定手机'">
    <form class="w-full grow flex flex-col justify-center" @submit="onSubmit">
      <!-- 手机号输入 -->
      <FormField v-slot="{ componentField }" name="phone" v-model="phone" :validate-on-blur="!isFieldDirty">
        <FormItem class="space-y-0" v-auto-animate>
          <FormLabel class="text-[1.8rem] transition-all">手机号
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="请输入绑定手机号" v-bind="componentField"
              class="border-none shadow-none rounded-none focus-visible:ring-0" />
            <div class="w-full h-[0.25rem] bg-primary rounded-lg"></div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- 密码操作相关行 -->

      <div class="flex items-center justify-between w-full mt-4">
        <p>验证码</p>
        <Button class="rounded-inputRadius text-[1.2rem]">
          发送验证码
        </Button>
      </div>

      <!-- 验证码 -->
      <FormField v-slot="{ componentField, value }" name="code">
        <FormItem>
          <FormControl>
            <PinInput id="pin-input" :model-value="value" placeholder="-" class="flex items-center mt-4" otp
              type="number" :name="componentField.name" @complete="handleComplete" @update:model-value="(arrStr) => {
                setFieldValue('code', arrStr.filter(Boolean))
              }">
              <PinInputGroup class="w-full justify-between">
                <PinInputInput v-for="(id, index) in 6" :key="id" :index="index"
                  class="text-text-foreground rounded-inputRadius first:rounded last:rounded focus:border-2 focus:border-text-blue" />
              </PinInputGroup>
            </PinInput>
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
