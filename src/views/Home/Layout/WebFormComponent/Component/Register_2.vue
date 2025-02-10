<script setup lang="ts">
/**
 * @description 网页端注册-昵称性别
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


const username = ref('');//用户昵称
// 表单校验
const formSchema = toTypedSchema(z.object({
  username: z.string().nonempty("用户名不能为空"),
}));

const { isFieldDirty, handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema
});
</script>

<template>
  <section class="w-full grow flex flex-col h-full">
    <!-- 用户昵称输入 -->
    <FormField v-slot="{ componentField }" name="username" v-model="username" :validate-on-blur="!isFieldDirty">
      <FormItem class="space-y-0" v-auto-animate>
        <FormLabel class="text-[1.8rem] transition-all">用户昵称
        </FormLabel>
        <FormControl>
          <Input type="text" placeholder="请输入用户昵称" v-bind="componentField"
            class="border-none shadow-none rounded-none focus-visible:ring-0" />
          <div class="w-full h-[0.25rem] bg-primary rounded-lg"></div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </section>
</template>

<style scoped></style>
